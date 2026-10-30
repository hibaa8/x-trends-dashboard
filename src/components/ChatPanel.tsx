"use client";

import { useState, useRef, useEffect } from "react";
import type { MarketCache, Signal } from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
};

function formatSignal(s: Signal, cache: MarketCache): string {
  const related = cache.posts
    .filter((p) => p.tickers.includes(s.ticker))
    .slice(0, 2);

  let reply = `**$${s.ticker}** — ${s.direction} (${s.confidence})
Theme: ${s.theme}
Horizon: ${s.horizon}

${s.thesis}

Suggested:
${s.suggestedActions.map((a) => `• ${a}`).join("\n")}

Risks: ${s.risks[0]}`;

  if (related.length) {
    reply += `\n\nKey posts:`;
    related.forEach((p) => {
      reply += `\n• ${p.author}: ${p.url}`;
    });
  }

  return reply;
}

function generateReply(userText: string, cache: MarketCache): string {
  const q = userText.toLowerCase().trim();

  // 1. Investment questions first (highest priority)
  if (
    /\b(invest|buy|suggest|recommendation|what should|next trade|portfolio|stock to|stocks to|where to put|what stock)\b/.test(
      q
    )
  ) {
    const bullish = cache.signals.filter((s) => s.direction === "Bullish");
    const watch = cache.signals.filter((s) => s.direction === "Watch");
    const bearish = cache.signals.filter((s) => s.direction === "Bearish");

    const bullPosts = cache.posts.filter((p) => p.sentiment === "bullish").length;
    const bearPosts = cache.posts.filter((p) => p.sentiment === "bearish").length;
    const neutralPosts = cache.posts.filter((p) => p.sentiment === "neutral").length;

    let reply = `Sentiment snapshot from latest X posts:\n`;
    reply += `• Bullish posts: ${bullPosts}\n• Bearish posts: ${bearPosts}\n• Neutral: ${neutralPosts}\n\n`;
    reply += `${cache.regime}\n\n`;

    if (bullish.length) {
      reply += `**Best idea from current scan:**\n`;
      bullish.forEach((s) => {
        reply += `\n$${s.ticker} — ${s.direction} (${s.confidence})\n`;
        reply += `${s.thesis.split(".").slice(0, 2).join(".")}.\n`;
        reply += s.suggestedActions.map((a) => `→ ${a}`).join("\n") + "\n";

        const topPost = cache.posts.find((p) => p.tickers.includes(s.ticker));
        if (topPost) {
          reply += `Key post: ${topPost.url}\n`;
        }
      });
    } else {
      reply += `No high-conviction Bullish signals right now.\n`;
    }

    if (watch.length) {
      reply += `\n**Names to watch (wait for better entry):**\n`;
      watch.forEach((s) => {
        reply += `• $${s.ticker} — ${s.direction}. ${s.thesis.split(".")[0]}.\n`;
      });
    }

    if (bearish.length) {
      reply += `\n**Avoid / underweight for now:**\n`;
      bearish.forEach((s) => {
        reply += `• $${s.ticker}\n`;
      });
    }

    reply += `\nNot financial advice. This is a social-sentiment view only.`;
    return reply;
  }

  // 2. Specific tickers
  for (const s of cache.signals) {
    const ticker = s.ticker.toLowerCase();
    if (q.includes(ticker) || (ticker === "nvda" && q.includes("nvidia"))) {
      return formatSignal(s, cache);
    }
  }

  // 3. Refresh / scan (stricter — no bare "now")
  if (/\b(refresh|update|scan|latest|rescann?)\b/.test(q)) {
    const lines = cache.signals.map(
      (s) =>
        `• $${s.ticker} — ${s.direction} (${s.confidence}) · ${s.theme}`
    );
    return `Rescanned X data.\n\nCurrent regime:\n${cache.regime}\n\nActive signals:\n${lines.join(
      "\n"
    )}\n\nAsk about any ticker for the full thesis.`;
  }

  // Sentiment / market overview
  if (/\b(sentiment|market|overview|regime|what.?s happening)\b/.test(q)) {
    return `Current X-derived regime:\n\n${cache.regime}\n\nTop signals:\n${cache.signals
      .map((s) => `• $${s.ticker}: ${s.direction} (${s.confidence})`)
      .join("\n")}`;
  }

  // Help
  if (/\b(help|what can|commands)\b/.test(q)) {
    return `You can ask me:
• "What should I invest in?" or "suggest stocks"
• Specific tickers: NVDA, IREN, etc.
• "refresh" or "latest scan"
• "market sentiment" or "what's the regime"

I answer from the live X cache (posts + structured signals).`;
  }

  // Default – still useful
  return `Current regime from X:\n${cache.regime}\n\nActive signals: ${cache.signals
    .map((s) => `$${s.ticker} (${s.direction})`)
    .join(", ")}.\n\nAsk about a ticker or say "what should I invest in" for a concrete take.`;
}

export default function ChatPanel({ cache }: { cache: MarketCache }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: `X scan loaded.\n\n${cache.regime}\n\nAsk about a ticker (NVDA, IREN) or say "what should I invest in".`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), role: "user", content: text },
    ]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 700));

    const reply = generateReply(text, cache);
    setMessages((m) => [
      ...m,
      { id: (Date.now() + 1).toString(), role: "agent", content: reply },
    ]);
    setIsTyping(false);
  }

  return (
    <section className="flex flex-col h-full min-h-0 bg-surface">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium tracking-tight">Agent</h2>
        <p className="text-[11px] text-muted mt-0.5">
          Answers from current X cache
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[92%] rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-accent text-bg rounded-br-sm"
                  : "bg-surface-2 border border-border text-text/90 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-2 border border-border rounded-lg px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "0.12s" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "0.24s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 border-t border-border flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about NVDA, IREN, or what to invest in…"
          className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent/50 placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-4 py-2 rounded-md bg-accent text-bg text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </section>
  );
}
