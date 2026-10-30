"use client";

export default function Header({ lastUpdated }: { lastUpdated: string }) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-sm text-white">
              X
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight leading-none">
                X Trends
              </h1>
              <p className="text-[11px] text-muted leading-none mt-0.5">
                Real-time trading signals
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
            <span className="live-dot inline-block w-2 h-2 rounded-full bg-accent-green"></span>
            <span>Live</span>
            <span className="text-border">|</span>
            <span>Updated {lastUpdated}</span>
          </div>
          <div className="text-[11px] px-2 py-1 rounded-md bg-border/50 text-muted font-mono">
            powered by Grok
          </div>
        </div>
      </div>
    </header>
  );
}
