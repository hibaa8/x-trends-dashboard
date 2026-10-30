"use client";

export default function Header({ lastUpdated }: { lastUpdated: string }) {
  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[11px] font-bold text-bg">
            X
          </div>
          <h1 className="text-sm font-medium tracking-tight leading-none">
            Trends
          </h1>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Live
          </span>
          <span className="text-border">·</span>
          <span>{lastUpdated}</span>
        </div>
      </div>
    </header>
  );
}
