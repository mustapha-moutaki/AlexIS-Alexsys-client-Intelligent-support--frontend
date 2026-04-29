"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import ShinyText from "../../../shared/components/ui/shineText";

// ─── Light Rays Canvas (reused from ResetPasswordPage) ───────────────────────

const LightRaysCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let W = 0;
    let H = 0;
    let rafId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    };

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5;
      const cy = -H * 0.1;
      const count = 18;

      for (let i = 0; i < count; i++) {
        const angle = ((i / count) - 0.5) * Math.PI * 0.85 + Math.PI / 2;
        const flicker =
          0.35 +
          0.35 * Math.sin(t * 0.7 + i * 1.3) +
          0.15 * Math.sin(t * 1.4 + i * 0.7);
        const len = H * (1.5 + 0.3 * Math.sin(t * 0.5 + i * 0.8));
        const ex = cx + Math.cos(angle) * len;
        const ey = cy + Math.sin(angle) * len;

        const grad = ctx.createLinearGradient(cx, cy, ex, ey);
        grad.addColorStop(0, `rgba(82,193,222,${flicker * 0.55})`);
        grad.addColorStop(0.45, `rgba(82,193,222,${flicker * 0.12})`);
        grad.addColorStop(1, `rgba(82,193,222,0)`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + flicker * 2.5;
        ctx.stroke();
      }

      t += 0.016;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ─── AlexIS Logo SVG ──────────────────────────────────────────────────────────

const AlexISLogo: React.FC = () => (
  <svg
    viewBox="0 0 624 565"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <filter id="glow-login">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M514 261L623.5 261L471.5 0L150 1L0 262.5L102.5 262L223.5 89L424.5 89L514 261Z"
      fill="#52C1DE"
    >
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0;0.14;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M612.5 305L611 308L471.5 564.5L156 564.5L2.5 308L94 308L99.5 308L223.5 483L420 482L518 305L612.5 305Z"
      fill="#371450"
    >
      <animate
        attributeName="opacity"
        values="0;0.03;1;1;0;0"
        keyTimes="0;0.03;0.17;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M285.83 398.211L338.83 398.021L338 166L285 166.19L285.83 398.211Z"
      fill="#52C1DE"
      filter="url(#glow-login)"
    >
      <animate
        attributeName="opacity"
        values="0;0;0.4;0.15;0.4;0.15;0.4;0;0"
        keyTimes="0;0.13;0.35;0.45;0.55;0.65;0.75;0.9;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M215.51 298.034L320.118 315.47L206 398L417 297.453L311.203 280.598L416.406 194L413.434 195.743L215.51 298.034Z"
      fill="#ffffff"
    >
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.16;0.2;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

// ─── LoginForm ─────────────────────────────────────────────────────────────────

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  error,
}: {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.13s; }
        .fade-up-3 { animation-delay: 0.21s; }
        .fade-up-4 { animation-delay: 0.29s; }
        .fade-up-5 { animation-delay: 0.37s; }
      `}</style>

     <main
  className="relative h-screen w-screen flex bg-black overflow-hidden"
>
  <div className="relative w-full flex overflow-hidden">

          {/* ── LEFT PANEL ── */}
          <div className="relative hidden sm:flex w-[45%] flex-col items-center justify-center overflow-hidden bg-black px-10 py-12">
            <LightRaysCanvas />

            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
              {/* Logo */}
              <div
                className="w-28 h-28"
                style={{ filter: "drop-shadow(0 0 24px rgba(82,193,222,0.45))" }}
              >
                <AlexISLogo />
              </div>

              {/* Brand name */}
              <h1
                className="text-3xl font-extrabold text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Alex<span style={{ color: "#52C1DE" }}>IS</span>
              </h1>

              {/* Tagline */}
              <span>
                <ShinyText
                  text="✨ We Build and U Shine ✨"
                  speed={2}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </span>

              {/* Divider */}
              <div
                className="w-12 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #52C1DE, transparent)",
                  opacity: 0.6,
                }}
              />

              {/* Description */}
              <p
                className="text-sm leading-relaxed max-w-[210px]"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Your intelligent platform for automation and scale. Sign in to
                access your workspace.
              </p>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div
            className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 relative"
            style={{
              background: "#0a0a0f",
              borderLeft: "1px solid rgba(82,193,222,0.12)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(82,193,222,0.25), transparent)",
              }}
            />

            {/* Mobile-only logo */}
            <div className="flex sm:hidden flex-col items-center gap-2 mb-8">
              <div className="w-16 h-16" style={{ filter: "drop-shadow(0 0 16px rgba(82,193,222,0.4))" }}>
                <AlexISLogo />
              </div>
              <h1
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Alex<span style={{ color: "#52C1DE" }}>IS</span>
              </h1>
            </div>

            <form
              onSubmit={onSubmit}
              className="w-full max-w-[340px] flex flex-col gap-0"
            >
              {/* Header */}
              <div className="mb-7 fade-up fade-up-1">
                <p
                  className="text-[11px] font-medium tracking-[0.22em] uppercase mb-2"
                  style={{ color: "#52C1DE" }}
                >
                  Welcome Back
                </p>
                <h2
                  className="text-2xl font-extrabold text-white leading-tight mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Sign in to AlexIS
                </h2>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Enter your credentials to access your{" "}
                  <span style={{ color: "#52C1DE" }} className="font-semibold">
                    workspace
                  </span>
                  .
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="mb-4 px-4 py-2.5 rounded-xl text-[12px] fade-up"
                  style={{
                    background: "rgba(220,70,70,0.08)",
                    border: "1px solid rgba(220,70,70,0.3)",
                    color: "rgba(220,120,120,0.95)",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Fields */}
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="fade-up fade-up-2">
                  <label
                    htmlFor="email"
                    className="block text-[11.5px] font-medium mb-1.5 tracking-wide"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(82,193,222,0.15)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(82,193,222,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(82,193,222,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(82,193,222,0.15)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Password */}
                <div className="fade-up fade-up-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-[11.5px] font-medium tracking-wide"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Password
                    </label>
                    <Link
                      href="/reset-password"
                      className="text-[11px] font-medium transition-colors"
                      style={{ color: "rgba(82,193,222,0.6)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#52C1DE")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(82,193,222,0.6)")
                      }
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(82,193,222,0.15)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(82,193,222,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(82,193,222,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(82,193,222,0.15)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="fade-up fade-up-4 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] mt-1"
                  style={{
                    background: loading ? "#2a1040" : "#371450",
                    border: "1px solid rgba(82,193,222,0.25)",
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.05em",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "#4a1b6d";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.background = "#371450";
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#52C1DE"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="#52C1DE"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Signing in…
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 mt-7 fade-up fade-up-5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#52C1DE" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}