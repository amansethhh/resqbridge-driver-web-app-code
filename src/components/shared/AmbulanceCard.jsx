import React from "react";
import { Fuel, Battery, Gauge, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";

function Meter({ icon: Icon, label, value, tone }) {
  const color = tone === "fuel" ? "bg-primary" : tone === "battery" ? "bg-driver" : "bg-warning";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground">
          <Icon className="w-3.5 h-3.5" />{label}
        </span>
        <span className="text-[12px] font-bold tabular-nums">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function AmbulanceCard({ ambulance, onClick, className }) {
  return (
    <GlassCard level="interactive" as="button" onClick={onClick} className={cn("block w-full text-left", className)}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[15px] font-extrabold tracking-tight">{ambulance.id}</p>
          <p className="text-[12px] font-semibold text-muted-foreground">{ambulance.registration}</p>
        </div>
        <StatusBadge tone="driver" dot>Operational</StatusBadge>
      </div>
      <p className="text-[12px] text-muted-foreground mb-3">{ambulance.type}</p>
      <div className="grid grid-cols-2 gap-3">
        <Meter icon={Fuel} label="Fuel" value={ambulance.fuel} tone="fuel" />
        <Meter icon={Battery} label="Battery" value={ambulance.battery} tone="battery" />
      </div>
      <div className="mt-3 flex items-center gap-3 text-[12px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Gauge className="w-3.5 h-3.5" />{ambulance.mileage.toLocaleString()} km</span>
        <span className="inline-flex items-center gap-1"><Wrench className="w-3.5 h-3.5" />{ambulance.equipment.length} items</span>
      </div>
    </GlassCard>
  );
}