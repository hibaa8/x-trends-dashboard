"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LiveFeed from "@/components/LiveFeed";
import SignalsPanel from "@/components/SignalsPanel";
import ChatPanel from "@/components/ChatPanel";
import { initialPosts, initialSignals, type Post, type Signal } from "@/lib/data";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate mild live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((prev) => {
        if (prev === "just now") return "1m ago";
        if (prev === "1m ago") return "2m ago";
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  async function handleRefresh() {
    setIsRefreshing(true);
    // Simulate analysis delay
    await new Promise((r) => setTimeout(r, 1200));

    // In a real version this would call the x-trading-trends agent / X tools.
    // For now we just bump the timestamp and lightly reorder to feel live.
    setSignals((prev) =>
      prev.map((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
      }))
    );
    setLastUpdated("just now");
    setIsRefreshing(false);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header lastUpdated={lastUpdated} />

      <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Live Feed */}
        <div className="lg:col-span-4 border-r border-border flex flex-col min-h-0 bg-background">
          <LiveFeed posts={posts} />
        </div>

        {/* Center: AI Signals */}
        <div className="lg:col-span-4 border-r border-border flex flex-col min-h-0 bg-background">
          <SignalsPanel
            signals={signals}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        </div>

        {/* Right: Chat */}
        <div className="lg:col-span-4 flex flex-col min-h-0 bg-background">
          <ChatPanel />
        </div>
      </main>
    </div>
  );
}
