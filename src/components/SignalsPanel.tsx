"use client";

import type { Signal } from "@/lib/data";

function DirectionBadge({ direction }: { direction: Signal["direction"] }) {
  const map = {
    Bullish: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    Bearish: "bg-red-500/15 text-red-400 border-red-500/40",
    Watch: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-md border ${map[direction]}`}
    >
      {direction}
    </span>
  );
}

function ConfidenceDots({ level }: { level: Signal["confidence"] }) {
  const count = level === "High" ? 3 : level === "Medium" ? 2 : 1;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= count ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
      <span className="text-[11px] text-muted ml-1">{level}</span>
    </div>
  );
}

export default function SignalsPanel({
  signals,
  onRefresh,
  isRefreshing,
}: {
  signals: Signal[];
  onRefresh: () => void;
  isRefreshing: boolean;
}) {
  return (
    <section className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">AI Signals</h2>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-[11px] px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition disabled:opacity-50"
        >
          {isRefreshing ? "Analyzing…" : "Refresh"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {signals.map((sig) => (
          <div
            key={sig.id}
            className="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors fade-in"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold tracking-tight">
                    ${sig.ticker}
                  </span>
                  <DirectionBadge direction={sig.direction} />
                </div>
                <p className="text-[11px] text-muted mt-0.5">{sig.theme}</p>
              </div>
              <ConfidenceDots level={sig.confidence} />
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
              {sig.thesis}
            </p>

            <div className="mt-3">
              <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-1.5">
                Suggested Actions
              </p>
              <ul className="space-y-1">
                {sig.suggestedActions.map((a, i) => (
                  <li
                    key={i}
                    className="text-[12px] text-slate-400 flex gap-2"
                  >
                    <span className="text-accent mt-0.5">→</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 pt-3 border-t border-border/60">
              <p className="text-[11px] text-muted">
                Horizon: {sig.horizon} · Not financial advice
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
