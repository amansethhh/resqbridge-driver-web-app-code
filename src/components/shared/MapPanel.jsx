import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

// Reusable map panel. Architected for future real map integration:
// props currentLocation, destination, route, eta, distance, markers.
// During UI development it renders a stylized map surface.
export default function MapPanel({ currentLocation, destination, route, eta, distance, markers, className, height = "h-52" }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.25rem] glass-base", height, className)}>
      {/* stylized map backdrop */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(199_95%_48%_/_0.12),transparent_60%)]" />
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M34 0H0V34" fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* route line */}
          <path d="M20 210 C 80 150, 120 160, 180 110 S 300 60, 360 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
          <path d="M20 210 C 80 150, 120 160, 180 110 S 300 60, 360 30" fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>

      {/* current location marker */}
      <div className="absolute left-5 bottom-8">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary/30 pulse-ring" />
          <span className="relative block w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
        </div>
      </div>

      {/* destination marker */}
      <div className="absolute right-6 top-7">
        <div className="icon-3d w-9 h-9 text-emergency">
          <MapPin className="w-5 h-5" />
        </div>
      </div>

      {/* overlay info */}
      <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between gap-2">
        <div className="glass-base rounded-full px-3 py-1.5 flex items-center gap-1.5 text-[12px] font-bold">
          <Navigation className="w-3.5 h-3.5 text-primary" />
          {eta ? `${eta.minutes} min` : "—"}
          <span className="text-muted-foreground font-medium">·</span>
          {distance ? `${(distance / 1000).toFixed(1)} km` : "—"}
        </div>
        <div className="glass-base rounded-full px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
          Live map preview
        </div>
      </div>
    </div>
  );
}