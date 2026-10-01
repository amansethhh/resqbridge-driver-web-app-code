import React from "react";
import { AlertTriangle, MapPinOff, WifiOff, LogOut, ShieldAlert, HelpCircle } from "lucide-react";
import GlassModal from "@/components/glass/GlassModal";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import Secondary3DButton from "@/components/buttons/Secondary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";

// Reusable critical-state modal. tone: emergency | warning | neutral
export default function StateModal({ open, onClose, icon, tone = "warning", title, description, primaryLabel, onPrimary, secondaryLabel, onSecondary, ghostLabel, onGhost }) {
  const Icon = icon || AlertTriangle;
  const iconTone = tone === "emergency" ? "text-emergency" : tone === "warning" ? "text-warning" : "text-primary";
  return (
    <GlassModal open={open} onClose={onClose} tone={tone === "emergency" ? "emergency" : "priority"} title={title}
      footer={
        <>
          {primaryLabel && <Primary3DButton variant={tone === "emergency" ? "danger" : "primary"} onClick={onPrimary}>{primaryLabel}</Primary3DButton>}
          {secondaryLabel && <Secondary3DButton onClick={onSecondary}>{secondaryLabel}</Secondary3DButton>}
          {ghostLabel && <GhostGlassButton onClick={onGhost}>{ghostLabel}</GhostGlassButton>}
        </>
      }
    >
      <div className="flex flex-col items-center text-center gap-3">
        <span className={`icon-3d w-16 h-16 ${iconTone}`}><Icon className="w-8 h-8" /></span>
        <p className="text-muted-foreground text-[14px] leading-relaxed">{description}</p>
      </div>
    </GlassModal>
  );
}

export const stateIcons = { AlertTriangle, MapPinOff, WifiOff, LogOut, ShieldAlert, HelpCircle };