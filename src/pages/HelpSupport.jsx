import React from "react";
import { useNavigate } from "react-router-dom";
import { Radio, LifeBuoy, MessageCircle, FileQuestion, AlertTriangle, ChevronRight } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";

const faqs = [
  { q: "How do I become available for assignments?", a: "Go to Availability and select Available. Dispatch will start sending assignments." },
  { q: "What if GPS isn't working?", a: "Check the GPS indicator in the header. If unavailable, follow the GPS state prompt." },
  { q: "How do I report a vehicle issue?", a: "Use the Vehicle Issue screen under Profile or from the ambulance details." },
  { q: "What happens if I lose connection?", a: "The app shows a reconnecting state. Information may be stale until reconnected." },
];

function Row({ icon: Icon, label, desc, to, tone }) {
  const navigate = useNavigate();
  return (
    <GlassCard level="interactive" as="button" onClick={() => to && navigate(to)} className="block w-full text-left">
      <div className="flex items-center gap-3">
        <span className={`icon-3d w-10 h-10 ${tone || "text-primary"}`}><Icon className="w-5 h-5" /></span>
        <div className="flex-1"><p className="text-[14px] font-bold">{label}</p><p className="text-[12px] text-muted-foreground">{desc}</p></div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </GlassCard>
  );
}

export default function HelpSupport() {
  const navigate = useNavigate();
  return (
    <ScreenLayout title="Help & Support" back>
      <GlassCard level="priority">
        <p className="text-[11px] font-bold uppercase tracking-wide text-emergency mb-1">Operational Emergency</p>
        <p className="text-[14px] font-semibold mb-3">For urgent operational communication, contact dispatch directly.</p>
        <Primary3DButton variant="danger" icon={Radio} onClick={() => navigate("/issue")}>Contact Dispatch</Primary3DButton>
      </GlassCard>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Technical Support</p>
        <div className="flex flex-col gap-3">
          <Row icon={LifeBuoy} label="Technical Support" desc="App and device issues" tone="text-warning" />
          <Row icon={MessageCircle} label="Contact Support" desc="Chat with our team" />
          <Row icon={AlertTriangle} label="Report an Issue" desc="Report a technical problem" to="/issue" tone="text-emergency" />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">FAQ</p>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <GlassCard key={i} level="base">
              <p className="text-[13px] font-bold flex items-start gap-2"><FileQuestion className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f.q}</p>
              <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{f.a}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}