import React from "react";
import { cn } from "@/lib/utils";

export default function GhostGlassButton({ children, className, icon: Icon, ...props }) {
  return (
    <button className={cn("btn-3d btn-ghost-glass inline-flex items-center justify-center gap-2 w-full h-12 px-5 text-[15px] font-semibold", className)} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
}