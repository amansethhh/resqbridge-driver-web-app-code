import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Danger3DButton({ children, className, loading, icon: Icon, ...props }) {
  return (
    <button className={cn("btn-3d btn-danger-3d inline-flex items-center justify-center gap-2 w-full h-14 px-6 text-base", className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="w-5 h-5 spin-slow" /> : Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
}