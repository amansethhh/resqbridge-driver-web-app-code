import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Truck, Award } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";

export default function EmergencyCompleted() {
  const navigate = useNavigate();
  const { assignment, clearAssignment } = useDriverState();
  if (!assignment) return null;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const finish = () => {
    clearAssignment();
    navigate("/home");
  };

  return (
    <ScreenLayout title="Completed" back showNav={false}
      stickyAction={<Primary3DButton variant="success" icon={CheckCircle2} onClick={finish}>Return to Operations</Primary3DButton>}
    >
      <GlassCard level="priority" className="text-center">
        <span className="icon-3d w-24 h-24 mx-auto text-driver"><Award className="w-12 h-12" /></span>
        <h2 className="text-2xl font-extrabold tracking-tight mt-3">Emergency Completed</h2>
        <p className="text-[13px] text-muted-foreground mt-1">Great work. Patient delivered safely.</p>
      </GlassCard>

      <GlassCard level="base" className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-primary"><Truck className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Emergency</p><p className="text-[14px] font-semibold">{assignment.emergency.id}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-driver"><CheckCircle2 className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Hospital</p><p className="text-[14px] font-semibold">{assignment.hospital?.name}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-warning"><Clock className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Completion Time</p><p className="text-[14px] font-semibold">{time}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-driver"><CheckCircle2 className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Handover</p><p className="text-[14px] font-semibold">Confirmed</p></div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Transport Duration</p>
          <p className="text-xl font-extrabold tabular-nums">{assignment.eta.minutes + 9}<span className="text-sm text-muted-foreground"> min</span></p>
        </GlassCard>
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Distance</p>
          <p className="text-xl font-extrabold tabular-nums">{(assignment.eta.distanceMeters / 1000).toFixed(1)}<span className="text-sm text-muted-foreground"> km</span></p>
        </GlassCard>
      </div>

      <GhostGlassButton onClick={() => navigate("/history")}>View Assignment History</GhostGlassButton>
    </ScreenLayout>
  );
}