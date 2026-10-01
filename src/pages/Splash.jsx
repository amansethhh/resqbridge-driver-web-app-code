import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { DRIVER_LOGO_URL } from "@/data/mock";

export default function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const to = setTimeout(() => navigate("/login"), 400);
      return () => clearTimeout(to);
    }
  }, [progress, navigate]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-driver/20 blur-3xl" />

      <div className="relative fade-in flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />
          <img src={DRIVER_LOGO_URL} alt="ResQBridge Driver" className="relative w-28 h-28 object-contain drop-shadow-[0_10px_30px_rgba(0,71,171,0.45)]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">ResQBridge</h1>
          <p className="text-[12px] font-bold uppercase tracking-[0.32em] text-driver mt-1">Driver</p>
        </div>
        <p className="text-[13px] text-muted-foreground max-w-[16rem] leading-relaxed">Operational emergency-response interface for authorized ambulance drivers.</p>

        <div className="w-44 h-1.5 rounded-full bg-foreground/10 overflow-hidden mt-2">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-driver transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[11px] font-semibold text-muted-foreground tabular-nums">{progress}% · restoring session</p>
      </div>
    </div>
  );
}