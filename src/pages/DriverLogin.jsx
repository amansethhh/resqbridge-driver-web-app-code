import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Logo from "@/components/shared/Logo";
import GlassInput from "@/components/glass/GlassInput";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";

export default function DriverLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Enter your email and password."); return; }
    setLoading(true);
    // UI-only: future backend POST /api/v1/auth/login
    setTimeout(() => {
      setLoading(false);
      navigate("/otp");
    }, 900);
  };

  return (
    <div className="min-h-full flex flex-col px-5 py-8 safe-top safe-bottom">
      <div className="flex flex-col items-center text-center mb-6 fade-in">
        <Logo size={60} />
        <h1 className="text-2xl font-extrabold tracking-tight mt-3">Driver Login</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Authorized ambulance personnel only.</p>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-md w-full flex flex-col gap-3.5 fade-in">
        <div>
          <label className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-1.5 block">Email</label>
          <GlassInput type="email" icon={Mail} placeholder="driver@resqbridge.io" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div>
          <label className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-1.5 block">Password</label>
          <div className="relative">
            <GlassInput type={show ? "text" : "password"} icon={Lock} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Toggle password">
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="glass-emergency rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-[13px] font-semibold text-emergency">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <Primary3DButton type="submit" loading={loading} className="mt-1">Sign In</Primary3DButton>
        <GhostGlassButton type="button" onClick={() => navigate("/verification")}>Forgot Password</GhostGlassButton>
      </form>

      <div className="mt-auto pt-6 text-center">
        <p className="text-[12px] text-muted-foreground">No driver account? <button onClick={() => navigate("/profile-setup")} className="font-bold text-primary">Register</button></p>
      </div>
    </div>
  );
}