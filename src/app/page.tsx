"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import LiveFeed from "@/components/LiveFeed";
import SignalsPanel from "@/components/SignalsPanel";
import ChatPanel from "@/components/ChatPanel";
import {
  initialPosts,
  initialSignals,
  buildCache,
  type Post,
  type Signal,
  type MarketCache,
} from "@/lib/data";

const TIME_LABELS = [
  "just now",
  "1m ago",
  "2m ago",
  "3m ago",
  "4m ago",
  "5m ago",
  "6m ago",
  "8m ago",
  "10m ago",
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [cache, setCache] = useState<MarketCache>(
    buildCache(initialPosts, initialSignals)
  );
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Keep cache in sync so chat always sees latest
  useEffect(() => {
    setCache(buildCache(posts, signals));
  }, [posts, signals]);

  // Real-time updates every 4 seconds
  useEffect(() => {
    const id = setInterval(() => {
      // Advance time labels
      setPosts((prev) =>
        prev.map((p, idx) => {
          if (idx === 0) return { ...p, timeAgo: "just now" };
          const currentIdx = TIME_LABELS.indexOf(p.timeAgo);
          const nextIdx = Math.min(
            currentIdx === -1 ? 1 : currentIdx + 1,
            TIME_LABELS.length - 1
          );
          return { ...p, timeAgo: TIME_LABELS[nextIdx] };
        })
      );

      // Frequently promote a post + bump engagement
      if (Math.random() > 0.45) {
        setPosts((prev) => {
          if (prev.length < 2) return prev;
          const copy = [...prev];
          const idx = 1 + Math.floor(Math.random() * (copy.length - 1));
          const [item] = copy.splice(idx, 1);
          const bumped = {
            ...item,
            timeAgo: "just now",
            likes: item.likes + Math.floor(Math.random() * 9),
            views: item.views + Math.floor(Math.random() * 150),
          };
          return [bumped, ...copy];
        });
      }

      // Occasionally update signal timestamps / confidence
      if (Math.random() > 0.7) {
        setSignals((prev) =>
          prev.map((s) => ({
            ...s,
            updatedAt: new Date().toISOString(),
          }))
        );
      }

      setLastUpdated("just now");
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 700));

    setPosts((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled.map((p, i) => ({
        ...p,
        timeAgo: i === 0 ? "just now" : TIME_LABELS[Math.min(i, 4)],
        likes: p.likes + Math.floor(Math.random() * 18),
        views: p.views + Math.floor(Math.random() * 400),
      }));
    });

    setSignals((prev) =>
      prev.map((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
      }))
    );

    setLastUpdated("just now");
    setIsRefreshing(false);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg text-text">
      <Header lastUpdated={lastUpdated} />

      <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-r border-border flex flex-col min-h-0">
          <LiveFeed posts={posts} />
        </div>

        <div className="lg:col-span-4 border-r border-border flex flex-col min-h-0">
          <SignalsPanel
            signals={signals}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col min-h-0">
          <ChatPanel cache={cache} />
        </div>
      </main>
    </div>
  );
}
