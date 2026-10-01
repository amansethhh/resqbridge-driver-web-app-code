import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, WifiOff, Clock, Activity, Truck, Power } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useDriverState } from "@/lib/driverState";
import { DriverStatus } from "@/types/driver";
import { cn } from "@/lib/utils";

const options = [
  { status: DriverStatus.AVAILABLE, label: "Available", desc: "Receiving assignments", icon: Activity, tone: "driver" },
  { status: DriverStatus.UNAVAILABLE, label: "Unavailable", desc: "Not receiving assignments", icon: Power, tone: "neutral" },
  { status: DriverStatus.BUSY, label: "Busy", desc: "Temporarily unavailable", icon: Clock, tone: "warning" },
  { status: DriverStatus.OFFLINE, label: "Offline", desc: "Go offline completely", icon: WifiOff, tone: "neutral" },
];

export default function Availability() {
  const navigate = useNavigate();
  const { driver, setAvailability } = useDriverState();
  const [pending, setPending] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const select = (status) => {
    setPending(status);
    setConfirm(status);
  };

  const confirmChange = () => {
    setAvailability(pending);
    setConfirm(null);
    setTimeout(() => navigate("/home"), 300);
  };

  return (
    <ScreenLayout title="Availability" back showNav={false}>
      <GlassCard level="priority" className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Current Status</p>
        <p className="text-2xl font-extrabold tracking-tight mt-1">{driver.status.replace("_", " ")}</p>
        <p className="text-[13px] text-muted-foreground mt-1">Backend authorizes status changes.</p>
      </GlassCard>

      <div className="flex flex-col gap-3">
        {options.map((o) => {
          const active = driver.status === o.status;
          return (
            <GlassCard key={o.status} level={active ? "priority" : "interactive"} as="button" onClick={() => select(o.status)} className="block w-full text-left">
              <div className="flex items-center gap-3">
                <span className={cn("icon-3d w-12 h-12", o.tone === "driver" ? "text-driver" : o.tone === "warning" ? "text-warning" : "text-muted-foreground")}>
                  <o.icon className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <p className="text-[15px] font-extrabold">{o.label}</p>
                  <p className="text-[12px] text-muted-foreground">{o.desc}</p>
                </div>
                {active && <span className="icon-3d w-8 h-8 text-driver"><Check className="w-4 h-4" /></span>}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {confirm && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={() => setConfirm(null)} />
          <div className="relative w-full max-w-md glass-priority rounded-[1.5rem] p-5 scale-in">
            <h3 className="text-lg font-extrabold mb-2">Change availability?</h3>
            <p className="text-[14px] text-muted-foreground mb-4">Set status to <span className="font-bold text-foreground">{confirm.replace("_", " ")}</span>?</p>
            <div className="flex flex-col gap-2.5">
              <button onClick={confirmChange} className="btn-3d btn-primary-3d h-12 px-5 w-full">Confirm</button>
              <button onClick={() => setConfirm(null)} className="btn-3d btn-ghost-glass h-12 px-5 w-full">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </ScreenLayout>
  );
}