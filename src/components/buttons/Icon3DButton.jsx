import React from "react";
import { cn } from "@/lib/utils";

export default function Icon3DButton({ icon: Icon, onClick, label, className, tone, ...props }) {
  const toneRing = tone === "emergency" ? "text-emergency" : tone === "driver" ? "text-driver" : tone === "primary" ? "text-primary" : "text-foreground";
  return (
    <button onClick={onClick} aria-label={label} className={cn("icon-3d w-11 h-11", toneRing, className)} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
}