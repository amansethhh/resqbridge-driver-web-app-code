import React from "react";
import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";

// Premium 3D ambulance visual: ambient gradient orb + glass icon chip with
// layered drop shadow + soft ground reflection. Performant CSS only — no
// WebGL, no image asset. Works in light and dark mode via the token system.
export default function Ambulance3D({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center h-32 w-full rounded-2xl overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-driver/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative">
        <span className="icon-3d w-24 h-24 text-primary">
          <Truck className="w-12 h-12 drop-shadow-[0_8px_18px_rgba(0,71,171,0.45)]" strokeWidth={1.5} />
        </span>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full bg-primary/25 blur-md" />
    </div>
  );
}