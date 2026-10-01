import React, { useState } from "react";
import { Search, SlidersHorizontal, CheckCheck } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassInput from "@/components/glass/GlassInput";
import NotificationCard from "@/components/shared/NotificationCard";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";

const filters = ["All", "Unread", "Important", "Assignment", "System"];

export default function Alerts() {
  const { notifications, markNotificationRead } = useDriverState();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const list = notifications.filter((n) => {
    if (q && !(`${n.title} ${n.body}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (filter === "Unread") return !n.read;
    if (filter === "Important") return n.important;
    if (filter === "Assignment") return n.type === "assignment";
    if (filter === "System") return n.type === "system";
    return true;
  });

  return (
    <ScreenLayout title="Alerts" back>
      <div className="flex gap-2">
        <GlassInput icon={Search} placeholder="Search notifications" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        <button className="icon-3d w-12 h-12 shrink-0 text-foreground" aria-label="Filter"><SlidersHorizontal className="w-5 h-5" /></button>
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold border ${filter === f ? "btn-primary-3d border-transparent" : "glass-interactive border-border"}`}>
            {f}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="glass-base rounded-[1.25rem] p-8 text-center">
          <p className="text-[14px] font-bold">No notifications</p>
          <p className="text-[12px] text-muted-foreground mt-1">You're all caught up.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((n) => (
            <NotificationCard key={n.id} notification={n} onClick={() => markNotificationRead(n.id)} />
          ))}
        </div>
      )}

      {notifications.some((n) => !n.read) && (
        <GhostGlassButton icon={CheckCheck} onClick={() => notifications.forEach((n) => !n.read && markNotificationRead(n.id))}>Mark all as read</GhostGlassButton>
      )}
    </ScreenLayout>
  );
}