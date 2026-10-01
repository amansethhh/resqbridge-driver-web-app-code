import React from "react";
import { cn } from "@/lib/utils";

export default function GlassPanel({ className, children, ...props }) {
  return (
    <div className={cn("glass-elevated rounded-[1.5rem] p-5", className)} {...props}>
      {children}
    </div>
  );
}