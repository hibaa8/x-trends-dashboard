// Real posts + signals fetched via Grok native X tools (context: 30 Oct 2026)

export type Post = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  timestamp: string;
  timeAgo: string;
  tickers: string[];
  sentiment: "bullish" | "bearish" | "neutral";
  url: string;
};

export type Signal = {
  id: string;
  ticker: string;
  theme: string;
  direction: "Bullish" | "Bearish" | "Watch";
  confidence: "High" | "Medium" | "Low";
  horizon: string;
  thesis: string;
  supportingPosts: string[];
  suggestedActions: string[];
  risks: string[];
  updatedAt: string;
};

export const initialPosts: Post[] = [
  {
    id: "2116296347884142962",
    author: "Paradis",
    handle: "@ParadisLabs",
    avatar: "https://pbs.twimg.com/profile_images/2110719323362717696/Ypu0GLqO.jpg",
    content:
      "Black Friday for Technology stocks. Tough earnings this week — market puked on weak Q4 guides from Amazon and Intel. Fundamentals for AI remain strong (cloud demand firm, order books deep), but the market cares about HOW the AI buildout is paid for and returns on capital. Short-term: range-bound with negative sentiment. Longer-term still constructive once positioning clears.",
    likes: 41,
    reposts: 1,
    views: 5299,
    timestamp: "2026-10-30T22:29:00Z",
    timeAgo: "just now",
    tickers: ["NVDA", "AMZN", "INTC"],
    sentiment: "neutral",
    url: "https://x.com/ParadisLabs/status/2116296347884142962",
  },
  {
    id: "2116289155064062158",
    author: "Shay Boloor",
    handle: "@StockSavvyShay",
    avatar: "https://pbs.twimg.com/profile_images/1878129937737187328/DnEflT4L.jpg",
    content:
      "$IREN just confirmed Perplexity Computer will run on $NVDA Blackwell Ultra GPUs at its data centers under a multi-year agreement. Interesting considering AI agents use far more compute per task and IREN still has ~$3B in contracted ARR waiting to come online.",
    likes: 234,
    reposts: 13,
    views: 20361,
    timestamp: "2026-10-30T22:00:00Z",
    timeAgo: "29m",
    tickers: ["IREN", "NVDA"],
    sentiment: "bullish",
    url: "https://x.com/StockSavvyShay/status/2116289155064062158",
  },
  {
    id: "2116288048220852473",
    author: "Hardik Shah",
    handle: "@AIStockSavvy",
    avatar: "https://pbs.twimg.com/profile_images/1905031117385715713/nwlzlkYm.jpg",
    content:
      "$IREN | Perplexity is working with IREN to power fast, trustworthy AI. Under multi-year agreement, $NVDA NVIDIA Blackwell Ultra GPUs at an IREN data center campus, supporting the models and agents behind Perplexity Computer.",
    likes: 39,
    reposts: 5,
    views: 4600,
    timestamp: "2026-10-30T21:56:00Z",
    timeAgo: "33m",
    tickers: ["IREN", "NVDA"],
    sentiment: "bullish",
    url: "https://x.com/AIStockSavvy/status/2116288048220852473",
  },
  {
    id: "2116285460267872416",
    author: "Joel",
    handle: "@growthrapidly",
    avatar: "https://pbs.twimg.com/profile_images/2095698623187357696/LdAEHaUS.jpg",
    content:
      "Big news for $IREN bulls! IREN highlighted how its multi-year partnership with Perplexity will support one of the fastest growing AI platforms. Perplexity handles more than 1.5 BILLION questions every month. Another strong validation of IREN's role in the AI infrastructure ecosystem.",
    likes: 64,
    reposts: 5,
    views: 3812,
    timestamp: "2026-10-30T21:45:00Z",
    timeAgo: "44m",
    tickers: ["IREN", "NVDA"],
    sentiment: "bullish",
    url: "https://x.com/growthrapidly/status/2116285460267872416",
  },
  {
    id: "2116285712727453804",
    author: "Jam ossan",
    handle: "@OssanJam",
    avatar: "https://pbs.twimg.com/profile_images/2101526550214746113/yQ7QERWl.jpg",
    content:
      "Semiconductor stocks sold hard. NASDAQ -2.86%, SOX -7.20%. Intel ~-29%, AMD ~-11%, NVIDIA ~-5%. AI demand itself isn't collapsing — this is a rotation out of crowded AI/semiconductor positioning into other sectors. Not a market collapse.",
    likes: 55,
    reposts: 1,
    views: 872,
    timestamp: "2026-10-30T21:46:00Z",
    timeAgo: "43m",
    tickers: ["NVDA", "AMD", "INTC"],
    sentiment: "bearish",
    url: "https://x.com/OssanJam/status/2116285712727453804",
  },
  {
    id: "1999188798727680397",
    author: "Beth Kindig",
    handle: "@Beth_Kindig",
    avatar: "https://pbs.twimg.com/profile_images/1606046913140101120/ogy7cKEX.jpg",
    content:
      "Nvidia $NVDA has dominated the AI training cycle as its data center revenue has risen 12X in ten quarters, yet the forthcoming AI inference wave means the AI accelerator industry will widen beyond Nvidia and benefit other stocks such as Broadcom $AVGO.",
    likes: 319,
    reposts: 34,
    views: 46255,
    timestamp: "2025-12-11T18:45:00Z",
    timeAgo: "earlier",
    tickers: ["NVDA", "AVGO"],
    sentiment: "bullish",
    url: "https://x.com/Beth_Kindig/status/1999188798727680397",
  },
];

