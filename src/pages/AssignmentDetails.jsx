import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Truck, FileText, Radio, Navigation, AlertCircle } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import OperationalStatus from "@/components/shared/OperationalStatus";
import MapPanel from "@/components/shared/MapPanel";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";
import { AssignmentState } from "@/types/driver";

const nextAction = {
  [AssignmentState.RECEIVED]: { label: "Accept Assignment", to: "/incoming", variant: "success" },
  [AssignmentState.ACCEPTED]: { label: "En Route to Patient", to: "/en-route-patient", variant: "primary" },
  [AssignmentState.EN_ROUTE_TO_PATIENT]: { label: "Arrived at Scene", to: "/arrived-scene", variant: "primary" },
  [AssignmentState.AT_SCENE]: { label: "At Scene Actions", to: "/at-scene", variant: "warning" },
  [AssignmentState.PATIENT_PICKED_UP]: { label: "Start Transport", to: "/patient-pickup", variant: "primary" },
  [AssignmentState.EN_ROUTE_TO_HOSPITAL]: { label: "Arrived at Hospital", to: "/en-route-hospital", variant: "primary" },
  [AssignmentState.AT_HOSPITAL]: { label: "Begin Handover", to: "/arrived-hospital", variant: "primary" },
  [AssignmentState.HANDOVER]: { label: "Confirm Handover", to: "/handover", variant: "primary" },
  [AssignmentState.COMPLETED]: { label: "Return to Operations", to: "/home", variant: "success" },
};

function InfoRow({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`icon-3d w-9 h-9 ${tone || "text-primary"}`}><Icon className="w-4 h-4" /></span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-[14px] font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function AssignmentDetails() {
  const navigate = useNavigate();
  const { assignment, advanceAssignment } = useDriverState();

  if (!assignment) {
    return (
      <ScreenLayout title="Assignment" back>
        <div className="glass-base rounded-[1.25rem] p-8 text-center">
          <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="text-[14px] font-bold mt-2">No active assignment</p>
          <p className="text-[12px] text-muted-foreground mt-1">Accept an assignment to see details.</p>
          <div className="mt-4"><GhostGlassButton onClick={() => navigate("/home")}>Back to Home</GhostGlassButton></div>
        </div>
      </ScreenLayout>
    );
  }

  const { emergency, eta, hospital } = assignment;
  const action = nextAction[assignment.state] || nextAction[AssignmentState.RECEIVED];

  return (
    <ScreenLayout title="Assignment" back showNav={false}
      stickyAction={
        <Primary3DButton variant={action.variant} icon={Navigation} onClick={() => navigate(action.to)}>
          {action.label}
        </Primary3DButton>
      }
    >
      <GlassCard level="priority">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[15px] font-extrabold">{emergency.id}</p>
          <StatusBadge tone={emergency.priority === "CRITICAL" ? "emergency" : "warning"} dot>{emergency.priority}</StatusBadge>
        </div>
        <OperationalStatus state={assignment.state} large />
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-3">{emergency.summary}</p>
      </GlassCard>

      <MapPanel eta={eta} distance={eta.distanceMeters} destination={emergency.location} />

      <div className="grid grid-cols-2 gap-3">
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Distance</p>
          <p className="text-2xl font-extrabold tabular-nums">{(eta.distanceMeters / 1000).toFixed(1)}<span className="text-sm text-muted-foreground"> km</span></p>
        </GlassCard>
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">ETA</p>
          <p className="text-2xl font-extrabold tabular-nums">{eta.minutes}<span className="text-sm text-muted-foreground"> min</span></p>
        </GlassCard>
      </div>

      <GlassCard level="base" className="flex flex-col gap-3">
        <InfoRow icon={MapPin} label="Location" value={emergency.location.label} />
        {hospital && <InfoRow icon={Truck} label="Destination Hospital" value={hospital.name} tone="text-driver" />}
        <InfoRow icon={Clock} label="Dispatched" value={new Date(assignment.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} tone="text-warning" />
        <InfoRow icon={FileText} label="Evidence" value={emergency.evidenceAvailable ? "Available" : "None"} />
      </GlassCard>

      {emergency.instructions && (
        <GlassCard level="base">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">Instructions</p>
          <ul className="flex flex-col gap-2">
            {emergency.instructions.map((ins, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] font-medium">
                <span className="icon-3d w-6 h-6 shrink-0 text-primary text-[11px] font-bold">{i + 1}</span>
                {ins}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      <GlassCard level="base">
        <InfoRow icon={Radio} label="Dispatch Note" value={assignment.dispatchNote || "—"} tone="text-primary" />
      </GlassCard>
    </ScreenLayout>
  );
}