import React from "react";
import { cn } from "@/lib/utils";

const tones = {
  driver: "bg-driver/12 text-driver border-driver/25",
  primary: "bg-primary/12 text-primary border-primary/25",
  warning: "bg-warning/15 text-warning border-warning/30",
  emergency: "bg-emergency/12 text-emergency border-emergency/30",
  neutral: "bg-muted text-muted-foreground border-border",
  navy: "bg-navy/8 text-navy border-navy/20 dark:text-foreground dark:bg-white/10 dark:border-white/15",
};

export default function StatusBadge({ tone = "neutral", children, className, dot = false }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide", tones[tone], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}