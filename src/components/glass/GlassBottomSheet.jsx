import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export default function GlassBottomSheet({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass-elevated rounded-t-[1.75rem] rounded-b-none p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sheet-up safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-foreground/20" />
        {title && <h3 className="text-lg font-extrabold tracking-tight mb-3">{title}</h3>}
        <div className="text-[15px] leading-relaxed">{children}</div>
        {footer && <div className="mt-5 flex flex-col gap-2.5">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}