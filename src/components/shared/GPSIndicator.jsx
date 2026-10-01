import React from "react";
import { cn } from "@/lib/utils";
import { GPSState } from "@/types/driver";

const map = {
  [GPSState.ACTIVE]: { label: "GPS Active", dot: "bg-driver", text: "text-driver", ring: "ring-driver/30" },
  [GPSState.INITIALIZING]: { label: "GPS Initializing", dot: "bg-warning animate-pulse", text: "text-warning", ring: "ring-warning/30" },
  [GPSState.PERMISSION_REQUIRED]: { label: "GPS Permission", dot: "bg-warning", text: "text-warning", ring: "ring-warning/30" },
  [GPSState.UNAVAILABLE]: { label: "GPS Unavailable", dot: "bg-emergency", text: "text-emergency", ring: "ring-emergency/30" },
  [GPSState.ERROR]: { label: "GPS Error", dot: "bg-emergency", text: "text-emergency", ring: "ring-emergency/30" },
};

export default function GPSIndicator({ state = GPSState.ACTIVE, compact = false, className }) {
  const s = map[state] || map[GPSState.ERROR];
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("w-2 h-2 rounded-full ring-2", s.dot, s.ring)} />
      {!compact && <span className={cn("text-[11px] font-bold uppercase tracking-wide", s.text)}>{s.label}</span>}
    </div>
  );
}