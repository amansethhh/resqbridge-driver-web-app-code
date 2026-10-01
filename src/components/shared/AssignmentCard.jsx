import React from "react";
import { Clock, MapPin, Truck } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Priority } from "@/types/driver";
import { cn } from "@/lib/utils";

const priorityTone = { CRITICAL: "emergency", URGENT: "warning", STANDARD: "primary" };

export default function AssignmentCard({ assignment, onClick, className }) {
  const { emergency, eta, hospital } = assignment;
  return (
    <GlassCard level="interactive" as="button" onClick={onClick} className={cn("block w-full text-left", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-extrabold tracking-tight text-foreground">{emergency.id}</span>
        <StatusBadge tone={priorityTone[emergency.priority]} dot>{emergency.priority}</StatusBadge>
      </div>
      <p className="text-[13px] text-muted-foreground leading-snug line-clamp-2 mb-3">{emergency.summary}</p>
      <div className="flex items-center gap-3 text-[12px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{(eta.distanceMeters / 1000).toFixed(1)} km</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{eta.minutes} min</span>
        {hospital && <span className="inline-flex items-center gap-1 truncate"><Truck className="w-3.5 h-3.5" />{hospital.name}</span>}
      </div>
    </GlassCard>
  );
}