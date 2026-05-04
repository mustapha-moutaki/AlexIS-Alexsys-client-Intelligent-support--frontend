"use client";
import React from "react";


export default function AnimatedBackground() {
  return (
    <>
      <style jsx global>{`
        @keyframes bgDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(60px, -40px) scale(1.08); }
          66%       { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes bgDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-80px, 30px) scale(1.05); }
          66%       { transform: translate(50px, -60px) scale(1.1); }
        }
        @keyframes bgDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(40px, 40px) scale(0.92); }
        }
        @keyframes bgDrift4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-50px, -30px) scale(1.08); }
          80%       { transform: translate(30px, 20px) scale(0.95); }
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .bg-orb-1 {
          width: 700px;
          height: 700px;
          top: -180px;
          left: -180px;
          background: radial-gradient(circle at center, #371450cc 0%, #51c2de18 60%, transparent 80%);
          filter: blur(90px);
          opacity: 0.6;
          animation: bgDrift1 22s ease-in-out infinite;
        }
        .bg-orb-2 {
          width: 600px;
          height: 600px;
          top: 25%;
          right: -200px;
          background: radial-gradient(circle at center, #51c2de28 0%, #37145044 60%, transparent 80%);
          filter: blur(80px);
          opacity: 0.55;
          animation: bgDrift2 28s ease-in-out infinite;
        }
        .bg-orb-3 {
          width: 500px;
          height: 500px;
          bottom: 5%;
          left: 15%;
          background: radial-gradient(circle at center, #51c2de1a 0%, #37145066 60%, transparent 80%);
          filter: blur(70px);
          opacity: 0.5;
          animation: bgDrift3 20s ease-in-out infinite;
        }
        .bg-orb-4 {
          width: 420px;
          height: 420px;
          top: 55%;
          right: 5%;
          background: radial-gradient(circle at center, #371450 0%, #51c2de10 70%, transparent 90%);
          filter: blur(80px);
          opacity: 0.45;
          animation: bgDrift4 25s ease-in-out infinite;
        }
        .bg-grid-lines {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image:
            linear-gradient(#51c2de 1px, transparent 1px),
            linear-gradient(90deg, #51c2de 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
      `}</style>

      {/* Animated gradient orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />


      {/* Subtle grid overlay */}
      <div className="bg-grid-lines" />
    </>
  );
}