import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, History } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassInput from "@/components/glass/GlassInput";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useDriverState } from "@/lib/driverState";

const filters = ["All", "Completed", "Cancelled"];
const statusTone = { COMPLETED: "driver", CANCELLED: "neutral", FAILED: "emergency" };

function groupByDate(items) {
  const groups = {};
  items.forEach((i) => { (groups[i.date] = groups[i.date] || []).push(i); });
  return Object.entries(groups);
}

export default function AssignmentHistory() {
  const navigate = useNavigate();
  const { history } = useDriverState();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");

  const list = history.filter((h) => {
    if (q && !`${h.emergencyId} ${h.destination}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === "Completed") return h.state === "COMPLETED";
    if (filter === "Cancelled") return h.state === "CANCELLED";
    return true;
  });

  const groups = groupByDate(list);

  return (
    <ScreenLayout title="History" back>
      <div className="flex gap-2">
        <GlassInput icon={Search} placeholder="Search by ID or destination" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        <button className="icon-3d w-12 h-12 shrink-0 text-foreground" aria-label="Filter"><SlidersHorizontal className="w-5 h-5" /></button>
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold border ${filter === f ? "btn-primary-3d border-transparent" : "glass-interactive border-border"}`}>{f}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="glass-base rounded-[1.25rem] p-8 text-center">
          <History className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="text-[14px] font-bold mt-2">No assignments found</p>
          <p className="text-[12px] text-muted-foreground mt-1">Try a different search or filter.</p>
        </div>
      ) : (
        groups.map(([date, items]) => (
          <div key={date}>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
            <div className="flex flex-col gap-3">
              {items.map((h) => (
                <GlassCard key={h.id} level="interactive" as="button" onClick={() => navigate(`/history/${h.id}`)} className="block w-full text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[14px] font-extrabold">{h.emergencyId}</p>
                    <StatusBadge tone={statusTone[h.state] || "neutral"} dot>{h.state}</StatusBadge>
                  </div>
                  <p className="text-[13px] text-muted-foreground truncate">{h.destination}</p>
                  <div className="mt-2 flex items-center justify-between text-[12px] font-semibold text-muted-foreground">
                    <span>{h.durationMin} min</span>
                    <span>Handover: {h.handoverStatus}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))
      )}
    </ScreenLayout>
  );
}