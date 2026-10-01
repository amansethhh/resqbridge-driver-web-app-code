import React from "react";
import { cn } from "@/lib/utils";

// Global 3D icon system for the Driver App. Every operational icon routes
// through here so the whole app shares one glass-chip + accent language.
const sizes = {
  xs: "w-8 h-8",
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};
const iconStroke = { xs: "w-3.5 h-3.5", sm: "w-4 h-4", md: "w-5 h-5", lg: "w-7 h-7", xl: "w-10 h-10" };
const accents = {
  primary: "text-primary",
  driver: "text-driver",
  warning: "text-warning",
  emergency: "text-emergency",
  accent: "text-accent",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
};

export default function Driver3DIcon({ icon: Icon, size = "md", accent = "foreground", className, interactive = false, strokeWidth = 2 }) {
  return (
    <span
      className={cn(
        "icon-3d inline-flex items-center justify-center",
        sizes[size],
        accents[accent],
        interactive && "glass-interactive",
        className
      )}
    >
      {Icon && <Icon className={iconStroke[size]} strokeWidth={strokeWidth} />}
    </span>
  );
}