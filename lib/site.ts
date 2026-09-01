/**
 * Single source of truth for copy + sample data.
 * Swap `payouts` for a real feed once the review backend exists.
 */

export const site = {
  name: "Automata",
  domain: "automata.build",
  chain: "Robinhood Chain",
  token: "USDG",
  explorerTx: "https://robinhoodchain.blockscout.com/tx/",
  social: {
    x: "https://x.com",
    telegram: "https://t.me",
  },
} as const;

export const nav = [
  { label: "Why robots need it", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Ledger", href: "#ledger" },
  { label: "Pay", href: "#pay" },
  { label: "FAQ", href: "#faq" },
];

/** base + per-second rate, in USDG. Mirrored by the payout dial. */
export const pay = { base: 2.2, perSecond: 0.12, min: 5, max: 30 };

export const payoutFor = (seconds: number) =>
  Math.round((pay.base + pay.perSecond * seconds) * 100) / 100;

export const stats = [
  { value: "$4.62", label: "median payout per clip" },
  { value: "6h 12m", label: "median time to review" },
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
    aside: "Median turnaround: 6 hours.",
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

export const payouts: Payout[] = [
  { task: "Wiping down a kitchen counter", seconds: 24, amount: 5.08, hash: "0x8c41d0a7e93f4b2c6188aa5f0d3e77b91c4a6e2d05f8b31c7a9e04d2b6f13c8a", when: "12 min ago" },
  { task: "Folding a fitted sheet, badly", seconds: 30, amount: 5.8, hash: "0x2f77b0c9a145e83d0b6ca2417e59d8f30ac1b47e6d92f085c31a7be40d6592cf", when: "1 h ago" },
  { task: "Changing the oil on a hatchback", seconds: 28, amount: 5.56, hash: "0xd1a904f7c38b52e6470fa1cd9b83e25074c6ad19f52b3e807a4c1d69f0b3872e", when: "3 h ago" },
  { task: "Untangling a garden hose", seconds: 19, amount: 4.48, hash: "0x5b6ec27a04193fd8c7a25be0134f97ad6c81e35029b4fa7d1c6083e5b29d41fa", when: "5 h ago" },
  { task: "Loading a dishwasher after dinner", seconds: 26, amount: 5.32, hash: "0x9e30c14b7a6df852013eb9c47f2a60d5183bc94e7620af3d5c81e07b4a29f6d3", when: "7 h ago" },
  { task: "Feeding two impatient cats", seconds: 14, amount: 3.88, hash: "0x47c8e1052bd63f9a7e04c1b8523da96f0e7b34c15928da60f3b17e8c4025d9ba", when: "9 h ago" },
  { task: "Hanging a picture, second attempt", seconds: 22, amount: 4.84, hash: "0xb053a7c9e2148df6035ca7b19e46f28d5017c3ba9e64f120d8a35c07be914f26", when: "yesterday" },
  { task: "Sorting a jar of mixed screws", seconds: 30, amount: 5.8, hash: "0x6da21f80c5934be7a018d6c2f37b04e95a1c83b7de20f649a5cd0817be36f2a4", when: "yesterday" },
];

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
    a: `Every clip pays a ${pay.base.toFixed(2)} USDG base plus ${pay.perSecond.toFixed(
      2,
    )} USDG per second, so a thirty-second clip settles at ${payoutFor(30).toFixed(
      2,
    )} USDG. You see the exact figure before you submit.`,
  },
  {
    q: "When do I get paid?",
    a: "As soon as a reviewer approves the clip. There is no minimum balance, no payout cycle and no request to file — the transaction is signed and sent, and you can watch it land on the explorer.",
  },
  {
    q: "What if my clip is rejected?",
    a: "You get the reason in writing, in plain language, along with what to change. Rejections cost you nothing and do not count against you. Most people are approved by their second try.",
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
