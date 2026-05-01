"use client";
import React from "react";
import FloatingLines from "@/components/BackgroundAnimatedHome";
import MagicBento from '@/components/MagicBento'
import SupportAvatar from "@/components/SupportAvatar";
// ---------------------------
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  {
    src: "/assets/images/companiesImages/Fortinet-Logo.wine_.png",
    alt: "Company 1"
  },
  {
    src: "/assets/images/companiesImages/Microsoft_logo_2012.svg",
    alt: "Company 2",
    href: "https://company2.com"
  },
  {
    src: "/assets/images/companiesImages/Teltonika-logotipas-1024x201.png",
    alt: "Company 3",
    href: "https://company3.com"
  },
  {
    src: "/assets/images/companiesImages/zebra-technologies-logo.svg",
    alt: "Company 4",
    href: "https://company4.com"
  },
];
// -----------------------


// ─── ANIMATED LOGO COMPONENT ───
const AnimatedLogo = () => (
  <svg
    width="32"
    height="30"
    viewBox="0 0 624 565"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
  >
    <defs>
      <filter id="lglow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Top hex */}
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
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,-40;0,-40;0,0;0,0;0,-40;0,-40"
        keyTimes="0;0;0.14;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0 0 0 0;0.22 1 0.36 1;0 0 0 0;0.5 0 1 0.5;0 0 0 0"
      />
    </path>

    {/* Bottom hex */}
    <path
      d="M612.5 305L471.5 564.5L156 564.5L2.5 308L94 308L223.5 483L420 482L518 305L612.5 305Z"
      fill="#371450"
    >
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.03;0.17;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,40;0,40;0,0;0,0;0,40;0,40"
        keyTimes="0;0.03;0.17;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0 0 0 0;0.22 1 0.36 1;0 0 0 0;0.5 0 1 0.5;0 0 0 0"
      />
    </path>

    {/* Glow pulse behind bolt */}
    <path
      d="M285.83 398.211L338.83 398.021L338 166L285 166.19L285.83 398.211Z"
      fill="#52C1DE"
      filter="url(#lglow)"
    >
      <animate
        attributeName="opacity"
        values="0;0;0;0.4;0.15;0.4;0.15;0.4;0;0"
        keyTimes="0;0.13;0.28;0.35;0.45;0.55;0.65;0.75;0.9;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>

    <path
      d="M285.83 398.211L338.83 398.021L338 166L285 166.19L285.83 398.211Z"
      fill="#52C1DE"
    >
      <animate
        attributeName="opacity"
        values="0;0;0;1;1;0;0"
        keyTimes="0;0;0.13;0.16;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>

    <path
      d="M215.51 298.034L320.118 315.47L206 398L417 297.453L311.203 280.598L416.406 194L213.434 195.743L215.51 298.034Z"
      fill="white"
    >
      <animate
        attributeName="opacity"
        values="0;0;0;1;1;0;0"
        keyTimes="0;0;0.16;0.2;0.9;0.95;1"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default function Home() {
  return (
    <div className="bg-[#1e0a2e] text-white overflow-x-hidden font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .glass {
          background: rgba(55, 20, 80, 0.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(82,193,222,0.18);
        }

        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          border-radius: inherit;
        }

        .shimmer {
          background: linear-gradient(90deg, #52C1DE 0%, #fff 50%, #52C1DE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerMove 3s linear infinite;
        }
        @keyframes shimmerMove { to { background-position: -200% center; } }

        .card-hover { transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s; }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(82,193,222,0.15);
        }

        .diagonal-divider {
          clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl glass animate-in fade-in zoom-in duration-500">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <AnimatedLogo />
          <span className="text-white text-[17px] font-display font-bold tracking-tight">Alex<span className="text-[#52C1DE]">IS</span></span>
        </a>

        <div className="hidden md:flex items-center gap-7 font-display">
          {["Home", "Features", "Pricing", "Solutions", "About"].map((item) => (
            <a key={item} href="#" className="text-white/55 text-[13px] hover:text-[#52C1DE] transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-2 font-display">
          <button className="px-4 py-2 text-[13px] font-medium text-white border border-white/20 rounded-lg hover:border-[#52C1DE]/50 transition-colors hidden sm:block">
            Request a Demo
          </button>
          <button className="px-4 py-2 text-[13px] font-semibold bg-[#52C1DE] text-[#1e0a2e] rounded-lg hover:bg-[#7ed4e8] transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION WITH INTERACTIVE LINES ─── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden noise">
        
        {/* Animated Background Component */}
        <div className="absolute inset-0 z-0">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={12}
            lineDistance={10}
            bendRadius={10}
            bendStrength={-3}
            interactive
            parallax={true}
            animationSpeed={0.8}
            linesGradient={["#52C1DE", "#371450", "#1e0a2e"]}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full glass text-[12px] animate-in slide-in-from-bottom-4 duration-700">
            <span className="px-2 py-0.5 rounded-full bg-[#52C1DE]/20 text-[#52C1DE] font-semibold tracking-wide text-[10px] uppercase">New</span>
            <span className="text-white/60">Introducing AI-powered ticket routing</span>
          </div>

          <h1 className="font-display text-[52px] md:text-[72px] font-extrabold leading-[1.05] tracking-[-2px] mb-6 max-w-4xl animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Resolve Faster.<br />
            <span className="text-[#52C1DE]">Support Smarter.</span>
          </h1>

          <p className="text-white/55 text-[16px] md:text-[19px] max-w-xl leading-relaxed mb-10 font-body font-light animate-in slide-in-from-bottom-8 duration-700 delay-200">
            Empowering support teams with intelligent tools to deliver exceptional client experiences — every ticket, every time.
          </p>

          <div className="flex gap-3 flex-wrap justify-center pointer-events-auto">
            <button className="px-8 py-4 bg-[#52C1DE] text-[#1e0a2e] font-display font-bold text-[15px] rounded-xl hover:bg-[#7ed4e8] transition-all hover:scale-105 active:scale-95">
              Get a Free Consultation
            </button>
            <button className="px-8 py-4 border border-white/20 text-white/80 font-display font-medium text-[15px] rounded-xl hover:border-[#52C1DE]/50 hover:text-white transition-all">
              See Our Work
            </button>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="relative z-10 px-6 -mt-10 mb-20">
        <div className="max-w-4xl mx-auto glass rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col">
            <div className="flex gap-0.5 text-[#52C1DE] text-xs mb-1">★★★★★</div>
            <span className="font-display font-bold text-2xl shimmer">1,200+</span>
            <span className="text-white/40 text-[11px] font-display tracking-wider uppercase">Active Users</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          {["Trustpilot", "Capterra", "G2", "ProductHunt"].map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-white/40 text-[13px] font-display font-semibold">
              <div className="w-5 h-5 rounded bg-white/10" />
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#52C1DE] text-[12px] font-semibold tracking-[3px] uppercase mb-3 font-display">Capabilities</p>
          <h2 className="font-display text-[36px] md:text-[48px] font-bold tracking-tight">Everything for your <span className="text-[#52C1DE]">Support Team.</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-body">
          {[
            { title: "AI Ticket Routing", desc: "Automatically classify and route tickets to the right agent with zero manual effort.", icon: "M8 12h8M12 8v8" },
            { title: "Real-Time Dashboard", desc: "Live metrics, agent performance, and SLA tracking — all in one place.", icon: "M12 8v4l3 3" },
            { title: "Omnichannel Inbox", desc: "Unify email, chat, and social support channels into a single streamlined inbox.", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
            { title: "Client Portal", desc: "Give clients visibility into ticket status and history — branded and secure.", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" },
            { title: "SLA Management", desc: "Define, track, and enforce service level agreements with automated escalations.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
            { title: "Compliance", desc: "Enterprise-grade encryption, GDPR-ready, and role-based access control.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
          ].map((feat, i) => (
            <div key={i} className="card-hover glass rounded-2xl p-8 relative overflow-hidden noise group">
              <div className="w-12 h-12 rounded-xl bg-[#52C1DE]/10 flex items-center justify-center mb-6 group-hover:bg-[#52C1DE]/20 transition-colors">
                <svg className="text-[#52C1DE]" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                   <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                </svg>
              </div>
              <h3 className="font-display font-bold text-[18px] mb-3">{feat.title}</h3>
              <p className="text-white/50 text-[14px] leading-relaxed font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

<SupportAvatar />


      {/* ─── CTA BANNER ─── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-3xl p-16 text-center relative overflow-hidden noise bg-gradient-to-br from-[#371450] via-[#4e1d72] to-[#52C1DE]/20 border border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-radial-gradient from-[#52C1DE]/20 to-transparent pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(82,193,222,0.15) 0%, transparent 70%)', top: '-20%' }}></div>
          <p className="text-[#52C1DE] text-[12px] font-semibold tracking-[4px] uppercase mb-6 font-display">Get started today</p>
          <h2 className="font-display text-[40px] md:text-[56px] font-bold tracking-tight mb-6 leading-tight">
            Ready to transform<br/>your support?
          </h2>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-[#52C1DE] text-[#1e0a2e] font-display font-bold rounded-xl hover:bg-[#7ed4e8] transition-all hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-display font-medium rounded-xl hover:border-[#52C1DE]/50 transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 px-6 py-12 bg-[#170824]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <AnimatedLogo />
              <span className="font-display font-bold text-[20px]">Alex<span className="text-[#52C1DE]">IS</span></span>
            </div>
            <p className="text-white/35 text-[14px] max-w-xs leading-relaxed font-body">Intelligent support infrastructure for teams that care about excellence.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 font-display">
            {["Product", "Company", "Support"].map((cat) => (
              <div key={cat}>
                <div className="text-white/60 font-semibold mb-4 text-[14px]">{cat}</div>
                <div className="flex flex-col gap-2 text-[13px] text-white/35">
                  <a href="#" className="hover:text-[#52C1DE] transition-colors">Link One</a>
                  <a href="#" className="hover:text-[#52C1DE] transition-colors">Link Two</a>
                  <a href="#" className="hover:text-[#52C1DE] transition-colors">Link Three</a>
                </div>
              </div>
            ))}
          </div>
        </div>

{/* my change */}
<MagicBento 
  textAutoHide={true}
  enableStars
  enableSpotlight
  enableBorderGlow={true}
  enableTilt={false}
  enableMagnetism={false}
  clickEffect
  spotlightRadius={400}
  particleCount={12}
  glowColor="132, 0, 255"
  disableAnimations={false}
/>

<h1>Partenariat technologique</h1>
{/* my new change */}
  <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={imageLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#170824"
        ariaLabel="Technology partners"
      />
      
      {/* Vertical loop with deceleration on hover */}
      <LogoLoop
        logos={techLogos}
  useCustomRender={false}
/>
    </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/20 font-body">
          <span>© 2025 SupportDesk Inc. Built with precision.</span>
          <div className="flex gap-6 uppercase tracking-widest font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}