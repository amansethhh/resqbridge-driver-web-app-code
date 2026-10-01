import React from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Success3DButton({ children, className, loading, success, icon: Icon, ...props }) {
  return (
    <button className={cn("btn-3d btn-success-3d inline-flex items-center justify-center gap-2 w-full h-14 px-6 text-base", className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="w-5 h-5 spin-slow" /> : success ? <Check className="w-5 h-5" /> : Icon && <Icon className="w-5 h-5" />}
      <span>{success ? "Done" : children}</span>
    </button>
  );
}