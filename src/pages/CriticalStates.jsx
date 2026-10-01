import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, XCircle, MapPinOff, SatelliteDish, WifiOff, LogOut,
  UserCheck, Building2, ClipboardCheck, LifeBuoy,
} from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import StateModal from "@/components/shared/StateModal";
import GlassBottomSheet from "@/components/glass/GlassBottomSheet";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import Secondary3DButton from "@/components/buttons/Secondary3DButton";

const states = [
  { id: "S1", title: "Assignment Accept / Decline", icon: AlertTriangle, tone: "emergency", desc: "Dedicated glass sheet for accepting or declining an incoming assignment." },
  { id: "S2", title: "Assignment Cancelled", icon: XCircle, tone: "warning", desc: "Assignment was cancelled by dispatch. Returning you to available status." },
  { id: "S3", title: "GPS Permission Required", icon: MapPinOff, tone: "warning", desc: "Location access is required for dispatch and navigation. Please enable location." },
  { id: "S4", title: "GPS Unavailable", icon: SatelliteDish, tone: "warning", desc: "GPS is unavailable. This may be a permission, hardware, or signal issue." },
  { id: "S5", title: "Connection Lost", icon: WifiOff, tone: "warning", desc: "Connection lost. Reconnecting… Information may be stale until reconnected." },
  { id: "S6", title: "Session Expired", icon: LogOut, tone: "emergency", desc: "Your session has expired. Please sign in again to continue." },
  { id: "S7", title: "Confirm Patient Pickup", icon: UserCheck, tone: "warning", desc: "Confirm patient pickup. This deliberately advances the emergency state." },
  { id: "S8", title: "Confirm Hospital Arrival", icon: Building2, tone: "warning", desc: "Confirm arrival at hospital. This is a deliberate operational action." },
  { id: "S9", title: "Confirm Handover", icon: ClipboardCheck, tone: "warning", desc: "Confirm final handover. Verify key information before confirming." },
  { id: "S10", title: "Emergency / Technical Issue", icon: LifeBuoy, tone: "emergency", desc: "Report an issue: cannot locate patient, route blocked, ambulance, hospital, GPS, or technical." },
];

export default function CriticalStates() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [sheet, setSheet] = useState(null);

  const open = (s) => {
    if (s.id === "S1") { setSheet(s); return; }
    setActive(s);
  };

  return (
    <ScreenLayout title="Critical States" back showNav={false}>
      <GlassCard level="base">
        <p className="text-[13px] text-muted-foreground leading-relaxed">All 10 critical states / modals. Each is a deliberate, high-stakes operational interaction — no accidental state changes.</p>
      </GlassCard>

      <div className="grid grid-cols-1 gap-3">
        {states.map((s) => (
          <GlassCard key={s.id} level="interactive" as="button" onClick={() => open(s)} className="block w-full text-left">
            <div className="flex items-center gap-3">
              <span className={`icon-3d w-11 h-11 ${s.tone === "emergency" ? "text-emergency" : "text-warning"}`}><s.icon className="w-5 h-5" /></span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-muted-foreground">{s.id}</span>
                  <p className="text-[14px] font-bold">{s.title}</p>
                </div>
                <p className="text-[12px] text-muted-foreground line-clamp-1">{s.desc}</p>
              </div>
              <StatusBadge tone={s.tone === "emergency" ? "emergency" : "warning"}>View</StatusBadge>
            </div>
          </GlassCard>
        ))}
      </div>

      <StateModal
        open={!!active}
        onClose={() => setActive(null)}
        icon={active?.icon}
        tone={active?.tone}
        title={active?.title}
        description={active?.desc}
        primaryLabel={active?.id === "S6" ? "Sign In Again" : active?.id === "S3" ? "Enable Location" : active?.id === "S2" ? "Return to Operations" : "Confirm"}
        onPrimary={() => { setActive(null); if (active?.id === "S6" || active?.id === "S2") navigate("/home"); }}
        secondaryLabel={active?.id === "S4" || active?.id === "S5" ? "Retry" : null}
        onSecondary={() => setActive(null)}
        ghostLabel="Dismiss"
        onGhost={() => setActive(null)}
      />

      <GlassBottomSheet
        open={!!sheet}
        onClose={() => setSheet(null)}
        title={sheet?.title}
        footer={
          <>
            <Primary3DButton variant="success" onClick={() => { setSheet(null); navigate("/en-route-patient"); }}>Accept Assignment</Primary3DButton>
            <Secondary3DButton onClick={() => setSheet(null)}>Decline</Secondary3DButton>
          </>
        }
      >
        <div className="flex flex-col items-center text-center gap-3">
          <span className="icon-3d w-16 h-16 text-emergency"><AlertTriangle className="w-8 h-8" /></span>
          <p className="text-[14px] text-muted-foreground">EMG-44120 · Critical · 2.1 km · ETA 7 min</p>
          <p className="text-[13px] font-semibold">Primary action dominates. Decline is secondary.</p>
        </div>
      </GlassBottomSheet>
    </ScreenLayout>
  );
}