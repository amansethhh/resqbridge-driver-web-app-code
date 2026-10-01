import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, AlertCircle } from "lucide-react";
import Logo from "@/components/shared/Logo";
import GlassCard from "@/components/glass/GlassCard";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";

export default function EmailOtp() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(45);
  const refs = useRef([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const setDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const onKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const onPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verify = () => {
    setError("");
    if (digits.some((d) => !d)) { setError("Enter all 6 digits."); return; }
    setLoading(true);
    // UI-only: future backend POST /api/v1/auth/verify-email
    setTimeout(() => { setLoading(false); navigate("/verification"); }, 900);
  };

  return (
    <div className="min-h-full flex flex-col px-5 py-8 safe-top safe-bottom">
      <div className="flex flex-col items-center text-center mb-6 fade-in">
        <Logo size={54} />
        <h1 className="text-2xl font-extrabold tracking-tight mt-3">Email Verification</h1>
        <p className="text-[13px] text-muted-foreground mt-1 inline-flex items-center gap-1.5"><Mail className="w-4 h-4" />Enter the code sent to your email</p>
      </div>

      <GlassCard level="elevated" className="mx-auto max-w-md w-full fade-in">
        <div className="flex justify-between gap-2 mb-5" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className="glass-input flex-1 min-w-0 h-14 text-center text-2xl font-extrabold tabular-nums"
            />
          ))}
        </div>

        {error && (
          <div className="glass-emergency rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-[13px] font-semibold text-emergency mb-3">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <Primary3DButton onClick={verify} loading={loading}>Verify</Primary3DButton>
        <div className="flex items-center justify-between mt-4 text-[12px] font-semibold">
          <span className="text-muted-foreground">{seconds > 0 ? `Resend in ${seconds}s` : "Didn't get it?"}</span>
          <button disabled={seconds > 0} onClick={() => setSeconds(45)} className="text-primary disabled:text-muted-foreground">Resend code</button>
        </div>
      </GlassCard>

      <div className="mt-5 mx-auto max-w-md w-full">
        <GhostGlassButton onClick={() => navigate("/login")}>Back to login</GhostGlassButton>
      </div>
    </div>
  );
}