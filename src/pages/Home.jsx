import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Activity, MapPin, ChevronRight, Zap, ArrowRight } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import AmbulanceCard from "@/components/shared/AmbulanceCard";
import OperationalStatus from "@/components/shared/OperationalStatus";
import Secondary3DButton from "@/components/buttons/Secondary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { useDriverState } from "@/lib/driverState";
import { DriverStatus } from "@/types/driver";

const availabilityConfig = {
  [DriverStatus.AVAILABLE]: { tone: "driver", label: "Available", desc: "You're receiving assignments." },
  [DriverStatus.UNAVAILABLE]: { tone: "neutral", label: "Unavailable", desc: "Not receiving assignments." },
  [DriverStatus.BUSY]: { tone: "warning", label: "Busy", desc: "Temporarily unavailable." },
  [DriverStatus.ON_ASSIGNMENT]: { tone: "primary", label: "On Assignment", desc: "Active emergency in progress." },
  [DriverStatus.OFFLINE]: { tone: "neutral", label: "Offline", desc: "You're offline." },
};

export default function Home() {
  const navigate = useNavigate();
  const { driver, ambulance, assignment, summary, receiveAssignment } = useDriverState();
  const av = availabilityConfig[driver.status] || availabilityConfig[DriverStatus.OFFLINE];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <ScreenLayout title={driver.name}>
      {/* Date / shift */}
      <GlassCard level="base" className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="icon-3d w-10 h-10 text-primary"><Calendar className="w-5 h-5" /></span>
          <div>
            <p className="text-[13px] font-bold">{today}</p>
            <p className="text-[12px] text-muted-foreground">Day shift · 08:00–18:00</p>
          </div>
        </div>
        <StatusBadge tone="primary" dot>On Shift</StatusBadge>
      </GlassCard>

      {/* Availability */}
      <GlassCard level="interactive" as="button" onClick={() => navigate("/availability")} className="block w-full text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`icon-3d w-10 h-10 ${av.tone === "driver" ? "text-driver" : av.tone === "primary" ? "text-primary" : av.tone === "warning" ? "text-warning" : "text-muted-foreground"}`}>
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <p className="text-[15px] font-extrabold">{av.label}</p>
              <p className="text-[12px] text-muted-foreground">{av.desc}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </GlassCard>

      {/* Ambulance */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Ambulance</p>
        <AmbulanceCard ambulance={ambulance} onClick={() => navigate("/ambulance")} />
      </div>

      {/* Active assignment override */}
      {assignment && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Active Assignment</p>
          <GlassCard level="priority" as="button" onClick={() => navigate("/assignment")} className="block w-full text-left">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-extrabold">{assignment.emergency.id}</p>
              <OperationalStatus state={assignment.state} />
            </div>
            <p className="text-[13px] text-muted-foreground leading-snug line-clamp-2 mb-2">{assignment.emergency.summary}</p>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-primary">
              <MapPin className="w-3.5 h-3.5" />{assignment.emergency.location.label}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Today's summary */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Today's Operations</p>
        <GlassCard level="base">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-extrabold tabular-nums">{summary.assignments}</p>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Assignments</p>
            </div>
            <div className="border-x border-border">
              <p className="text-2xl font-extrabold tabular-nums text-driver">{summary.completed}</p>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold tabular-nums">{summary.avgResponseMin}<span className="text-sm text-muted-foreground">m</span></p>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Avg Response</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[12px] font-semibold text-muted-foreground">
            <span>{summary.distanceKm} km travelled</span>
            <span>{summary.cancelled} cancelled</span>
          </div>
        </GlassCard>
      </div>

      {/* Simulation control — visually secondary, inline so it never sits
          behind the bottom nav. Development-only frontend demonstration. */}
      {!assignment ? (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Development</p>
          <Secondary3DButton icon={Zap} onClick={() => { receiveAssignment(); navigate("/incoming"); }} className="w-full">
            Simulate Incoming Assignment
          </Secondary3DButton>
        </div>
      ) : (
        <GhostGlassButton icon={ArrowRight} onClick={() => navigate("/assignment")} className="w-full">
          Resume Active Assignment
        </GhostGlassButton>
      )}
    </ScreenLayout>
  );
}