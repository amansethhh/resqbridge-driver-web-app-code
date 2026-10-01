import React from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Bell, Globe, Lock, User, Languages, Palette, ChevronRight, ShieldAlert } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function Row({ icon: Icon, label, value, onClick, tone }) {
  return (
    <GlassCard level="interactive" as="button" onClick={onClick} className="block w-full text-left">
      <div className="flex items-center gap-3">
        <span className={cn("icon-3d w-10 h-10", tone || "text-primary")}><Icon className="w-5 h-5" /></span>
        <div className="flex-1"><p className="text-[14px] font-bold">{label}</p>{value && <p className="text-[12px] text-muted-foreground">{value}</p>}</div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </GlassCard>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  return (
    <ScreenLayout title="Settings" back>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Appearance</p>
        <GlassCard level="base">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="icon-3d w-10 h-10 text-primary"><Palette className="w-5 h-5" /></span>
              <div><p className="text-[14px] font-bold">Theme</p><p className="text-[12px] text-muted-foreground">Default: Light</p></div>
            </div>
            <StatusBadge tone={theme === "dark" ? "navy" : "neutral"}>{theme}</StatusBadge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => theme !== "light" && toggle()} className={cn("glass-interactive rounded-xl py-3 flex flex-col items-center gap-1", theme === "light" && "ring-2 ring-primary")}>
              <Sun className="w-5 h-5 text-warning" /><span className="text-[12px] font-bold">Light</span>
            </button>
            <button onClick={() => theme !== "dark" && toggle()} className={cn("glass-interactive rounded-xl py-3 flex flex-col items-center gap-1", theme === "dark" && "ring-2 ring-primary")}>
              <Moon className="w-5 h-5 text-primary" /><span className="text-[12px] font-bold">Dark</span>
            </button>
          </div>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Preferences</p>
        <div className="flex flex-col gap-3">
          <Row icon={Bell} label="Notifications" value="Assignment, dispatch, hospital" />
          <Row icon={Languages} label="Language" value="English" tone="text-driver" />
          <Row icon={Globe} label="Privacy" />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Account</p>
        <div className="flex flex-col gap-3">
          <Row icon={User} label="Account" to="/profile" />
          <Row icon={Lock} label="Security" to="/security" />
          <Row icon={ShieldAlert} label="Critical States Preview" to="/states" tone="text-warning" />
        </div>
      </div>
    </ScreenLayout>
  );
}