import React from "react";
import { DRIVER_LOGO_URL } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function Logo({ size = 48, className, withWordmark = false }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={DRIVER_LOGO_URL}
        alt="ResQBridge Driver"
        style={{ width: size, height: size }}
        className="object-contain drop-shadow-[0_6px_18px_rgba(0,71,171,0.35)]"
      />
      {withWordmark && (
        <div className="leading-tight">
          <p className="text-[15px] font-extrabold tracking-tight">ResQBridge</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-driver">Driver</p>
        </div>
      )}
    </div>
  );
}