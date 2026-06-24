"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { sendMessage } from "@/src/features/auth/services/aiSupport.service";



// ─── Chat types ───────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ─── Avatar data ──────────────────────────────────────────────────────────────
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

// ─── AI Chat Modal ────────────────────────────────────────────────────────────
function AIChatModal({ isOpen, onClose, initialMessage }: {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id:"greeting", role:"assistant", content:"Hi! I'm your AI support agent. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const sentInitial = useRef(false);

  // Auto-send chip text when modal opens with an initialMessage
  useEffect(() => {
    if (isOpen && initialMessage && !sentInitial.current) {
      sentInitial.current = true;
      handleSendText(initialMessage);
    }
    if (!isOpen) sentInitial.current = false;
  }, [isOpen, initialMessage]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 120); }, [isOpen]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSendText = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role:"user", content:text };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const reply = await sendMessage(text);
      setMessages(p => [...p, { id:crypto.randomUUID(), role:"assistant", content:reply }]);
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages(p => [...p, { id:crypto.randomUUID(), role:"assistant", content:"Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => handleSendText(input.trim());
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0,
          background:"rgba(0,0,0,0.5)",
          backdropFilter:"blur(6px)",
          WebkitBackdropFilter:"blur(6px)",
          zIndex:10000,
          animation:"chatFadeIn 0.18s ease",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI Support Chat"
        style={{
          position:"fixed",
          bottom:110,
          right:28,
          width:"clamp(300px, 90vw, 380px)",
          height:"clamp(420px, 65vh, 540px)",
          background:"linear-gradient(160deg, #130c1e 0%, #0c0812 100%)",
          border:"1px solid rgba(81,194,222,0.18)",
          borderRadius:20,
          boxShadow:"0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(81,194,222,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
          display:"flex",
          flexDirection:"column",
          overflow:"hidden",
          zIndex:10001,
          animation:"chatSlideUp 0.24s cubic-bezier(0.34,1.56,0.64,1)",
          fontFamily:"'DM Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{
          padding:"14px 16px",
          borderBottom:"1px solid rgba(81,194,222,0.1)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"rgba(81,194,222,0.04)",
          flexShrink:0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Mini avatar */}
            <div style={{
              width:34, height:34, borderRadius:"50%",
              background:"linear-gradient(135deg,#371350,#1e0a30)",
              border:"1.5px solid rgba(81,194,222,0.45)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
            }}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <ellipse cx="12" cy="14.5" rx="2.2" ry="2.2" fill="#51C2DE"/>
                <ellipse cx="20" cy="14.5" rx="2.2" ry="2.2" fill="#51C2DE"/>
                <path d="M11 20.5 Q16 24.5 21 20.5" stroke="#51C2DE" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div>
              <div style={{ color:"#fff", fontWeight:700, fontSize:13, letterSpacing:"-0.01em" }}>AI Support</div>
              <div style={{ color:"#34d9a5", fontSize:10.5, display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#34d9a5", display:"inline-block", animation:"chatPulse 2s infinite" }}/>
                Online · Avg reply &lt;2 min
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            style={{
              background:"rgba(255,255,255,0.05)", border:"none",
              color:"#6b7280", width:28, height:28, borderRadius:8,
              cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center",
              transition:"background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color="#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color="#6b7280"; }}
          >✕</button>
        </div>

        {/* Messages */}
        <div style={{
          flex:1, overflowY:"auto", padding:"14px",
          display:"flex", flexDirection:"column", gap:10,
          scrollbarWidth:"thin", scrollbarColor:"rgba(81,194,222,0.15) transparent",
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display:"flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation:"chatFadeIn 0.2s ease",
            }}>
              <div style={{
                maxWidth:"80%",
                padding:"9px 13px",
                borderRadius: msg.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg,rgba(81,194,222,0.85),rgba(52,217,165,0.75))"
                  : "rgba(255,255,255,0.05)",
                border: msg.role === "assistant" ? "1px solid rgba(81,194,222,0.12)" : "none",
                color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.82)",
                fontSize:13,
                lineHeight:1.55,
                letterSpacing:"-0.01em",
                whiteSpace:"pre-wrap",
                wordBreak:"break-word",
                boxShadow: msg.role === "user" ? "0 4px 16px rgba(81,194,222,0.2)" : "none",
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{
                padding:"10px 16px",
                borderRadius:"14px 14px 14px 3px",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(81,194,222,0.12)",
                display:"flex", gap:5, alignItems:"center",
              }}>
                {[0,1,2].map(i=>(
                  <span key={i} style={{
                    width:5, height:5, borderRadius:"50%", background:"#51C2DE", display:"inline-block",
                    animation:`chatBounce 1.2s ease-in-out ${i*0.2}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{
          padding:"10px 12px",
          borderTop:"1px solid rgba(81,194,222,0.08)",
          display:"flex", gap:8, alignItems:"flex-end",
          background:"rgba(81,194,222,0.02)",
          flexShrink:0,
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            style={{
              flex:1,
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(81,194,222,0.18)",
              borderRadius:11,
              color:"#f9fafb",
              fontSize:13,
              padding:"9px 12px",
              resize:"none",
              outline:"none",
              fontFamily:"inherit",
              lineHeight:1.5,
              maxHeight:90,
              overflowY:"auto",
              transition:"border-color 0.15s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor="rgba(81,194,222,0.55)")}
            onBlur={e  => (e.currentTarget.style.borderColor="rgba(81,194,222,0.18)")}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            style={{
              width:36, height:36, borderRadius:10, border:"none",
              background: input.trim() && !isLoading
                ? "linear-gradient(135deg,#51C2DE,#34d9a5)"
                : "rgba(255,255,255,0.06)",
              color: input.trim() && !isLoading ? "#fff" : "#4b5563",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, flexShrink:0,
              transition:"all 0.15s",
              boxShadow: input.trim() && !isLoading ? "0 4px 12px rgba(81,194,222,0.3)" : "none",
            }}
          >↑</button>
        </div>
      </div>

      <style>{`
        @keyframes chatFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes chatSlideUp { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes chatBounce  { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes chatPulse   { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SupportAvatar() {
  const [side, setSide]         = useState<"right"|"left">("right");
  const [flyAnim, setFlyAnim]   = useState<""|"fly-r"|"fly-l">("");
  const [msgIdx, setMsgIdx]     = useState(0);
  const [bubShow, setBubShow]   = useState(false);
  const [wave, setWave]         = useState(false);
  const [face, setFace]         = useState<Face>(DEFAULT_FACE);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSeed, setChatSeed] = useState<string|undefined>(undefined);

  const sideRef = useRef<"right"|"left">("right");
  const miRef   = useRef(0);

  // ── face setters ─────────────────────────────────────────────────
  const patchFace  = useCallback((p: Partial<Face>) => setFace(f => ({...f,...p})), []);
  const resetFace  = useCallback((delay=700) => setTimeout(()=>setFace(DEFAULT_FACE), delay), []);
  const exprBlink  = useCallback(()=>{ patchFace({eyeScaleY:0.05}); setTimeout(()=>patchFace({eyeScaleY:1}),100); }, [patchFace]);
  const exprLook   = useCallback((dir:"l"|"r"|"c")=>{ const dx=dir==="r"?1.8:dir==="l"?-1.8:0; patchFace({pupX:dx}); setTimeout(()=>patchFace({pupX:0}),650); }, [patchFace]);
  const exprLookUp = useCallback(()=>{ patchFace({pupY:-1.5,browY:-1.5}); resetFace(600); }, [patchFace,resetFace]);
  const exprSurprised = useCallback(()=>{ patchFace({mouth:"o",browY:-2.5}); resetFace(900); }, [patchFace,resetFace]);
  const exprHappy  = useCallback(()=>{ patchFace({mouth:"bigsmile",browY:-1.5}); resetFace(800); }, [patchFace,resetFace]);
  const exprThink  = useCallback(()=>{ patchFace({mouth:"flat"}); exprLookUp(); resetFace(800); }, [patchFace,exprLookUp,resetFace]);
  const exprSmirk  = useCallback(()=>{ patchFace({mouth:"smirkl"}); exprLook("r"); resetFace(700); }, [patchFace,exprLook,resetFace]);
  const exprO      = useCallback(()=>{
    patchFace({mouth:"o",browY:-2}); exprLook("r");
    setTimeout(()=>exprLook("l"),500);
    setTimeout(()=>setFace(DEFAULT_FACE),1100);
  }, [patchFace,exprLook]);

  const doWave = useCallback(()=>{ setWave(true); setTimeout(()=>setWave(false),1350); }, []);
  const exprPool = [exprBlink,()=>exprLook("r"),()=>exprLook("l"),exprLookUp,exprSurprised,exprSmirk,exprHappy,exprThink,exprO];

  // ── fly cycle ────────────────────────────────────────────────────
  const fly = useCallback(()=>{
    if (chatOpen) return; // don't fly while chat is open
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
  }, [exprSurprised,exprLook,exprHappy,doWave,chatOpen]);

  useEffect(()=>{ setTimeout(()=>{ setBubShow(true); doWave(); exprHappy(); }, 800); }, []);
  useEffect(()=>{ const id=setInterval(fly,10000); return ()=>clearInterval(id); }, [fly]);
  useEffect(()=>{ const id=setInterval(()=>{ if(!chatOpen) exprPool[Math.floor(Math.random()*exprPool.length)](); },2200); return ()=>clearInterval(id); }, [chatOpen]);

  // ── open chat (optionally with a pre-seeded chip message) ────────
  const openChat = (seed?: string) => {
    setChatSeed(seed);
    setChatOpen(true);
    exprHappy();
    setBubShow(false);
  };

  // ── mouth paths ──────────────────────────────────────────────────
  const mouthPath: Record<string,string> = {
    smile:    "M11 20.5 Q16 24.5 21 20.5",
    bigsmile: "M9 20 Q16 26.5 23 20",
    flat:     "M11 21 L21 21",
    smirkl:   "M11 21 Q14 19.5 21 20.5",
  };

  const m = MSGS[msgIdx];
  const isRight  = side==="right";
  const flyClass = flyAnim || "floating";

  return (
    <>
      {/* ── Floating widget ─────────────────────────────────────── */}
      <div style={{
        position:"fixed", bottom:32, zIndex:9999,
        fontFamily:"'DM Sans',sans-serif",
        ...(isRight ? {right:28} : {left:28}),
        display:"flex", flexDirection:"column", gap:8,
        alignItems: isRight ? "flex-end" : "flex-start",
      }}>
        {/* Bubble */}
        {!chatOpen && (
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
                <button
                  key={c}
                  onClick={() => openChat(c)}
                  style={{
                    background:"rgba(81,194,222,0.12)",
                    border:"1px solid rgba(81,194,222,0.28)",
                    color:"#51C2DE",fontSize:9,fontWeight:600,
                    padding:"3px 8px",borderRadius:20,cursor:"pointer",fontFamily:"inherit",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background="rgba(81,194,222,0.22)"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background="rgba(81,194,222,0.12)"}
                >{c}</button>
              ))}
            </div>
          </div>
        )}

        {/* Avatar button */}
        <div style={{position:"relative"}}>
          {wave && (
            <div style={{
              position:"absolute",top:-16,fontSize:20,pointerEvents:"none",
              ...(isRight?{right:-2}:{left:-2}),
              animation:"avWave 1.3s ease forwards",
              transformOrigin:"70% 80%",
            }}>👋</div>
          )}
          <button
            onClick={() => openChat()}
            aria-label="Open AI support chat"
            style={{
              width:58,height:58,borderRadius:"50%",
              border:"2px solid rgba(81,194,222,0.5)",
              background:"linear-gradient(135deg,#371350,#1e0a30)",
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
              position:"relative",
              animation:`${flyClass} ${flyAnim?"0.85s cubic-bezier(0.4,0,0.2,1) forwards":"3s ease-in-out infinite"}`,
              transition:"box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(81,194,222,0.85)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 20px rgba(81,194,222,0.3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(81,194,222,0.5)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="none"; }}
          >
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
      </div>

      {/* ── AI Chat Modal ────────────────────────────────────────── */}
      <AIChatModal
        isOpen={chatOpen}
        onClose={() => { setChatOpen(false); setBubShow(true); }}
        initialMessage={chatSeed}
      />

      <style>{`
        @keyframes floating { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes fly-r { 0%{transform:translateX(0) translateY(0) rotate(0deg)} 45%{transform:translateX(45px) translateY(-38px) rotate(10deg)} 100%{transform:translateX(0) translateY(0) rotate(0deg)} }
        @keyframes fly-l { 0%{transform:translateX(0) translateY(0) rotate(0deg)} 45%{transform:translateX(-45px) translateY(-38px) rotate(-10deg)} 100%{transform:translateX(0) translateY(0) rotate(0deg)} }
        @keyframes avWave { 0%{opacity:0;transform:rotate(-10deg) scale(0.6)} 15%{opacity:1;transform:rotate(22deg) scale(1)} 35%{transform:rotate(-14deg)} 55%{transform:rotate(20deg)} 75%{transform:rotate(-4deg)} 90%{opacity:1} 100%{opacity:0;transform:rotate(6deg) scale(0.5)} }
      `}</style>
    </>
  );
}