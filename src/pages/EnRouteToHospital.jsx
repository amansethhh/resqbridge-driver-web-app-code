import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Truck, MapPin, Radio } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import MapPanel from "@/components/shared/MapPanel";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState } from "@/types/driver";

export default function EnRouteToHospital() {
  const navigate = useNavigate();
  const { assignment, advanceAssignment } = useDriverState();
  const [confirm, setConfirm] = useState(false);
  if (!assignment) return null;

  const arrive = () => {
    advanceAssignment(AssignmentState.AT_HOSPITAL, { hospitalArrivedAt: new Date().toISOString() });
    navigate("/arrived-hospital");
  };

  return (
    <ScreenLayout title="En Route to Hospital" back showNav={false}
      stickyAction={<Primary3DButton icon={Navigation} onClick={() => setConfirm(true)}>Arrived at Hospital</Primary3DButton>}
    >
      <GlassCard level="priority">
        <OperationalStatus state={assignment.state} large />
        <p className="text-[14px] font-semibold mt-2 flex items-center gap-1.5"><Truck className="w-4 h-4 text-driver" />{assignment.hospital?.name}</p>
      </GlassCard>

      <MapPanel eta={assignment.eta} distance={assignment.eta.distanceMeters} destination={assignment.hospital?.location} height="h-60" />

      <div className="grid grid-cols-2 gap-3">
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">ETA</p>
          <p className="text-2xl font-extrabold tabular-nums">{assignment.eta.minutes}<span className="text-sm text-muted-foreground"> min</span></p>
        </GlassCard>
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Distance</p>
          <p className="text-2xl font-extrabold tabular-nums">{(assignment.eta.distanceMeters / 1000).toFixed(1)}<span className="text-sm text-muted-foreground"> km</span></p>
        </GlassCard>
      </div>

      <GlassCard level="base" className="flex items-center gap-2.5">
        <span className="icon-3d w-9 h-9 text-primary"><MapPin className="w-4 h-4" /></span>
        <p className="text-[13px] font-semibold">{assignment.hospital?.location.label}</p>
      </GlassCard>

      <GhostGlassButton icon={Radio} onClick={() => navigate("/issue")}>Contact Dispatch</GhostGlassButton>

      {confirm && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={() => setConfirm(false)} />
          <div className="relative w-full max-w-md glass-priority rounded-[1.5rem] p-5 scale-in">
            <h3 className="text-lg font-extrabold mb-2">Confirm hospital arrival?</h3>
            <p className="text-[14px] text-muted-foreground mb-4">This updates the emergency state to "At Hospital".</p>
            <div className="flex flex-col gap-2.5">
              <Primary3DButton variant="success" onClick={arrive}>Confirm Arrival</Primary3DButton>
              <GhostGlassButton onClick={() => setConfirm(false)}>Cancel</GhostGlassButton>
            </div>
          </div>
        </div>
      )}
    </ScreenLayout>
  );
}