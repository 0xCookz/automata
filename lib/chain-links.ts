/** Client-safe explorer helpers — lib/chain.ts pulls in server-only code. */
export const EXPLORER = "https://robinhoodchain.blockscout.com";
export const explorerTx = (hash: string) => `${EXPLORER}/tx/${hash}`;
export const explorerAddress = (address: string) => `${EXPLORER}/address/${address}`;
