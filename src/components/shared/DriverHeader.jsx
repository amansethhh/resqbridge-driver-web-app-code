import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronLeft } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ConnectionIndicator from "@/components/shared/ConnectionIndicator";
import GPSIndicator from "@/components/shared/GPSIndicator";
import StatusBadge from "@/components/shared/StatusBadge";
import Icon3DButton from "@/components/buttons/Icon3DButton";
import { useDriverState } from "@/lib/driverState";
import { DriverStatus } from "@/types/driver";

const statusTone = {
  [DriverStatus.AVAILABLE]: "driver",
  [DriverStatus.ON_ASSIGNMENT]: "primary",
  [DriverStatus.BUSY]: "warning",
  [DriverStatus.UNAVAILABLE]: "neutral",
  [DriverStatus.OFFLINE]: "neutral",
  [DriverStatus.SUSPENDED]: "emergency",
};

// Complete header card: every element (logo, name, id, status, notifications,
// online + GPS) sits inside one elevated glass surface — nothing floats outside.
export default function DriverHeader({ title, showLogo = true, back = false }) {
  const navigate = useNavigate();
  const { driver, connection, gps, notifications } = useDriverState();
  const unread = notifications.filter((n) => !n.read).length;
  const tone = statusTone[driver.status] || "neutral";

  return (
    <header className="sticky top-0 z-30 safe-top">
      <div className="glass-elevated rounded-b-[1.25rem] px-4 pt-3 pb-3">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {back && (
              <button onClick={() => navigate(-1)} className="icon-3d w-9 h-9 shrink-0 text-foreground" aria-label="Back">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {showLogo && <Logo size={34} />}
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold leading-tight">{title || driver.name}</p>
              <p className="truncate text-[11px] font-semibold text-muted-foreground">{driver.driverId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge tone={tone} dot>{driver.status.replace("_", " ")}</StatusBadge>
            <Icon3DButton icon={Bell} label="Alerts" onClick={() => navigate("/alerts")} className="relative">
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>
              )}
            </Icon3DButton>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <ConnectionIndicator state={connection} />
          <GPSIndicator state={gps} />
        </div>
      </div>
    </header>
  );
}