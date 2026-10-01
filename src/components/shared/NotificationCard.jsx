import React from "react";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";

const typeTone = {
  assignment: "emergency",
  dispatch: "primary",
  hospital: "driver",
  system: "neutral",
  account: "warning",
};

const typeIcon = {
  assignment: "🚑",
  dispatch: "📡",
  hospital: "🏥",
  system: "⚙️",
  account: "👤",
};

export default function NotificationCard({ notification, onClick, className }) {
  const n = notification;
  return (
    <GlassCard
      level={n.read ? "base" : "elevated"}
      as="button"
      onClick={onClick}
      className={cn("block w-full text-left", !n.read && "ring-1 ring-primary/20", className)}
    >
      <div className="flex items-start gap-3">
        <span className="icon-3d w-10 h-10 shrink-0 text-base">{typeIcon[n.type] || "🔔"}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[14px] font-bold truncate">{n.title}</p>
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">{n.createdAt}</span>
          </div>
          <p className="text-[13px] text-muted-foreground leading-snug mt-0.5">{n.body}</p>
          <div className="mt-2 flex items-center gap-2">
            {!n.read && <StatusBadge tone={typeTone[n.type] || "neutral"}>New</StatusBadge>}
            {n.important && <StatusBadge tone="warning">Important</StatusBadge>}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}