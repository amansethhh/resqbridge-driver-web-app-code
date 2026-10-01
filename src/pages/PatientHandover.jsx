import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, User, Image, Sparkles, ClipboardList, Truck, CheckCircle2 } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import Timeline from "@/components/shared/Timeline";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";
import { mockTimeline } from "@/data/mock";
import { AssignmentState } from "@/types/driver";

function Section({ icon: Icon, title, children, tone }) {
  return (
    <GlassCard level="base">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2 inline-flex items-center gap-1.5">
        <Icon className={`w-3.5 h-3.5 ${tone || "text-primary"}`} />{title}
      </p>
      <div className="text-[13px] leading-relaxed">{children}</div>
    </GlassCard>
  );
}

export default function PatientHandover() {
  const navigate = useNavigate();
  const { assignment, advanceAssignment } = useDriverState();
  const [notes, setNotes] = useState("");
  const [confirm, setConfirm] = useState(false);
  if (!assignment) return null;

  const confirmHandover = () => {
    advanceAssignment(AssignmentState.COMPLETED, { completedAt: new Date().toISOString() });
    setConfirm(false);
    navigate("/completed");
  };

  return (
    <ScreenLayout title="Patient Handover" back showNav={false}
      stickyAction={<Primary3DButton variant="success" icon={CheckCircle2} onClick={() => setConfirm(true)}>Confirm Handover</Primary3DButton>}
    >
      <GlassCard level="priority">
        <OperationalStatus state={assignment.state} large />
        <p className="text-[14px] font-semibold mt-2">{assignment.emergency.id} · {assignment.hospital?.name}</p>
      </GlassCard>

      <Section icon={FileText} title="Emergency Summary">
        <p>{assignment.emergency.summary}</p>
      </Section>

      <Section icon={User} title="Patient Information" tone="text-driver">
        <p>Adult male · conscious, responsive</p>
        <p className="text-muted-foreground text-[12px] mt-1">Authorized information only — not a full EMR.</p>
      </Section>

      <Section icon={Image} title="Evidence" tone="text-warning">
        <p>{assignment.emergency.evidenceAvailable ? "Photo and audio evidence available from citizen report." : "No evidence submitted."}</p>
      </Section>

      <Section icon={Sparkles} title="AI-Assisted Summary" tone="text-primary">
        <p>Patient reports chest pain onset ~20 min ago, radiating to left arm. Vitals stable on arrival. Recommend immediate triage at trauma bay.</p>
        <p className="text-muted-foreground text-[11px] mt-1">AI summary — verify with clinical staff.</p>
      </Section>

      <Section icon={ClipboardList} title="Transport Timeline">
        <Timeline events={mockTimeline} />
      </Section>

      <Section icon={Truck} title="Hospital" tone="text-driver">
        <p>{assignment.hospital?.name}</p>
        <p className="text-muted-foreground text-[12px]">{assignment.hospital?.location.label}</p>
      </Section>

      <GlassCard level="base">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">Driver Notes</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add handover notes for clinical staff..."
          className="glass-input w-full min-h-24 p-3 text-[14px] font-medium resize-none"
        />
      </GlassCard>

      {confirm && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={() => setConfirm(false)} />
          <div className="relative w-full max-w-md glass-priority rounded-[1.5rem] p-5 scale-in">
            <h3 className="text-lg font-extrabold mb-2">Confirm handover?</h3>
            <p className="text-[14px] text-muted-foreground mb-3">Please verify the key information before confirming.</p>
            <div className="glass-base rounded-xl p-3 mb-4 text-[13px] font-semibold space-y-1">
              <p>Emergency: {assignment.emergency.id}</p>
              <p>Hospital: {assignment.hospital?.name}</p>
              <p>Patient: Adult male, conscious</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <Primary3DButton variant="success" onClick={confirmHandover}>Confirm Handover</Primary3DButton>
              <GhostGlassButton onClick={() => setConfirm(false)}>Cancel</GhostGlassButton>
            </div>
          </div>
        </div>
      )}
    </ScreenLayout>
  );
}