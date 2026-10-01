import React from "react";
import { cn } from "@/lib/utils";

const levels = {
  base: "glass-base",
  elevated: "glass-elevated",
  interactive: "glass-interactive",
  priority: "glass-priority",
  emergency: "glass-emergency",
};

export default function GlassCard({ level = "base", className, children, as: As = "div", ...props }) {
  return (
    <As className={cn("rounded-[1.25rem] p-4", levels[level], className)} {...props}>
      {children}
    </As>
  );
}