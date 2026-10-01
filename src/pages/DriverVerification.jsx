import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Clock, XCircle, FileText, Ban } from "lucide-react";
import Logo from "@/components/shared/Logo";
import GlassCard from "@/components/glass/GlassCard";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { VerificationStatus } from "@/types/driver";

const states = {
  [VerificationStatus.PENDING]: { icon: Clock, tone: "text-warning", title: "Verification Pending", desc: "Your driver authorization is under review. You'll be notified once approved.", action: "Continue to Home" },
  [VerificationStatus.APPROVED]: { icon: ShieldCheck, tone: "text-driver", title: "Verification Approved", desc: "You're authorized to operate. You can now go available for assignments.", action: "Go Available" },
  [VerificationStatus.REJECTED]: { icon: XCircle, tone: "text-emergency", title: "Verification Rejected", desc: "Your authorization was not approved. Contact dispatch support for details.", action: "Contact Support" },
  [VerificationStatus.DOCUMENT_REQUIRED]: { icon: FileText, tone: "text-warning", title: "Document Required", desc: "Additional documents are needed to complete your authorization.", action: "Upload Documents" },
  [VerificationStatus.SUSPENDED]: { icon: Ban, tone: "text-emergency", title: "Account Suspended", desc: "Your driver account is suspended. Contact dispatch support immediately.", action: "Contact Support" },
};

export default function DriverVerification() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(VerificationStatus.APPROVED);
  const s = states[status];

  return (
    <div className="min-h-full flex flex-col px-6 py-10 safe-top safe-bottom">
      <div className="flex flex-col items-center text-center mb-8 fade-in">
        <Logo size={56} />
        <h1 className="text-2xl font-extrabold tracking-tight mt-4">Driver Verification</h1>
      </div>

      <GlassCard level="elevated" className="mx-auto max-w-md w-full fade-in text-center">
        <span className={`icon-3d w-20 h-20 mx-auto ${s.tone}`}><s.icon className="w-10 h-10" /></span>
        <h2 className="text-xl font-extrabold tracking-tight mt-4">{s.title}</h2>
        <p className="text-[14px] text-muted-foreground leading-relaxed mt-2">{s.desc}</p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Primary3DButton variant={s.tone === "text-emergency" ? "danger" : "primary"} onClick={() => navigate("/home")}>{s.action}</Primary3DButton>
        </div>
      </GlassCard>

      <div className="mt-6 mx-auto max-w-md w-full">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground text-center mb-3">Preview other states</p>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.values(VerificationStatus).map((v) => (
            <button key={v} onClick={() => setStatus(v)} className="glass-interactive rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide">{v.replace("_", " ")}</button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 mx-auto max-w-md w-full">
        <GhostGlassButton onClick={() => navigate("/home")}>Skip for now</GhostGlassButton>
      </div>
    </div>
  );
}