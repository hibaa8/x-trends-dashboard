"use client";

import type { Post } from "@/lib/data";

function SentimentTag({ sentiment }: { sentiment: Post["sentiment"] }) {
  const map = {
    bullish: "text-bull",
    bearish: "text-bear",
    neutral: "text-muted",
  };
  return (
    <span className={`text-[10px] uppercase tracking-wider ${map[sentiment]}`}>
      {sentiment}
    </span>
  );
}

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export default function LiveFeed({ posts }: { posts: Post[] }) {
  return (
    <section className="flex flex-col h-full min-h-0 bg-surface">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium">Feed</h2>
        <span className="text-[11px] text-muted">{posts.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/70">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="px-4 py-3.5 hover:bg-surface-2/60 transition-colors fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex gap-3">
                <img
                  src={post.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full bg-border shrink-0 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%2327272a' width='32' height='32'/%3E%3C/svg%3E";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap text-[12px]">
                    <span className="font-medium truncate">{post.author}</span>
                    <span className="text-muted truncate">{post.handle}</span>
                    <span className="text-muted">· {post.timeAgo}</span>
                    <SentimentTag sentiment={post.sentiment} />
                  </div>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-text/85">
                    {post.content}
                  </p>

                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {post.tickers.map((t) => (
                      <span key={t} className="text-[11px] font-mono text-accent">
                        ${t}
                      </span>
                    ))}
                    <div className="flex items-center gap-3 text-[11px] text-muted ml-auto">
                      <span>{fmt(post.likes)}</span>
                      <span>{fmt(post.reposts)}</span>
                      <span>{fmt(post.views)}</span>
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