export const initialSignals: Signal[] = [
  {
    id: "sig-1",
    ticker: "NVDA",
    theme: "AI Infrastructure / Capex Digestion",
    direction: "Watch",
    confidence: "Medium",
    horizon: "short-term (days–weeks)",
    thesis:
      "Near-term pressure from crowded positioning and AI capex ROI questions after soft hyperscaler guides. Long-term demand (Blackwell, inference wave) remains intact. IREN/Perplexity deal is a positive data point for GPU consumption.",
    supportingPosts: [
      "ParadisLabs: short-term range-bound, longer-term constructive once positioning clears",
      "Multiple high-engagement posts on IREN + Perplexity using NVDA Blackwell Ultra GPUs",
      "Market summary showing rotation out of semis, not demand collapse",
    ],
    suggestedActions: [
      "Avoid chasing strength until volume confirms a base",
      "Watch related names: IREN (positive catalyst), AVGO, TSM",
      "Key narrative to monitor: further hyperscaler commentary on AI spend",
    ],
    risks: [
      "Social sentiment is noisy and can reverse quickly",
      "Further soft guidance or funding concerns could extend the drawdown",
      "This is not financial advice",
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sig-2",
    ticker: "IREN",
    theme: "AI Cloud / GPU Hosting",
    direction: "Bullish",
    confidence: "Medium",
    horizon: "multi-day to weeks",
    thesis:
      "Fresh multi-year agreement with Perplexity to run workloads on NVDA Blackwell Ultra GPUs. High engagement on the announcement and validation of IREN's AI infrastructure positioning. ~$3B contracted ARR still to come online.",
    supportingPosts: [
      "StockSavvyShay (234 likes): Perplexity on Blackwell Ultra at IREN",
      "growthrapidly: remains extremely bullish on $IREN",
      "Official IREN announcement widely quoted",
    ],
    suggestedActions: [
      "Monitor follow-through volume and additional customer announcements",
      "Positive read-through for NVDA GPU demand",
    ],
    risks: [
      "Broader AI sentiment is soft today",
      "Mid-cap volatility is higher than mega-cap",
      "Not financial advice",
    ],
    updatedAt: new Date().toISOString(),
  },
];

export type MarketCache = {
  posts: Post[];
  signals: Signal[];
  lastScan: string;
  regime: string;
};

export function buildCache(posts: Post[], signals: Signal[]): MarketCache {
  const bull = posts.filter((p) => p.sentiment === "bullish").length;
  const bear = posts.filter((p) => p.sentiment === "bearish").length;

  let regime =
    "Short-term cautious on AI/semis (positioning unwind + capex questions). Concrete demand signals (IREN + Perplexity on Blackwell) remain constructive.";

  if (bull > bear + 1) {
    regime =
      "Sentiment tilting more constructive. Bullish posts outnumber bearish. Demand signals (especially IREN/Blackwell) are getting attention.";
  } else if (bear > bull) {
    regime =
      "Cautious tone dominates. More bearish/neutral posts than bullish. Focus remains on AI capex digestion and positioning.";
  }

  return {
    posts,
    signals,
    lastScan: new Date().toISOString(),
    regime,
  };
}

export const defaultCache = buildCache(initialPosts, initialSignals);
