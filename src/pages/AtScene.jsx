import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, UserX, Radio, AlertTriangle, MapPin } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import Secondary3DButton from "@/components/buttons/Secondary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState } from "@/types/driver";

export default function AtScene() {
  const navigate = useNavigate();
  const { assignment, advanceAssignment } = useDriverState();
  const [confirm, setConfirm] = useState(false);
  if (!assignment) return null;

  const pickup = () => {
    advanceAssignment(AssignmentState.PATIENT_PICKED_UP, { pickedUpAt: new Date().toISOString() });
    navigate("/patient-pickup");
  };

  return (
    <ScreenLayout title="At Scene" back showNav={false}
      stickyAction={<Primary3DButton variant="success" icon={UserCheck} onClick={() => setConfirm(true)}>Patient Picked Up</Primary3DButton>}
    >
      <GlassCard level="priority">
        <OperationalStatus state={assignment.state} large />
        <p className="text-[14px] font-semibold mt-2 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{assignment.emergency.location.label}</p>
      </GlassCard>

      <GlassCard level="base">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-3">Scene Actions</p>
        <div className="flex flex-col gap-2.5">
          <Secondary3DButton icon={UserCheck} onClick={() => setConfirm(true)}>Patient Located</Secondary3DButton>
          <GhostGlassButton icon={UserX} onClick={() => navigate("/issue")}>Unable to Locate Patient</GhostGlassButton>
          <GhostGlassButton icon={Radio} onClick={() => navigate("/issue")}>Contact Dispatch</GhostGlassButton>
          <GhostGlassButton icon={AlertTriangle} onClick={() => navigate("/issue")}>Report Issue</GhostGlassButton>
        </div>
      </GlassCard>

      {confirm && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={() => setConfirm(false)} />
          <div className="relative w-full max-w-md glass-priority rounded-[1.5rem] p-5 scale-in">
            <h3 className="text-lg font-extrabold mb-2">Confirm patient pickup?</h3>
            <p className="text-[14px] text-muted-foreground mb-4">This is a deliberate action. The emergency state will advance to "Patient Picked Up".</p>
            <div className="flex flex-col gap-2.5">
              <Primary3DButton variant="success" onClick={pickup}>Confirm Pickup</Primary3DButton>
              <GhostGlassButton onClick={() => setConfirm(false)}>Cancel</GhostGlassButton>
            </div>
          </div>
        </div>
      )}
    </ScreenLayout>
  );
}