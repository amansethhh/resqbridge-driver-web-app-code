import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, CheckCircle2 } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState } from "@/types/driver";

export default function ArrivedAtScene() {
  const navigate = useNavigate();
  const { assignment } = useDriverState();
  if (!assignment) return null;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ScreenLayout title="Arrived at Scene" back showNav={false}
      stickyAction={<Primary3DButton variant="success" icon={CheckCircle2} onClick={() => navigate("/at-scene")}>Proceed to Scene</Primary3DButton>}
    >
      <GlassCard level="priority" className="text-center">
        <span className="icon-3d w-20 h-20 mx-auto text-driver"><CheckCircle2 className="w-10 h-10" /></span>
        <h2 className="text-xl font-extrabold tracking-tight mt-3">Arrived at Scene</h2>
        <OperationalStatus state={assignment.state} className="justify-center mt-2" />
      </GlassCard>

      <GlassCard level="base" className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-primary"><MapPin className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Emergency</p><p className="text-[14px] font-semibold">{assignment.emergency.id}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-warning"><Clock className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Arrival Time</p><p className="text-[14px] font-semibold">{time}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-primary"><MapPin className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Location</p><p className="text-[14px] font-semibold">{assignment.emergency.location.label}</p></div>
        </div>
      </GlassCard>
    </ScreenLayout>
  );
}