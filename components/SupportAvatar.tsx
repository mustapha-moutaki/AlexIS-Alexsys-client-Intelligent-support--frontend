
"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const MSGS = [
  { t:"Hi there! 👋",   x:"Need help? I'm right here.",       chips:["I have a problem","Track ticket","Talk to agent"] },
  { t:"Quick help?",     x:"Average response: under 2 min.",   chips:["Browse docs","Open a ticket","Live chat"] },
  { t:"Still here! 💬",  x:"Just tap a topic to get started.", chips:["Technical issue","Billing","My account"] },
  { t:"Not sure? 🤔",    x:"Tell me what's going on.",         chips:["Explain my issue","See FAQs","Get a callback"] },
  { t:"We're online ✅", x:"Our agents are ready for you.",    chips:["Talk to agent","Check status","Raise a ticket"] },
];

type Face = {
  pupX: number; pupY: number;
  browY: number;
  eyeScaleY: number;
  mouth: "smile" | "bigsmile" | "flat" | "o" | "smirkl";
};
const DEFAULT_FACE: Face = { pupX:0, pupY:0, browY:0, eyeScaleY:1, mouth:"smile" };

export default function SupportAvatar() {
  const [side, setSide]       = useState<"right"|"left">("right");
  const [flyAnim, setFlyAnim] = useState<""|"fly-r"|"fly-l">("");
  const [msgIdx, setMsgIdx]   = useState(0);
  const [bubShow, setBubShow] = useState(false);
  const [wave, setWave]       = useState(false);
  const [face, setFace]       = useState<Face>(DEFAULT_FACE);

  const sideRef = useRef<"right"|"left">("right");
  const miRef   = useRef(0);

  // ── face setters ────────────────────────────────────────────────
  const patchFace = useCallback((p: Partial<Face>) => setFace(f => ({...f,...p})), []);
  const resetFace = useCallback((delay=700) => setTimeout(()=>setFace(DEFAULT_FACE), delay), []);

  const exprBlink      = useCallback(()=>{ patchFace({eyeScaleY:0.05}); setTimeout(()=>patchFace({eyeScaleY:1}),100); }, [patchFace]);
  const exprLook       = useCallback((dir:"l"|"r"|"c")=>{ const dx=dir==="r"?1.8:dir==="l"?-1.8:0; patchFace({pupX:dx}); setTimeout(()=>patchFace({pupX:0}),650); }, [patchFace]);
  const exprLookUp     = useCallback(()=>{ patchFace({pupY:-1.5,browY:-1.5}); resetFace(600); }, [patchFace,resetFace]);
  const exprSurprised  = useCallback(()=>{ patchFace({mouth:"o",browY:-2.5}); resetFace(900); }, [patchFace,resetFace]);
  const exprHappy      = useCallback(()=>{ patchFace({mouth:"bigsmile",browY:-1.5}); resetFace(800); }, [patchFace,resetFace]);
  const exprThink      = useCallback(()=>{ patchFace({mouth:"flat"}); exprLookUp(); resetFace(800); }, [patchFace,exprLookUp,resetFace]);
  const exprSmirk      = useCallback(()=>{ patchFace({mouth:"smirkl"}); exprLook("r"); resetFace(700); }, [patchFace,exprLook,resetFace]);
  const exprO          = useCallback(()=>{
    patchFace({mouth:"o",browY:-2}); exprLook("r");
    setTimeout(()=>exprLook("l"),500);
    setTimeout(()=>setFace(DEFAULT_FACE),1100);
  }, [patchFace,exprLook]);

  const doWave = useCallback(()=>{ setWave(true); setTimeout(()=>setWave(false),1350); }, []);

  const exprPool = [exprBlink,()=>exprLook("r"),()=>exprLook("l"),exprLookUp,exprSurprised,exprSmirk,exprHappy,exprThink,exprO];

  // ── fly cycle ───────────────────────────────────────────────────
  const fly = useCallback(()=>{
    setBubShow(false);
    exprSurprised();
    setTimeout(()=>{
      setFlyAnim(sideRef.current==="right" ? "fly-r" : "fly-l");
      exprLook(sideRef.current==="right" ? "r" : "l");
    }, 320);
    setTimeout(()=>{
      sideRef.current = sideRef.current==="right" ? "left" : "right";
      setSide(sideRef.current);
      setFlyAnim("");
      miRef.current = (miRef.current+1) % MSGS.length;
      setMsgIdx(miRef.current);
      setBubShow(true);
      doWave(); exprHappy();
    }, 870);
  }, [exprSurprised,exprLook,exprHappy,doWave]);

  useEffect(()=>{ setTimeout(()=>{ setBubShow(true); doWave(); exprHappy(); }, 800); }, []);
  useEffect(()=>{ const id=setInterval(fly,10000); return ()=>clearInterval(id); }, [fly]);
  useEffect(()=>{ const id=setInterval(()=>{ exprPool[Math.floor(Math.random()*exprPool.length)](); },2200); return ()=>clearInterval(id); }, []);

  // ── mouth paths ─────────────────────────────────────────────────
  const mouthPath: Record<string,string> = {
    smile:    "M11 20.5 Q16 24.5 21 20.5",
    bigsmile: "M9 20 Q16 26.5 23 20",
    flat:     "M11 21 L21 21",
    smirkl:   "M11 21 Q14 19.5 21 20.5",
  };

  const m = MSGS[msgIdx];
  const isRight = side==="right";
  const flyClass = flyAnim || "floating";

  return (
    <div style={{ position:"fixed", bottom:32, zIndex:9999, fontFamily:"'DM Sans',sans-serif",
      ...(isRight ? {right:28} : {left:28}),
      display:"flex", flexDirection:"column", gap:8,
      alignItems: isRight ? "flex-end" : "flex-start",
    }}>
      {/* Bubble */}
      <div style={{
        background:"linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))",
        border:"1px solid rgba(255,255,255,0.11)",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        borderRadius: isRight ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        padding:"11px 13px", maxWidth:215,
        boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
        opacity: bubShow ? 1 : 0,
        transform: bubShow ? "scale(1) translateY(0)" : "scale(0.88) translateY(5px)",
        transition:"opacity 0.3s, transform 0.3s",
      }}>
        <div style={{fontSize:11,fontWeight:700,color:"#51C2DE",marginBottom:3}}>{m.t}</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.72)",lineHeight:1.5}}>{m.x}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
          {m.chips.map(c=>(
            <button key={c} style={{background:"rgba(81,194,222,0.12)",border:"1px solid rgba(81,194,222,0.28)",color:"#51C2DE",fontSize:9,fontWeight:600,padding:"3px 8px",borderRadius:20,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div style={{position:"relative"}}>
        {wave && <div style={{position:"absolute",top:-16,fontSize:20,pointerEvents:"none",...(isRight?{right:-2}:{left:-2}),animation:"avWave 1.3s ease forwards",transformOrigin:"70% 80%"}}>👋</div>}
        <button style={{width:58,height:58,borderRadius:"50%",border:"2px solid rgba(81,194,222,0.5)",background:"linear-gradient(135deg,#371350,#1e0a30)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",animation:`${flyClass} ${flyAnim?"0.85s cubic-bezier(0.4,0,0.2,1) forwards":"3s ease-in-out infinite"}`}}>
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="rgba(22, 154, 187, 0.12)" stroke="rgba(81,194,222,0.55)" strokeWidth="1.2"/>
            {/* brows */}
            <line x1="10" y1={11+face.browY} x2="14" y2={10.5+face.browY} stroke="#51C2DE" strokeWidth="1.3" strokeLinecap="round" style={{transition:"y1 0.2s,y2 0.2s"}}/>
            <line x1="18" y1={10.5+face.browY} x2="22" y2={11+face.browY} stroke="#51C2DE" strokeWidth="1.3" strokeLinecap="round" style={{transition:"y1 0.2s,y2 0.2s"}}/>
            {/* left eye */}
            <g style={{transformOrigin:"12px 14.5px",transform:`scaleY(${face.eyeScaleY})`,transition:"transform 0.06s"}}>
              <ellipse cx="12" cy="14.5" rx="2.2" ry="2.2" fill="#51C2DE"/>
              <circle cx="12.8" cy="13.7" r="0.75" fill="#fff" opacity="0.5"/>
              <circle cx={12+face.pupX} cy={14.5+face.pupY} r="1.05" fill="#51C2DE" style={{transition:"cx 0.2s,cy 0.2s"}}/>
            </g>
            {/* right eye */}
            <g style={{transformOrigin:"20px 14.5px",transform:`scaleY(${face.eyeScaleY})`,transition:"transform 0.06s"}}>
              <ellipse cx="20" cy="14.5" rx="2.2" ry="2.2" fill="#51C2DE"/>
              <circle cx="20.8" cy="13.7" r="0.75" fill="#fff" opacity="0.5"/>
              <circle cx={20+face.pupX} cy={14.5+face.pupY} r="1.05" fill="#51C2DE" style={{transition:"cx 0.2s,cy 0.2s"}}/>
            </g>
            {/* mouth */}
            {face.mouth === "o" ? (
              <>
                <line x1="13.5" y1="19.2" x2="18.5" y2="19.2" stroke="#51C2DE" strokeWidth="1.3" strokeLinecap="round"/>
                <ellipse cx="16" cy="21.5" rx="2" ry="2.2" fill="#51C2DE"/>
              </>
            ) : (
              <path d={mouthPath[face.mouth]} stroke="#51C2DE" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            )}
          </svg>
          <span style={{position:"absolute",bottom:3,right:3,width:11,height:11,borderRadius:"50%",background:"#34d9a5",border:"2px solid #0a0a0d"}}/>
        </button>
      </div>

      <style>{`
        @keyframes floating { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes fly-r { 0%{transform:translateX(0) translateY(0) rotate(0deg)} 45%{transform:translateX(45px) translateY(-38px) rotate(10deg)} 100%{transform:translateX(0) translateY(0) rotate(0deg)} }
        @keyframes fly-l { 0%{transform:translateX(0) translateY(0) rotate(0deg)} 45%{transform:translateX(-45px) translateY(-38px) rotate(-10deg)} 100%{transform:translateX(0) translateY(0) rotate(0deg)} }
        @keyframes avWave { 0%{opacity:0;transform:rotate(-10deg) scale(0.6)} 15%{opacity:1;transform:rotate(22deg) scale(1)} 35%{transform:rotate(-14deg)} 55%{transform:rotate(20deg)} 75%{transform:rotate(-4deg)} 90%{opacity:1} 100%{opacity:0;transform:rotate(6deg) scale(0.5)} }
      `}</style>
    </div>
  );
}