import React from "react";
import { cn } from "@/lib/utils";
import { ConnectionState } from "@/types/driver";

const map = {
  [ConnectionState.ONLINE]: { label: "Online", dot: "bg-driver", text: "text-driver", ring: "ring-driver/30" },
  [ConnectionState.CONNECTING]: { label: "Connecting", dot: "bg-warning animate-pulse", text: "text-warning", ring: "ring-warning/30" },
  [ConnectionState.RECONNECTING]: { label: "Reconnecting", dot: "bg-warning animate-pulse", text: "text-warning", ring: "ring-warning/30" },
  [ConnectionState.OFFLINE]: { label: "Offline", dot: "bg-emergency", text: "text-emergency", ring: "ring-emergency/30" },
};

export default function ConnectionIndicator({ state = ConnectionState.ONLINE, compact = false, className }) {
  const s = map[state] || map[ConnectionState.OFFLINE];
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("w-2 h-2 rounded-full ring-2", s.dot, s.ring)} />
      {!compact && <span className={cn("text-[11px] font-bold uppercase tracking-wide", s.text)}>{s.label}</span>}
    </div>
  );
}