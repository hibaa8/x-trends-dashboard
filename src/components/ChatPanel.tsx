"use client";

import { useState, useRef, useEffect } from "react";
import { agentResponses } from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: agentResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function getAgentReply(userText: string): string {
    const lower = userText.toLowerCase();
    if (lower.includes("nvda") || lower.includes("nvidia"))
      return agentResponses.nvda;
    if (lower.includes("iren")) return agentResponses.iren;
    if (
      lower.includes("refresh") ||
      lower.includes("update") ||
      lower.includes("scan")
    )
      return agentResponses.refresh;
    if (lower.includes("help") || lower.includes("what can"))
      return `I can help with:

• "NVDA" or "NVIDIA" — detailed signal
• "IREN" — latest on the Perplexity deal
• "refresh signals" — re-run analysis
• Or ask about any ticker/theme in the current feed

I use the x-trading-trends skill + live X data patterns.`;

    return `Got it. Based on the current X scan:

Short-term sentiment around AI/semis is cautious (positioning unwind + capex questions). Concrete demand signals (e.g. IREN + Perplexity on Blackwell) remain constructive.

Ask about a specific name or say **refresh signals** for a full update.`;
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent thinking
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    const reply: Message = {
      id: (Date.now() + 1).toString(),
      role: "agent",
      content: getAgentReply(text),
      timestamp: new Date(),
    };
    setMessages((m) => [...m, reply]);
    setIsTyping(false);
  }

  return (
    <section className="flex flex-col h-full min-h-0">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Agent Chat</h2>
        <p className="text-[11px] text-muted mt-0.5">
          Ask about signals, tickers, or say “refresh”
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-md"
                  : "bg-card border border-border text-slate-300 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: "0.3s" }}
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
          placeholder="Ask about NVDA, IREN, or refresh…"
          className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-accent/60 placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-blue-600 transition disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </section>
  );
}
