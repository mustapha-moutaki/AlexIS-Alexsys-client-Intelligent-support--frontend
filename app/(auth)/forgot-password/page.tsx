"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ShinyText from '../../../src/shared/components/ui/shineText';

// ─── Light Rays Canvas ───────────────────────────────────────────────────────

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
        const angle =
          ((i / count) - 0.5) * Math.PI * 0.85 + Math.PI / 2;
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

// ─── Typewriter ───────────────────────────────────────────────────────────────

const WORDS = [
  "we build the future",
  "we scale the vision",
  "we automate the work",
  "we ship the dream",
];

const Typewriter: React.FC = () => {
  const [text, setText] = useState("");
  const state = useRef({ wi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { wi, ci, deleting } = state.current;
      const word = WORDS[wi];

      if (!deleting) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 > word.length) {
          state.current.deleting = true;
          timeout = setTimeout(tick, 1800);
        } else {
          state.current.ci++;
          timeout = setTimeout(tick, 80);
        }
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 < 0) {
          state.current.deleting = false;
          state.current.wi = (wi + 1) % WORDS.length;
          state.current.ci = 0;
          timeout = setTimeout(tick, 80);
        } else {
          state.current.ci--;
          timeout = setTimeout(tick, 40);
        }
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      className="text-[11px] font-bold tracking-[0.3em] uppercase"
      style={{ color: "rgba(82,193,222,0.5)", fontFamily: "'Syne', sans-serif" }}
    >
      {text}
      <span className="animate-pulse">|</span>
    </span>
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
      <filter id="glow-reset">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Top chevron */}
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

    {/* Bottom chevron */}
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

    {/* Vertical bar */}
    <path
      d="M285.83 398.211L338.83 398.021L338 166L285 166.19L285.83 398.211Z"
      fill="#52C1DE"
      filter="url(#glow-reset)"
    >
      <animate
        attributeName="opacity"
        values="0;0;0.4;0.15;0.4;0.15;0.4;0;0"
        keyTimes="0;0.13;0.35;0.45;0.55;0.65;0.75;0.9;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>

    {/* Lightning bolt */}
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

// ─── Main Page ────────────────────────────────────────────────────────────────

type FormState = "idle" | "success";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || !email.includes("@")) {
        setError(true);
        inputRef.current?.focus();
        return;
      }
      setError(false);
      setFormState("success");
    },
    [email]
  );

  const handleBack = useCallback(() => {
    setFormState("idle");
    setEmail("");
    setError(false);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

     <main
  className="relative h-screen w-screen flex bg-black overflow-hidden"
>
  <div className="relative w-full flex overflow-hidden">

          {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
          <div className="relative w-1/2 flex flex-col items-center justify-center overflow-hidden bg-black px-10 py-12">
            <LightRaysCanvas />

            {/* Content above rays */}
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

              {/* Tagline badge */}
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
                  background:
                    "linear-gradient(to right, transparent, #52C1DE, transparent)",
                  opacity: 0.6,
                }}
              />

              {/* Description */}
              <p
                className="text-sm leading-relaxed max-w-[210px]"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Your intelligent platform for automation and scale. Account
                recovery is just one click away.
              </p>

              {/* Typewriter */}
              <Typewriter />
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────────────────────────────── */}
          <div
            className="w-1/2 flex flex-col items-center justify-center px-10 py-12 relative"
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

            {formState === "idle" ? (
              <div className="w-full flex flex-col gap-0">
                {/* Header */}
                <div className="mb-7">
                  <p
                    className="text-[11px] font-medium tracking-[0.22em] uppercase mb-2"
                    style={{ color: "#52C1DE" }}
                  >
                    Account Recovery
                  </p>
                  <h2
                    className="text-2xl font-extrabold text-white leading-tight mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Reset your password
                  </h2>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    Enter your email and we all send a secure link from{" "}
                    <span style={{ color: "#52C1DE" }} className="font-semibold">
                      AlexIS
                    </span>
                    .
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11.5px] font-medium mb-1.5 tracking-wide"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Email address
                    </label>
                    <input
                      ref={inputRef}
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(false);
                      }}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${
                          error
                            ? "rgba(220,70,70,0.6)"
                            : "rgba(82,193,222,0.15)"
                        }`,
                        boxShadow: error
                          ? "0 0 0 3px rgba(220,70,70,0.08)"
                          : undefined,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={(e) => {
                        if (!error) {
                          e.currentTarget.style.border =
                            "1px solid rgba(82,193,222,0.5)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(82,193,222,0.08)";
                        }
                      }}
                      onBlur={(e) => {
                        if (!error) {
                          e.currentTarget.style.border =
                            "1px solid rgba(82,193,222,0.15)";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    />
                    {error && (
                      <p
                        className="text-[11px] mt-1.5"
                        style={{ color: "rgba(220,70,70,0.8)" }}
                      >
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                    style={{
                      background: "#371450",
                      border: "1px solid rgba(82,193,222,0.25)",
                      fontFamily: "'Syne', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#4a1b6d")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#371450")
                    }
                  >
                    Send reset link
                  </button>
                </form>

                {/* Dots */}
                <div className="flex justify-center gap-1.5 mt-7">
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
              </div>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="w-full flex flex-col items-center text-center gap-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ border: "2px solid #52C1DE", color: "#52C1DE" }}
                >
                  ✓
                </div>
                <div>
                  <h2
                    className="text-xl font-extrabold text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Check your inbox
                  </h2>
                  <p
                    className="text-[13px] leading-relaxed max-w-[200px] mx-auto"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    We have sent a recovery link to{" "}
                    <span style={{ color: "#52C1DE" }}>{email}</span>. It
                    expires in 15 minutes.
                  </p>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-1.5 mt-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#52C1DE" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  />
                </div>
              </div>
            )}

            {/* Back to login */}
            <div className="absolute bottom-7 w-full flex justify-center">
              {formState === "success" ? (
                <button
                  onClick={handleBack}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#52C1DE")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  ← Try another email
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#52C1DE")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  ← Back to login
                </Link>
              )}
            </div>
          </div>
        </div>

      </main>
    </>
  );
}