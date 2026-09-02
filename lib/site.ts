/**
 * Single source of truth for copy + sample data.
 * Copy and rates only — every number the site shows comes from the database.
 */

export const site = {
  name: "Automata",
  domain: "tryautomata.app",
  chain: "Robinhood Chain",
  token: "USDG",
  explorerTx: "https://robinhoodchain.blockscout.com/tx/",
  explorerToken: "https://robinhoodchain.blockscout.com/token/",
  /** The project token. Clip payouts are in USDG; this is separate. */
  contract: {
    ticker: "AUTO",
    name: "TryAutomata",
    address: "0xf1FbAAF2Ed6fD0856042a2fEb7756C98a0c5EfeC",
  },
  social: {
    x: "https://x.com/TryAutomata",
    handle: "@TryAutomata",
  },
} as const;

/**
 * The kick-off bonus paid on the first accepted clip, on top of the standing
 * rate. Both hashes are real transfers from the payout wallet.
 */
export const firstUpload = {
  bonus: 30,
  bonusHash: "0x2e4a78720faa289e0e5b56fb165ac5d63533d857e65ad5f5d70a0f36728494e7",
};

export const nav = [
  { label: "Uploads", href: "#uploads" },
  { label: "Why robots need it", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Ledger", href: "#ledger" },
  { label: "Pay", href: "#pay" },
  { label: "FAQ", href: "#faq" },
];

/** One flat rate per approved clip, in USDG — length does not change it. */
export const pay = { flat: 8.5, min: 5, max: 30 };

/** What a week of posting is worth. */
export const payoutForClips = (clips: number) =>
  Math.round(pay.flat * clips * 100) / 100;

export const stats = [
  { value: "8.50", label: "USDG per approved clip" },
  { value: "5–30s", label: "one continuous take" },
  { value: "$0", label: "payout minimum" },
  { value: "100%", label: "reviewed by a person" },
];

export const tasks = [
  "folding laundry",
  "loading a dishwasher",
  "changing a bulb",
  "watering plants",
  "sweeping a porch",
  "peeling vegetables",
  "walking the dog",
  "sanding a shelf",
  "sorting screws",
  "wiping a counter",
  "assembling flat-pack",
  "unplugging a cable",
  "opening a jar",
  "feeding a cat",
  "restocking a fridge",
  "patching a wall",
  "changing engine oil",
  "hanging a picture",
  "pouring a coffee",
  "tying a shoelace",
  "closing a window",
  "collecting eggs",
];

export const steps = [
  {
    n: "01",
    title: "Record from your eyeline",
    body: "Five to thirty seconds of an ordinary task, shot from where your eyes are. In the browser, or upload something you already have.",
    aside: "Phone at eye level. No editing. No narration.",
  },
  {
    n: "02",
    title: "A person watches it",
    body: "Every clip goes to a human reviewer, not a filter. If it is turned down you are told exactly which part failed, and you can shoot it again.",
    aside: "You are told either way, with a reason.",
  },
  {
    n: "03",
    title: "The chain pays you",
    body: "Approved clips settle in USDG on Robinhood Chain, straight to your wallet. No minimum balance, no weekly cycle, no invoice.",
    aside: "Every payment is a public transaction.",
  },
];

export const principles = [
  {
    n: "I",
    title: "First person, or it does not transfer",
    body: "A camera near your eyeline sees roughly what a robot sees out of its own head. Footage shot from across the room teaches it far less.",
  },
  {
    n: "II",
    title: "Whole tasks, start to finish",
    body: "The signal is in the full sequence — approach, grasp, adjust, release. A clip that cuts halfway through teaches almost nothing.",
  },
  {
    n: "III",
    title: "Messy beats perfect",
    body: "Cluttered counters, bad light, awkward angles. Lab data is spotless and that is exactly why models trained on it break in a real kitchen.",
  },
  {
    n: "IV",
    title: "Keep the mistakes in",
    body: "Dropping something and picking it back up is worth more than a clean take. Recovery is the hardest thing to learn and the rarest thing on file.",
  },
];

export type Payout = {
  task: string;
  seconds: number;
  amount: number;
  hash: string;
  when: string;
};

/**
 * The ledger is fed by /api/payouts. There is no seed data on purpose: until a
 * real clip is paid, the section shows zero.
 */
export const payouts: Payout[] = [];

export const faqs = [
  {
    q: "What am I actually being paid for?",
    a: "A short, honest recording of you doing something with your hands, filmed from your point of view. That footage becomes training data for robot manipulation models — the part of robotics that is still mostly unsolved because almost nobody has filmed ordinary life from the inside.",
  },
  {
    q: "What makes a clip get approved?",
    a: "One continuous task, five to thirty seconds, filmed near your eyeline, with your hands visible and the action finished on camera. Steady enough to see what happened. That is the whole bar.",
  },
  {
    q: "How much does it pay?",
    a: `${pay.flat.toFixed(2)} USDG for every approved clip, flat. A five-second clip and a thirty-second clip pay exactly the same, so there is no reason to pad one — film the task, stop when it is done.`,
  },
  {
    q: "When do I get paid?",
    a: "As soon as a reviewer approves the clip. There is no minimum balance, no payout cycle and no request to file — the transaction is signed and sent, and you can watch it land on the explorer.",
  },
  {
    q: "What if my clip is rejected?",
    a: "You get the reason in writing, in plain language, along with what to change. Rejections cost you nothing and do not count against you, and you can film it again.",
  },
  {
    q: "What do I need to start?",
    a: "A phone, a wallet address on Robinhood Chain, and something ordinary to do. No robotics knowledge, no equipment, no application.",
  },
  {
    q: "What happens to my footage?",
    a: "It goes into a training corpus for manipulation models. Clips are never resold as media, never attached to your name, and anything with faces, screens or documents in frame is cut or rejected before it enters the set.",
  },
  {
    q: "Why pay people at all?",
    a: "Because the alternative is scraped video that nobody consented to and that was never filmed from the right place. Paying for purpose-shot footage is cheaper than the lab rigs it replaces and it is the only version of this that is fair.",
  },
];
