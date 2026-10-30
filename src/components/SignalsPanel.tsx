"use client";

import type { Signal } from "@/lib/data";

function DirectionBadge({ direction }: { direction: Signal["direction"] }) {
  const map = {
    Bullish: "text-bull border-bull/30",
    Bearish: "text-bear border-bear/30",
    Watch: "text-watch border-watch/30",
  };
  return (
    <span
      className={`text-[11px] font-medium px-1.5 py-0.5 rounded border ${map[direction]}`}
    >
      {direction}
    </span>
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
    <section className="flex flex-col h-full min-h-0 bg-surface">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium">Signals</h2>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-[11px] px-2 py-1 rounded border border-border text-muted hover:text-text hover:border-accent/40 transition disabled:opacity-50"
        >
          {isRefreshing ? "Scanning…" : "Refresh"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {signals.map((sig) => (
          <div
            key={sig.id}
            className="rounded-lg border border-border bg-bg p-4 fade-in"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold tracking-tight">
                    ${sig.ticker}
                  </span>
                  <DirectionBadge direction={sig.direction} />
                </div>
                <p className="text-[11px] text-muted mt-0.5">{sig.theme}</p>
              </div>
              <span className="text-[11px] text-muted">{sig.confidence}</span>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-text/80">
              {sig.thesis}
            </p>

            <div className="mt-3 space-y-1">
              {sig.suggestedActions.map((a, i) => (
                <div key={i} className="text-[12px] text-muted flex gap-2">
                  <span className="text-accent">→</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 pt-2 border-t border-border/60 text-[11px] text-muted">
              {sig.horizon} · Not financial advice
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
