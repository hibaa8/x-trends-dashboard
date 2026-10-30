"use client";

import type { Post } from "@/lib/data";

function SentimentBadge({ sentiment }: { sentiment: Post["sentiment"] }) {
  const styles = {
    bullish: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bearish: "bg-red-500/15 text-red-400 border-red-500/30",
    neutral: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  };
  return (
    <span
      className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border ${styles[sentiment]}`}
    >
      {sentiment}
    </span>
  );
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function LiveFeed({ posts }: { posts: Post[] }) {
  return (
    <section className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Live Feed</h2>
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-accent-green"></span>
        </div>
        <span className="text-[11px] text-muted">{posts.length} posts</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/60">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="px-4 py-3.5 hover:bg-card-hover/50 transition-colors fade-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-9 h-9 rounded-full bg-border shrink-0 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect fill='%231e293b' width='36' height='36'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' fill='%2394a3b8' font-size='14'%3E?%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-sm truncate">
                      {post.author}
                    </span>
                    <span className="text-muted text-xs truncate">
                      {post.handle}
                    </span>
                    <span className="text-muted text-xs">· {post.timeAgo}</span>
                    <SentimentBadge sentiment={post.sentiment} />
                  </div>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                    <div className="flex gap-1.5">
                      {post.tickers.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          ${t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted ml-auto">
                      <span>♥ {formatNumber(post.likes)}</span>
                      <span>↻ {formatNumber(post.reposts)}</span>
                      <span>▶ {formatNumber(post.views)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
