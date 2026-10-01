import React from "react";
import { Fuel, Battery, Gauge, Wrench, CheckCircle2 } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Driver3DIcon from "@/components/shared/Driver3DIcon";
import Ambulance3D from "@/components/shared/Ambulance3D";
import { useNavigate } from "react-router-dom";
import { useDriverState } from "@/lib/driverState";

function Stat({ icon, label, value, accent }) {
  return (
    <GlassCard level="base" className="flex items-center gap-3">
      <Driver3DIcon icon={icon} size="md" accent={accent} />
      <div>
        <p className="text-[16px] font-extrabold tabular-nums">{value}</p>
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      </div>
    </GlassCard>
  );
}

export default function AmbulanceDetails() {
  const { ambulance } = useDriverState();
  const navigate = useNavigate();
  return (
    <ScreenLayout title="Ambulance" back showNav={false}>
      <GlassCard level="priority">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xl font-extrabold tracking-tight">{ambulance.id}</p>
            <p className="text-[13px] font-semibold text-muted-foreground">{ambulance.registration}</p>
          </div>
          <StatusBadge tone="driver" dot>Operational</StatusBadge>
        </div>
        <Ambulance3D />
        <p className="text-[13px] text-muted-foreground mt-3">{ambulance.type}</p>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <Stat icon={Fuel} label="Fuel" value={`${ambulance.fuel}%`} accent="primary" />
        <Stat icon={Battery} label="Battery" value={`${ambulance.battery}%`} accent="driver" />
        <Stat icon={Gauge} label="Mileage" value={`${ambulance.mileage.toLocaleString()} km`} accent="accent" />
        <Stat icon={Wrench} label="Equipment" value={`${ambulance.equipment.length} items`} accent="warning" />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Equipment Status</p>
        <GlassCard level="base">
          <ul className="flex flex-col gap-2.5">
            {ambulance.equipment.map((e) => (
              <li key={e} className="flex items-center justify-between">
                <span className="text-[14px] font-semibold">{e}</span>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-driver"><CheckCircle2 className="w-4 h-4" />Ready</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard level="base" as="button" onClick={() => navigate("/issue")} className="block w-full text-left">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-bold">Report vehicle issue</p>
            <p className="text-[12px] text-muted-foreground">Notify dispatch of a problem</p>
          </div>
          <StatusBadge tone="warning">Report</StatusBadge>
        </div>
      </GlassCard>
    </ScreenLayout>
  );
}