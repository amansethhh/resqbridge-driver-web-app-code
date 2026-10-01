import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, KeyRound, Smartphone, LogOut, ShieldCheck, Clock } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import StatusBadge from "@/components/shared/StatusBadge";

export default function DriverSecurity() {
  const navigate = useNavigate();
  return (
    <ScreenLayout title="Security" back showNav={false}>
      <GlassCard level="priority">
        <div className="flex items-center gap-3">
          <span className="icon-3d w-12 h-12 text-driver"><ShieldCheck className="w-6 h-6" /></span>
          <div>
            <p className="text-[15px] font-extrabold">Account Secured</p>
            <p className="text-[12px] text-muted-foreground">Your account is protected.</p>
          </div>
        </div>
      </GlassCard>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Password</p>
        <GlassCard level="base" className="flex flex-col gap-3">
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-1.5 block">Current Password</label>
            <GlassInput type="password" icon={Lock} placeholder="••••••••" />
          </div>
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-1.5 block">New Password</label>
            <GlassInput type="password" icon={KeyRound} placeholder="••••••••" />
          </div>
          <Primary3DButton>Update Password</Primary3DButton>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Active Session</p>
        <GlassCard level="base" className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="icon-3d w-10 h-10 text-primary"><Smartphone className="w-5 h-5" /></span>
            <div className="flex-1">
              <p className="text-[14px] font-bold">This device</p>
              <p className="text-[12px] text-muted-foreground">ResQBridge Driver · Web</p>
            </div>
            <StatusBadge tone="driver" dot>Active</StatusBadge>
          </div>
          <div className="flex items-center gap-3">
            <span className="icon-3d w-10 h-10 text-warning"><Clock className="w-5 h-5" /></span>
            <div className="flex-1">
              <p className="text-[14px] font-bold">Last sign-in</p>
              <p className="text-[12px] text-muted-foreground">Today, 08:12</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <button onClick={() => (window.location.href = "/login")} className="btn-3d btn-danger-3d h-14 px-6 w-full inline-flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" />Sign Out
      </button>

      <GhostGlassButton onClick={() => navigate("/profile")}>Back to Profile</GhostGlassButton>
    </ScreenLayout>
  );
}