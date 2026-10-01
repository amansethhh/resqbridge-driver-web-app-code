import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Truck, CheckCircle2 } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Timeline from "@/components/shared/Timeline";
import { useDriverState } from "@/lib/driverState";
import { mockTimeline } from "@/data/mock";

export default function AssignmentHistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { history } = useDriverState();
  const item = history.find((h) => h.id === id) || history[0];

  return (
    <ScreenLayout title="History Detail" back showNav={false}>
      <GlassCard level="priority">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[15px] font-extrabold">{item.emergencyId}</p>
          <StatusBadge tone={item.state === "COMPLETED" ? "driver" : "neutral"} dot>{item.state}</StatusBadge>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Date</p>
            <p className="text-[14px] font-semibold">{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Duration</p>
            <p className="text-[14px] font-semibold">{item.durationMin} min</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Destination</p>
            <p className="text-[14px] font-semibold">{item.destination}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Handover</p>
            <p className="text-[14px] font-semibold inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-driver" />{item.handoverStatus}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard level="base">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-3">Assignment Timeline</p>
        <Timeline events={mockTimeline} />
      </GlassCard>

      <GlassCard level="base" className="flex items-center gap-2.5">
        <span className="icon-3d w-9 h-9 text-primary"><MapPin className="w-4 h-4" /></span>
        <p className="text-[13px] font-semibold">Pickup location logged</p>
      </GlassCard>
      <GlassCard level="base" className="flex items-center gap-2.5">
        <span className="icon-3d w-9 h-9 text-driver"><Truck className="w-4 h-4" /></span>
        <p className="text-[13px] font-semibold">{item.destination}</p>
      </GlassCard>
      <GlassCard level="base" className="flex items-center gap-2.5">
        <span className="icon-3d w-9 h-9 text-warning"><Clock className="w-4 h-4" /></span>
        <p className="text-[13px] font-semibold">Final state: {item.state}</p>
      </GlassCard>
    </ScreenLayout>
  );
}