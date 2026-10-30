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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [cache, setCache] = useState<MarketCache>(
    buildCache(initialPosts, initialSignals)
  );
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Keep cache in sync so chat always sees latest data
  useEffect(() => {
    setCache(buildCache(posts, signals));
  }, [posts, signals]);

  // Real-time clock
  useEffect(() => {
    const times = ["just now", "1m ago", "2m ago", "3m ago", "4m ago", "5m ago"];
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(i + 1, times.length - 1);
      setLastUpdated(times[i]);
    }, 45_000);
    return () => clearInterval(id);
  }, []);

  // Light real-time simulation: occasionally promote a post to top
  useEffect(() => {
    const id = setInterval(() => {
      setPosts((prev) => {
        if (prev.length < 2) return prev;
        const copy = [...prev];
        const idx = 1 + Math.floor(Math.random() * (copy.length - 1));
        const [item] = copy.splice(idx, 1);
        return [{ ...item, timeAgo: "just now" }, ...copy];
      });
      setLastUpdated("just now");
    }, 90_000);
    return () => clearInterval(id);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 900));
    setSignals((prev) =>
      prev.map((s) => ({ ...s, updatedAt: new Date().toISOString() }))
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
