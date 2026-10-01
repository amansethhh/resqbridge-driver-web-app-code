import React from "react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import { AssignmentState } from "@/types/driver";

const config = {
  [AssignmentState.RECEIVED]: { label: "New Assignment", tone: "emergency", dot: "bg-emergency" },
  [AssignmentState.ACCEPTED]: { label: "Accepted", tone: "primary", dot: "bg-primary" },
  [AssignmentState.EN_ROUTE_TO_PATIENT]: { label: "En Route to Patient", tone: "primary", dot: "bg-primary" },
  [AssignmentState.AT_SCENE]: { label: "At Scene", tone: "warning", dot: "bg-warning" },
  [AssignmentState.PATIENT_PICKED_UP]: { label: "Patient Picked Up", tone: "primary", dot: "bg-primary" },
  [AssignmentState.EN_ROUTE_TO_HOSPITAL]: { label: "En Route to Hospital", tone: "primary", dot: "bg-primary" },
  [AssignmentState.AT_HOSPITAL]: { label: "At Hospital", tone: "warning", dot: "bg-warning" },
  [AssignmentState.HANDOVER]: { label: "Handover", tone: "primary", dot: "bg-primary" },
  [AssignmentState.COMPLETED]: { label: "Completed", tone: "driver", dot: "bg-driver" },
  [AssignmentState.CANCELLED]: { label: "Cancelled", tone: "neutral", dot: "bg-muted-foreground" },
  [AssignmentState.DECLINED]: { label: "Declined", tone: "neutral", dot: "bg-muted-foreground" },
  [AssignmentState.FAILED]: { label: "Failed", tone: "emergency", dot: "bg-emergency" },
};

export default function OperationalStatus({ state, className, large = false }) {
  const c = config[state] || { label: state, tone: "neutral", dot: "bg-muted-foreground" };
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("w-2.5 h-2.5 rounded-full", c.dot)} />
      <StatusBadge tone={c.tone} className={large ? "text-xs px-3 py-1.5" : ""}>{c.label}</StatusBadge>
    </div>
  );
}