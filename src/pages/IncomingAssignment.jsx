import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Truck, AlertTriangle, Navigation } from "lucide-react";
import Logo from "@/components/shared/Logo";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import Danger3DButton from "@/components/buttons/Danger3DButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState, Priority } from "@/types/driver";

export default function IncomingAssignment() {
  const navigate = useNavigate();
  const { pendingAssignment, acceptAssignment, declineAssignment } = useDriverState();
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!pendingAssignment) return;
    if (seconds <= 0) { declineAssignment(); navigate("/home"); return; }
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds, pendingAssignment, declineAssignment, navigate]);

  if (!pendingAssignment) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-8 text-center gap-4">
        <Logo size={56} />
        <div>
          <p className="text-lg font-extrabold">No incoming assignment</p>
          <p className="text-[13px] text-muted-foreground mt-1">You'll be notified when dispatch sends one.</p>
        </div>
        <button onClick={() => navigate("/home")} className="btn-3d btn-primary-3d h-12 px-5 w-full max-w-xs">Back to Home</button>
      </div>
    );
  }

  const { emergency, eta, hospital } = pendingAssignment;
  const accept = () => { setLoading("accept"); setTimeout(() => { acceptAssignment(); navigate("/en-route-patient"); }, 700); };
  const decline = () => { setLoading("decline"); setTimeout(() => { declineAssignment(); navigate("/home"); }, 500); };

  return (
    <div className="min-h-full flex flex-col px-5 py-8 safe-top safe-bottom">
      <div className="text-center mb-5 fade-in">
        <div className="inline-flex items-center gap-2 glass-emergency rounded-full px-3.5 py-1.5 mb-3">
          <AlertTriangle className="w-4 h-4 text-emergency" />
          <span className="text-[12px] font-extrabold uppercase tracking-wide text-emergency">New Assignment</span>
        </div>
        <p className="text-[12px] font-bold text-muted-foreground">Auto-decline in {seconds}s</p>
      </div>

      <GlassCard level="emergency" className="fade-in">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[15px] font-extrabold tracking-tight">{emergency.id}</p>
          <StatusBadge tone={emergency.priority === Priority.CRITICAL ? "emergency" : "warning"} dot>{emergency.priority}</StatusBadge>
        </div>
        <p className="text-[14px] leading-relaxed mb-4">{emergency.summary}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass-base rounded-xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Distance</p>
            <p className="text-xl font-extrabold tabular-nums mt-0.5">{(eta.distanceMeters / 1000).toFixed(1)} km</p>
          </div>
          <div className="glass-base rounded-xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">ETA</p>
            <p className="text-xl font-extrabold tabular-nums mt-0.5">{eta.minutes} min</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            <MapPin className="w-4 h-4 text-primary" />{emergency.location.label}
          </div>
          {hospital && <div className="flex items-center gap-2 text-[13px] font-semibold"><Truck className="w-4 h-4 text-driver" />{hospital.name}</div>}
        </div>
      </GlassCard>

      <div className="mt-5 flex flex-col gap-2.5">
        <Primary3DButton variant="success" icon={Navigation} loading={loading === "accept"} onClick={accept}>Accept Assignment</Primary3DButton>
        <Danger3DButton icon={AlertTriangle} loading={loading === "decline"} onClick={decline}>Decline</Danger3DButton>
      </div>
    </div>
  );
}