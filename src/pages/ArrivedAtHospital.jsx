import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Truck, MapPin } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState } from "@/types/driver";

export default function ArrivedAtHospital() {
  const navigate = useNavigate();
  const { assignment, advanceAssignment } = useDriverState();
  if (!assignment) return null;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const begin = () => {
    advanceAssignment(AssignmentState.HANDOVER, { handoverAt: new Date().toISOString() });
    navigate("/handover");
  };

  return (
    <ScreenLayout title="Arrived at Hospital" back showNav={false}
      stickyAction={<Primary3DButton icon={CheckCircle2} onClick={begin}>Begin Handover</Primary3DButton>}
    >
      <GlassCard level="priority" className="text-center">
        <span className="icon-3d w-20 h-20 mx-auto text-driver"><CheckCircle2 className="w-10 h-10" /></span>
        <h2 className="text-xl font-extrabold tracking-tight mt-3">Arrived at Hospital</h2>
        <OperationalStatus state={assignment.state} className="justify-center mt-2" />
      </GlassCard>

      <GlassCard level="base" className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-driver"><Truck className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Hospital</p><p className="text-[14px] font-semibold">{assignment.hospital?.name}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-warning"><Clock className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Arrival Time</p><p className="text-[14px] font-semibold">{time}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-primary"><MapPin className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Emergency</p><p className="text-[14px] font-semibold">{assignment.emergency.id}</p></div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-9 h-9 text-driver"><CheckCircle2 className="w-4 h-4" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Handover Status</p><p className="text-[14px] font-semibold">Pending</p></div>
        </div>
      </GlassCard>
    </ScreenLayout>
  );
}