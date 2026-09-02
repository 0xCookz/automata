import {
  createPublicClient,
  createWalletClient,
  defineChain,
  erc20Abi,
  http,
  isAddress,
  parseUnits,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

/** Robinhood Chain mainnet — chain id and RPC per docs.robinhood.com/chain. */
export const robinhoodChain = defineChain({
  id: Number(process.env.CHAIN_ID ?? 4663),
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.RPC_URL ?? "https://rpc.mainnet.chain.robinhood.com"],
    },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://robinhoodchain.blockscout.com" },
  },
});

/**
 * Canonical USDG on Robinhood Chain. There are impostor tokens with the same
 * ticker, so this must stay the address published in the official docs.
 */
export const USDG_ADDRESS = (process.env.USDG_ADDRESS ??
  "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168") as Hex;

export const publicClient = createPublicClient({
  chain: robinhoodChain,
  transport: http(),
});

export const explorerTx = (hash: string) =>
  `${robinhoodChain.blockExplorers.default.url}/tx/${hash}`;

export const isWallet = (value: string): value is Hex => isAddress(value);

/** Cached because decimals is immutable and every payout would otherwise read it. */
let decimalsCache: number | null = null;
export async function usdgDecimals() {
  if (decimalsCache !== null) return decimalsCache;
  decimalsCache = await publicClient.readContract({
    address: USDG_ADDRESS,
    abi: erc20Abi,
    functionName: "decimals",
  });
  return decimalsCache;
}

function payoutAccount() {
  const key = process.env.PAYOUT_PRIVATE_KEY;
  if (!key) throw new Error("PAYOUT_PRIVATE_KEY is not set");
  return privateKeyToAccount((key.startsWith("0x") ? key : `0x${key}`) as Hex);
}

/** Treasury balance, for the admin header. */
export async function payoutBalance() {
  const account = payoutAccount();
  const [raw, decimals] = await Promise.all([
    publicClient.readContract({
      address: USDG_ADDRESS,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account.address],
    }),
    usdgDecimals(),
  ]);
  return {
    address: account.address,
    usdg: Number(raw) / 10 ** decimals,
  };
}

/** Sends `amount` USDG to `to` and returns the transaction hash. */
export async function payUsdg(to: Hex, amount: number) {
  const account = payoutAccount();
  const decimals = await usdgDecimals();

  const wallet = createWalletClient({
    account,
    chain: robinhoodChain,
    transport: http(),
  });

  const { request } = await publicClient.simulateContract({
    account,
    address: USDG_ADDRESS,
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, parseUnits(amount.toString(), decimals)],
  });

  return wallet.writeContract(request);
}
