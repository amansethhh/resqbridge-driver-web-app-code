import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, ChevronRight, Settings, LifeBuoy, Lock, LogOut, IdCard } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useDriverState } from "@/lib/driverState";
import { useTheme } from "@/lib/theme";

function Row({ icon: Icon, label, value, to, tone }) {
  const navigate = useNavigate();
  return (
    <GlassCard level="interactive" as="button" onClick={() => to && navigate(to)} className="block w-full text-left">
      <div className="flex items-center gap-3">
        <span className={`icon-3d w-10 h-10 ${tone || "text-primary"}`}><Icon className="w-5 h-5" /></span>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold">{label}</p>
          {value && <p className="text-[12px] text-muted-foreground truncate">{value}</p>}
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </GlassCard>
  );
}

export default function DriverProfile() {
  const { driver, ambulance } = useDriverState();
  const { theme, toggle } = useTheme();

  return (
    <ScreenLayout title="Profile" back>
      <GlassCard level="priority" className="text-center">
        <div className="w-20 h-20 rounded-full mx-auto icon-3d flex items-center justify-center text-2xl font-extrabold text-primary">
          {driver.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <p className="text-lg font-extrabold tracking-tight mt-3">{driver.name}</p>
        <p className="text-[13px] text-muted-foreground font-semibold">{driver.driverId}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <StatusBadge tone="driver" dot>{driver.verification}</StatusBadge>
          <StatusBadge tone="primary">{driver.status.replace("_", " ")}</StatusBadge>
        </div>
      </GlassCard>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Operational</p>
        <div className="flex flex-col gap-3">
          <Row icon={Truck} label="Ambulance" value={`${ambulance.id} · ${ambulance.registration}`} to="/ambulance" tone="text-driver" />
          <Row icon={IdCard} label="License" value={driver.license} />
          <Row icon={ShieldCheck} label="Verification" value={driver.verification} to="/verification" tone="text-driver" />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Account</p>
        <div className="flex flex-col gap-3">
          <Row icon={Settings} label="Settings" to="/settings" />
          <Row icon={LifeBuoy} label="Help & Support" to="/help" tone="text-warning" />
          <Row icon={Lock} label="Security" to="/security" />
          <GlassCard level="interactive" as="button" onClick={toggle} className="block w-full text-left">
            <div className="flex items-center gap-3">
              <span className="icon-3d w-10 h-10 text-primary"><Settings className="w-5 h-5" /></span>
              <div className="flex-1">
                <p className="text-[14px] font-bold">Appearance</p>
                <p className="text-[12px] text-muted-foreground">{theme === "dark" ? "Dark mode" : "Light mode"}</p>
              </div>
              <StatusBadge tone={theme === "dark" ? "navy" : "neutral"}>{theme}</StatusBadge>
            </div>
          </GlassCard>
        </div>
      </div>

      <button onClick={() => (window.location.href = "/login")} className="btn-3d btn-danger-3d h-12 px-5 w-full inline-flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" />Sign Out
      </button>
    </ScreenLayout>
  );
}