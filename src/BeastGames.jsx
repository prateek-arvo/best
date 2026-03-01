import { useState, useEffect, useRef, useCallback } from "react";

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
};

const useWindowSize = () => {
  const [size, setSize] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1200 });
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
};

const FadeUp = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      width: "100%",
      maxWidth: "100%",
    }}>
      {children}
    </div>
  );
};

const services = [
  { icon: "🎨", title: "Concept Art & Art Direction", desc: "From thumbnails to final artwork — we define the visual language of your game world through expert art direction.", num: "01" },
  { icon: "🗿", title: "3D Characters & Assets", desc: "High-poly and game-ready 3D models built for any style — from hyper-realistic AAA to stylized mobile assets.", num: "02" },
  { icon: "🏔", title: "3D Environment Design", desc: "Complete environment creation including level art, props, materials, lighting, and in-engine integration.", num: "03" },
];

import hp1 from "./assets/hp1.png";
import sh1 from "./assets/sh1.png";
import sh2 from "./assets/2.png";
import img26 from "./assets/26.jpg";
import img11 from "./assets/11.jpg";

const portfolioItems = [
  { title: "Dark Fantasy Action RPG", tag: "AAA Console", bg: img26, span: true },
  { title: "Sci-Fi Multiplayer Shooter", tag: "3D Characters", bg: hp1 },
  { title: "Open World Adventure", tag: "Environment Art", bg: img11 },
  { title: "Stylized Strategy RPG", tag: "Mobile Game", bg: sh2, spanCol: true },
  { title: "Racing Game Cinematics", tag: "VFX & Animation", bg: sh1 },
  // { title: "Historical Strategy Game", tag: "Concept Art", bg: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop" },
];

const processSteps = [
  { num: "01", title: "Discovery & Pre-Production", desc: "Building reference boards, defining visual language, and aligning with your brand before a single asset is created." },
  { num: "02", title: "Art Production", desc: "Our teams execute at scale with proven pipelines for style consistency and timely deliveries." },
  { num: "03", title: "Quality Assurance", desc: "Every asset passes multiple assessment levels. We ensure each piece works in context and maintains consistency." },
  { num: "04", title: "Integration & LiveOps", desc: "From pre-production to LiveOps — in-engine integration, optimization, and ongoing content support." },
];

const testimonials = [
  { quote: "An outstanding professional studio of global standards. They always fulfill timely delivery and surpass our expectations. A great pleasure to work with an energetic team of highly creative and intelligent people.", author: "Lead Producer", role: "Major Publisher — Mobile Division" },
  { quote: "They built a very professional team on short notice. The tech level has been great, same as execution and communication. A robust and reliable partner.", author: "Executive Producer", role: "AAA Studio — PC & Console" },
  { quote: "A wonderful partner providing quality art support in a timely and flexible manner. They integrated seamlessly into our pipeline. Highly recommended.", author: "Art Director", role: "Independent Studio — Action Games" },
  { quote: "They accepted the challenge with tireless enthusiasm and talent, and the results were fantastic. Very few compromises that still capture wonder.", author: "Creative Director", role: "Adventure Game Studio" },
];

const marqueeItems = ["3D CHARACTERS", "ENVIRONMENT DESIGN", "ANIMATION & RIGGING", "GAME TRAILERS" ];

const stats = [
  { big: "10+", desc: "Artists on Staff" },
  { big: "3", desc: "Continents" },
  { big: "320+", desc: "Projects in 2025" },
  { big: "30+", desc: "Partner Countries" },
];

/* ===== Centered container component for widescreen ===== */
const Container = ({ children, style = {}, full = false }) => (
  <div style={{
    width: "100%",
    maxWidth: full ? "100%" : 1600,
    marginLeft: "auto",
    marginRight: "auto",
    ...style,
  }}>
    {children}
  </div>
);

export default function BeastGamesInteractive() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredPortfolio, setHoveredPortfolio] = useState(null);
  const { w } = useWindowSize();

  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isDesktop = w >= 1024;
  const isWide = w >= 1440;
  const isUltrawide = w >= 1920;
  const is4K = w >= 2560;

  // Responsive side padding scales up for ultrawide
  const pad = isMobile ? 16 : isTablet ? 40 : isWide ? Math.min(Math.round((w - 1440) * 0.08) + 80, 200) : 60;
  const sectionVPad = isMobile ? 56 : isTablet ? 100 : isWide ? 160 : 120;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  // ---- Responsive style helpers ----
  const labelStyle = {
    fontFamily: "'Exo 2',sans-serif",
    fontSize: isWide ? ".75rem" : ".65rem",
    fontWeight: 700,
    letterSpacing: isMobile ? 2 : isWide ? 5 : 4,
    textTransform: "uppercase", color: "#ff3c1f",
    marginBottom: isMobile ? 12 : isWide ? 20 : 16,
    display: "flex", alignItems: "center", gap: 10,
  };
  const headingStyle = {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: isMobile ? "2rem" : isTablet ? "3rem" : is4K ? "5.5rem" : isUltrawide ? "5rem" : isWide ? "4.5rem" : "clamp(3rem,5vw,4.5rem)",
    lineHeight: 0.95,
    marginBottom: isMobile ? 14 : isWide ? 32 : 24,
  };
  const descStyle = {
    fontSize: isMobile ? ".9rem" : isWide ? "1.15rem" : "1.05rem",
    lineHeight: 1.75, color: "#8a8a9a",
    maxWidth: isWide ? 700 : 600,
    marginBottom: isMobile ? 28 : isWide ? 72 : 60,
  };

  const wrapStyle = { width: "100%", maxWidth: "100vw", overflowX: "hidden" };

  return (
    <div style={{
      fontFamily: "'Rajdhani', sans-serif", background: "#0a0a0f", color: "#f0eee9",
      minHeight: "100vh", WebkitFontSmoothing: "antialiased",
      overflowX: "hidden", width: "100%", maxWidth: "100vw", position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { -webkit-text-size-adjust:100%; overflow-x:hidden; }
        body { margin:0; background:#0a0a0f; overflow-x:hidden; width:100%; }
        ::-webkit-scrollbar { width:6px }
        ::-webkit-scrollbar-track { background:#0a0a0f }
        ::-webkit-scrollbar-thumb { background:#ff3c1f; border-radius:3px }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* NOISE */}
      <div style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none", opacity:0.03,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat:"repeat"
      }} />

      {/* ===== NAV ===== */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height: scrolled ? (isWide ? 60 : 54) : (isMobile ? 56 : isWide ? 88 : 80),
        display:"flex", alignItems:"center", justifyContent:"center",
        background: scrolled ? "rgba(10,10,15,0.97)" : "rgba(10,10,15,0.85)",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.06)", transition:"all 0.3s",
      }}>
        <Container style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:`0 ${pad}px` }}>
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize: isMobile ? "1rem" : isWide ? "1.9rem" : isTablet ? "1.4rem" : "1.7rem",
            letterSpacing: isMobile ? 1 : isWide ? 3 : 2,
            display:"flex", alignItems:"center", gap: isMobile ? 8 : 12,
          }}>
            <span style={{ width: isMobile ? 8 : isWide ? 12 : 10, height: isMobile ? 8 : isWide ? 12 : 10, background:"#ff3c1f", borderRadius:"50%", display:"inline-block", boxShadow:"0 0 12px rgba(255,60,31,0.35)", animation:"pulse 2s infinite", flexShrink:0 }} />
            {isMobile ? "BEAST GAMES" : "BEAST GAMES INTERACTIVE"}
          </div>

          {isDesktop ? (
            <div style={{ display:"flex", gap: isWide ? 48 : 36, alignItems:"center" }}>
              {["services","portfolio","process","testimonials"].map(s => (
                <a key={s} onClick={() => scrollTo(s)} style={{
                  fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".9rem" : ".85rem", fontWeight:600,
                  letterSpacing: isWide ? 2 : 1.5, textTransform:"uppercase", color:"#8a8a9a", cursor:"pointer", transition:"color .3s"
                }}
                  onMouseEnter={e => e.target.style.color="#f0eee9"} onMouseLeave={e => e.target.style.color="#8a8a9a"}>
                  {s === "testimonials" ? "Clients" : s}
                </a>
              ))}
              <button onClick={() => scrollTo("contact")} style={{
                fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".85rem" : ".8rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase",
                padding: isWide ? "14px 36px" : "12px 28px", border:"1px solid #ff3c1f", color:"#ff3c1f", background:"transparent", cursor:"pointer", transition:"all .3s"
              }}
                onMouseEnter={e => { e.target.style.background="linear-gradient(135deg,#ff3c1f,#ff6b1a)"; e.target.style.color="#fff"; e.target.style.borderColor="transparent"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#ff3c1f"; e.target.style.borderColor="#ff3c1f"; }}>
                Get in Touch
              </button>
            </div>
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{
              display:"flex", flexDirection:"column", gap:5, cursor:"pointer", zIndex:1001,
              padding:8, background:"none", border:"none", WebkitTapHighlightColor:"transparent"
            }}>
              <span style={{ width:22, height:2, background:"#f0eee9", display:"block", transition:"all 0.3s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ width:22, height:2, background:"#f0eee9", display:"block", transition:"opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width:22, height:2, background:"#f0eee9", display:"block", transition:"all 0.3s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          )}
        </Container>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && !isDesktop && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:998, animation:"fadeIn 0.3s" }} />
          <div style={{
            position:"fixed", top:0, right:0, width: isMobile ? "85vw" : "50vw", maxWidth:340,
            height:"100dvh", background:"#0d0d14", zIndex:999,
            borderLeft:"1px solid rgba(255,255,255,0.08)",
            padding:"80px 28px 40px", display:"flex", flexDirection:"column", gap:24,
            animation:"slideIn 0.3s cubic-bezier(0.22,1,0.36,1)",
            overflowY:"auto", WebkitOverflowScrolling:"touch"
          }}>
            {["services","portfolio","process","testimonials","contact"].map((s, i) => (
              <a key={s} onClick={() => scrollTo(s)} style={{
                fontFamily:"'Exo 2',sans-serif", fontSize:".95rem", fontWeight:600,
                letterSpacing:2, textTransform:"uppercase", color:"#8a8a9a", cursor:"pointer",
                display:"flex", alignItems:"center", gap:12, padding:"6px 0",
              }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".85rem", color:"#ff3c1f", width:24 }}>0{i+1}</span>
                {s === "testimonials" ? "Clients" : s}
              </a>
            ))}
            <div style={{ marginTop:"auto", paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={() => scrollTo("contact")} style={{
                fontFamily:"'Exo 2',sans-serif", fontSize:".78rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase",
                padding:"14px 24px", background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)", color:"#fff", border:"none", cursor:"pointer", width:"100%",
              }}>
                Start a Project
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== HERO ===== */}
      <section style={{
        minHeight:"100svh", display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden",
        padding:`${isMobile ? 76 : isWide ? 140 : 120}px ${pad}px ${isMobile ? 36 : isWide ? 100 : 80}px`,
        ...wrapStyle,
      }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,60,31,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,107,26,0.05) 0%, transparent 60%), #0a0a0f" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: isMobile ? "40px 40px" : isWide ? "120px 120px" : "80px 80px", WebkitMaskImage:"radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)" }} />

        <Container style={{ position:"relative", zIndex:2, overflow:"hidden" }}>
          <FadeUp>
            <div style={{ ...labelStyle, marginBottom: isMobile ? 14 : isWide ? 36 : 28 }}>
              <span style={{ width: isMobile ? 20 : isWide ? 56 : 40, height:1, background:"#ff3c1f", display:"inline-block", flexShrink:0 }} />
              Game Art{isMobile ? " Studio" : " & Development Studio"}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize: isMobile ? "13vw" : isTablet ? "7vw" : is4K ? "9rem" : isUltrawide ? "8rem" : isWide ? "7rem" : "clamp(4rem,7.5vw,7.5rem)",
              lineHeight: 0.92, letterSpacing: isWide ? -2 : -1,
              marginBottom: isMobile ? 14 : isWide ? 40 : 28,
              overflowWrap: "break-word", wordBreak: "break-word",
              width: "100%", maxWidth: isWide ? 1100 : "100%",
            }}>
              2D AND 3D<br />
              <span style={{ WebkitTextStroke: isMobile ? "1px #f0eee9" : isWide ? "3px #f0eee9" : "2px #f0eee9", color:"transparent" }}>VIDEO GAME</span>
              {isMobile ? <br /> : " "}
              <span style={{ color:"#ff3c1f" }}>ART</span><br />
              FOR YOUR GAMES
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p style={{
              fontSize: isMobile ? ".9rem" : isWide ? "1.25rem" : "1.15rem",
              lineHeight: 1.75, color:"#8a8a9a",
              maxWidth: isMobile ? "100%" : isWide ? 680 : 560,
              marginBottom: isMobile ? 24 : isWide ? 52 : 40,
            }}>
              {isMobile
                ? "We produce top-notch 2D and 3D art for PC, console, and mobile games. 650+ artists ready to bring your vision to life."
                : "From triple-A to arcade to casual — we produce top-notch 2D and 3D art for PC, console, and mobile games. 650+ professional artists, motion designers, concept artists, VFX specialists, and UI/UX designers ready to bring your vision to life."
              }
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : isWide ? 20 : 14, width:"100%", maxWidth:"100%" }}>
              <button onClick={() => scrollTo("contact")} style={{
                fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".85rem" : ".78rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase",
                padding: isMobile ? "14px 20px" : isWide ? "18px 48px" : "16px 40px",
                background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)", color:"#fff",
                border:"none", cursor:"pointer", width: isMobile ? "100%" : "auto",
                boxSizing:"border-box", WebkitTapHighlightColor:"transparent", transition:"all .3s",
              }}
                onMouseEnter={e => { if(isDesktop){ e.target.style.transform="translateY(-2px)"; e.target.style.boxShadow="0 8px 30px rgba(255,60,31,0.35)"; }}}
                onMouseLeave={e => { e.target.style.transform="translateY(0)"; e.target.style.boxShadow="none"; }}>
                Start a Project
              </button>
              <button onClick={() => scrollTo("portfolio")} style={{
                fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".85rem" : ".78rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase",
                padding: isMobile ? "14px 20px" : isWide ? "18px 48px" : "16px 40px",
                background:"transparent", color:"#f0eee9",
                border:"1px solid rgba(255,255,255,0.12)", cursor:"pointer", width: isMobile ? "100%" : "auto",
                boxSizing:"border-box", WebkitTapHighlightColor:"transparent", transition:"all .3s",
              }}
                onMouseEnter={e => { if(isDesktop) e.target.style.borderColor="rgba(255,255,255,0.4)"; }}
                onMouseLeave={e => e.target.style.borderColor="rgba(255,255,255,0.12)"}>
                View Portfolio
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(2, auto)",
              gap: isMobile ? "20px 16px" : isWide ? "32px 80px" : "24px 60px",
              marginTop: isMobile ? 32 : isWide ? 100 : 80,
              paddingTop: isMobile ? 24 : isWide ? 52 : 40,
              borderTop:"1px solid rgba(255,255,255,0.06)",
            }}>
              {[{ n:"10+", l:"Professional Artists" }, { n:"4+", l:"Years Experience" }, 
              // { n:"320+", l:"Projects Delivered" },
              //  { n:"7/10", l:"Top Publishers" }
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? "2rem" : is4K ? "4.5rem" : isWide ? "3.8rem" : "3.2rem", background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".55rem" : isWide ? ".8rem" : ".7rem", fontWeight:600, letterSpacing: isMobile ? 1 : isWide ? 3 : 2, textTransform:"uppercase", color:"#5a5a6a", marginTop: isWide ? 8 : 4 }}>
                    {isMobile ? s.l.split(" ")[0] : s.l}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ===== MARQUEE ===== */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding: isMobile ? "10px 0" : isWide ? "28px 0" : "20px 0", overflow:"hidden", background:"#101018" }}>
        <div style={{ display:"flex", gap: isMobile ? 20 : isWide ? 80 : 60, animation:"marquee 30s linear infinite", width:"max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? ".8rem" : isWide ? "1.6rem" : "1.3rem", letterSpacing: isMobile ? 1.5 : isWide ? 5 : 3, color:"#5a5a6a", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap: isMobile ? 10 : isWide ? 36 : 24 }}>
              {item}<span style={{ fontSize: isWide ? ".6rem" : ".4rem", color:"#ff3c1f" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section id="services" style={{ padding:`${sectionVPad}px ${pad}px`, background:"#101018", ...wrapStyle }}>
        <Container>
          <FadeUp><div style={labelStyle}><span style={{ width: isWide ? 36 : 20, height:1, background:"#ff3c1f", display:"inline-block" }} />What We Do</div></FadeUp>
          <FadeUp delay={0.1}><h2 style={headingStyle}>Our Services</h2></FadeUp>
          <FadeUp delay={0.12}><p style={descStyle}>End-to-end art production and co-development services for PC, console, and mobile experiences.</p></FadeUp>

          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isWide ? 3 : 2,
            alignItems:"stretch"
          }}>
            {services.map((s, i) => (
              <FadeUp key={i} delay={isMobile ? 0 : i * 0.05}>
                <div
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    background: hoveredService === i ? "rgba(20,20,31,0.9)" : "#14141f",
                    padding: isMobile ? "24px 16px" : isWide ? "56px 44px" : "44px 32px",
                    position:"relative", overflow:"hidden", cursor:"pointer",
                    border: hoveredService === i ? "1px solid rgba(255,60,31,0.15)" : "1px solid transparent",
                    transition:"all .4s",
                  }}>
                  <div style={{
                    position:"absolute", top:0, left:0, width:"100%", height:3,
                    background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)",
                    transform: hoveredService === i ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin:"left", transition:"transform .4s"
                  }} />
                  <div style={{ position:"absolute", top: isWide ? 16 : 10, right: isWide ? 20 : 12, fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? "2rem" : isWide ? "4.5rem" : "3.5rem", color:"rgba(255,255,255,0.03)" }}>{s.num}</div>
                  <div style={{
                    width: isMobile ? 36 : isWide ? 56 : 48, height: isMobile ? 36 : isWide ? 56 : 48,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize: isMobile ? "1.1rem" : isWide ? "1.7rem" : "1.4rem",
                    marginBottom: isMobile ? 12 : isWide ? 32 : 24,
                    background:"rgba(255,60,31,0.08)", border:"1px solid rgba(255,60,31,0.12)", color:"#ff3c1f"
                  }}>{s.icon}</div>
                  <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".9rem" : isWide ? "1.25rem" : "1.1rem", fontWeight:700, letterSpacing:.5, marginBottom: isMobile ? 8 : isWide ? 18 : 14 }}>{s.title}</h3>
                  <p style={{ fontSize: isMobile ? ".8rem" : isWide ? "1.02rem" : ".92rem", lineHeight:1.65, color:"#8a8a9a" }}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" style={{ padding:`${sectionVPad}px ${pad}px`, ...wrapStyle }}>
        <Container>
          <FadeUp><div style={labelStyle}><span style={{ width: isWide ? 36 : 20, height:1, background:"#ff3c1f", display:"inline-block" }} />Featured Work</div></FadeUp>
          <FadeUp delay={0.1}><h2 style={headingStyle}>Portfolio</h2></FadeUp>
          <FadeUp delay={0.12}><p style={descStyle}>Working with top global publishers on some of gaming's most iconic franchises.</p></FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gridAutoRows: isMobile ? 160 : isWide ? 360 : 280,
              gap: isMobile ? 3 : isWide ? 6 : 4,
            }}>
              {portfolioItems.map((p, i) => {
                const colSpan = isMobile ? 1 : ((i === 0 || p.spanCol) ? 2 : 1);
                const rowSpan = isMobile ? 1 : (i === 0 ? 2 : 1);
                return (
                  <div key={i}
                    onMouseEnter={() => setHoveredPortfolio(i)}
                    onMouseLeave={() => setHoveredPortfolio(null)}
                    style={{
                      position:"relative", overflow:"hidden", cursor:"pointer",
                      backgroundImage: `url(${p.bg})`, backgroundSize:"cover", backgroundPosition:"center",
                      gridColumn:`span ${colSpan}`, gridRow:`span ${rowSpan}`,
                    }}>
                    <div style={{
                      position:"absolute", inset:0,
                      background:"linear-gradient(to top,rgba(10,10,15,0.95) 0%,rgba(10,10,15,0) 60%)",
                      opacity: isMobile ? 1 : (hoveredPortfolio === i ? 1 : 0),
                      transition:"opacity .4s",
                      display:"flex", flexDirection:"column", justifyContent:"flex-end",
                      padding: isMobile ? 14 : isWide ? 36 : 28,
                    }}>
                      <span style={{ fontSize: isWide ? ".8rem" : ".65rem", color:"#ff3c1f", fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>{p.tag}</span>
                      <h4 style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".82rem" : isWide ? "1.15rem" : "1rem", fontWeight:700, marginTop: isWide ? 6 : 3 }}>{p.title}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" style={{ padding:`${sectionVPad}px ${pad}px`, background:"#101018", ...wrapStyle }}>
        <Container>
          <FadeUp><div style={labelStyle}><span style={{ width: isWide ? 36 : 20, height:1, background:"#ff3c1f", display:"inline-block" }} />How We Work</div></FadeUp>
          <FadeUp delay={0.1}><h2 style={headingStyle}>Our Process</h2></FadeUp>
          <FadeUp delay={0.12}><p style={descStyle}>Systematic art development from look development to engine integration.</p></FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              ...(isMobile
                ? { display:"flex", flexDirection:"column", paddingLeft:20, borderLeft:"2px solid rgba(255,60,31,0.12)", marginLeft:4 }
                : { display:"grid", gridTemplateColumns: isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isTablet ? 28 : 0, position:"relative" }
              ),
            }}>
              {isDesktop && (
                <div style={{ position:"absolute", top: isWide ? 34 : 28, left:"7%", right:"7%", height:1, background:"linear-gradient(90deg, transparent, rgba(255,60,31,0.2), rgba(255,60,31,0.2), transparent)" }} />
              )}
              {processSteps.map((s, i) => (
                <div key={i} style={{ padding: isMobile ? "0 0 24px 0" : isWide ? "0 32px" : "0 20px", position:"relative" }}>
                  {isMobile && <div style={{ position:"absolute", left:-25, top:12, width:8, height:8, borderRadius:"50%", background:"#ff3c1f", boxShadow:"0 0 8px rgba(255,60,31,0.3)" }} />}
                  <div style={{
                    width: isMobile ? 36 : isWide ? 64 : 52, height: isMobile ? 36 : isWide ? 64 : 52,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:"#0a0a0f", border:"1px solid rgba(255,255,255,0.06)",
                    fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? ".95rem" : isWide ? "1.6rem" : "1.3rem",
                    color:"#ff3c1f", marginBottom: isMobile ? 10 : isWide ? 32 : 24, position:"relative", zIndex:1,
                  }}>{s.num}</div>
                  <h3 style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".85rem" : isWide ? "1.15rem" : "1rem", fontWeight:700, letterSpacing:.5, marginBottom: isMobile ? 6 : isWide ? 14 : 10 }}>{s.title}</h3>
                  <p style={{ fontSize: isMobile ? ".78rem" : isWide ? ".98rem" : ".88rem", lineHeight:1.65, color:"#8a8a9a" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <Container>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{
                padding: isMobile ? "24px 8px" : isTablet ? "44px 20px" : isWide ? 80 : 60, textAlign:"center",
                borderRight: (isMobile ? (i % 2 === 0) : (i < 3)) ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition:"background .3s",
              }}
                onMouseEnter={e => { if(isDesktop) e.currentTarget.style.background="rgba(255,60,31,0.03)"; }}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? "2rem" : is4K ? "5rem" : isWide ? "4.5rem" : "3.8rem", background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>{s.big}</div>
                <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".5rem" : isWide ? ".8rem" : ".7rem", fontWeight:600, letterSpacing: isMobile ? 1 : isWide ? 3 : 2, textTransform:"uppercase", color:"#5a5a6a", marginTop: isWide ? 10 : 4 }}>{s.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" style={{ padding:`${sectionVPad}px ${pad}px`, position:"relative", overflow:"hidden", ...wrapStyle }}>
        <div style={{ position:"absolute", top:-200, right:-200, width: isWide ? 900 : 600, height: isWide ? 900 : 600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,60,31,0.04),transparent 70%)" }} />
        <Container style={{ position:"relative", zIndex:2 }}>
          <FadeUp><div style={labelStyle}><span style={{ width: isWide ? 36 : 20, height:1, background:"#ff3c1f", display:"inline-block" }} />Client Stories</div></FadeUp>
          <FadeUp delay={0.1}><h2 style={headingStyle}>What Partners Say</h2></FadeUp>
          <FadeUp delay={0.12}><p style={descStyle}>Lasting partnerships with the world's leading game developers and publishers.</p></FadeUp>

          {isMobile ? (
            <FadeUp delay={0.15}>
              <div className="no-scrollbar" style={{
                display:"flex", gap:10, overflowX:"auto",
                margin:`0 -${pad}px`, padding:`0 ${pad}px 12px`,
                WebkitOverflowScrolling:"touch", scrollSnapType:"x mandatory",
              }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{
                    background:"#14141f", padding:"20px 16px",
                    border:"1px solid rgba(255,255,255,0.06)",
                    minWidth:`calc(100vw - ${pad * 2 + 12}px)`, flexShrink:0, scrollSnapAlign:"start",
                  }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.2rem", color:"rgba(255,60,31,0.12)", lineHeight:.8, marginBottom:8 }}>"</div>
                    <blockquote style={{ fontSize:".78rem", lineHeight:1.6, color:"#8a8a9a", fontStyle:"italic", marginBottom:14, border:"none", padding:0 }}>{t.quote}</blockquote>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize:".7rem", fontWeight:700, letterSpacing:1 }}>{t.author}</div>
                    <div style={{ fontSize:".62rem", color:"#5a5a6a", marginTop:2 }}>{t.role}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:4, justifyContent:"center", marginTop:10 }}>
                {testimonials.map((_, i) => (
                  <div key={i} style={{ width:5, height:5, borderRadius:"50%", background: i===0 ? "#ff3c1f" : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.15}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap: isWide ? 4 : 3 }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{
                    background:"#14141f", padding: isTablet ? 32 : isWide ? 60 : 48,
                    border:"1px solid rgba(255,255,255,0.06)", transition:"border-color .3s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,60,31,0.15)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isWide ? "6rem" : "5rem", color:"rgba(255,60,31,0.12)", lineHeight:.8, marginBottom: isWide ? 20 : 16 }}>"</div>
                    <blockquote style={{ fontSize: isWide ? "1.1rem" : "1rem", lineHeight:1.75, color:"#8a8a9a", fontStyle:"italic", marginBottom: isWide ? 32 : 24, border:"none", padding:0 }}>{t.quote}</blockquote>
                    <div style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".88rem" : ".8rem", fontWeight:700, letterSpacing:1 }}>{t.author}</div>
                    <div style={{ fontSize: isWide ? ".82rem" : ".75rem", color:"#5a5a6a", marginTop:4 }}>{t.role}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" style={{
        textAlign:"center", position:"relative", overflow:"hidden", background:"#101018",
        padding:`${isMobile ? 64 : isWide ? 180 : 140}px ${pad}px`, ...wrapStyle,
      }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,60,31,0.06) 0%, transparent 70%)" }} />
        <Container style={{ position:"relative", zIndex:2 }}>
          <FadeUp><div style={{ ...labelStyle, justifyContent:"center" }}>Let's Create Together</div></FadeUp>
          <FadeUp delay={0.1}><h2 style={{ ...headingStyle, marginBottom: isWide ? 20 : 14 }}>Ready to Start<br />Your Next Project?</h2></FadeUp>
          <FadeUp delay={0.12}><p style={{ fontSize: isMobile ? ".88rem" : isWide ? "1.15rem" : "1.05rem", lineHeight:1.7, color:"#8a8a9a", maxWidth: isWide ? 600 : 500, margin:`0 auto ${isMobile ? 28 : isWide ? 56 : 48}px` }}>Whether you need a full art team or specialized support, we'll bring your vision to life with world-class quality.</p></FadeUp>
          <FadeUp delay={0.15}>
            <button onClick={() => scrollTo("contact")} style={{
              fontFamily:"'Exo 2',sans-serif", fontSize: isWide ? ".85rem" : ".78rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase",
              padding: isMobile ? "14px 32px" : isWide ? "20px 52px" : "16px 40px",
              background:"linear-gradient(135deg,#ff3c1f,#ff6b1a)", color:"#fff", border:"none", cursor:"pointer",
              width: isMobile ? "100%" : "auto", maxWidth:300, transition:"all .3s",
            }}
              onMouseEnter={e => { if(isDesktop){ e.target.style.transform="translateY(-2px)"; e.target.style.boxShadow="0 8px 30px rgba(255,60,31,0.35)"; }}}
              onMouseLeave={e => { e.target.style.transform="translateY(0)"; e.target.style.boxShadow="none"; }}>
              Contact Us
            </button>
          </FadeUp>
        </Container>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding:`${isMobile ? 32 : isWide ? 100 : 80}px ${pad}px ${isMobile ? 16 : isWide ? 48 : 40}px`, borderTop:"1px solid rgba(255,255,255,0.06)", ...wrapStyle }}>
        <Container>
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: isMobile ? "20px 12px" : isWide ? 80 : 60,
            marginBottom: isMobile ? 24 : isWide ? 80 : 60,
          }}>
            <div style={{ gridColumn: isMobile ? "span 2" : isTablet ? "span 2" : "auto" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isMobile ? ".9rem" : isWide ? "1.8rem" : "1.5rem", letterSpacing: isWide ? 3 : 1.5, marginBottom: isWide ? 16 : 8, display:"flex", alignItems:"center", gap: isWide ? 12 : 6 }}>
                <span style={{ width: isWide ? 10 : 6, height: isWide ? 10 : 6, background:"#ff3c1f", borderRadius:"50%", display:"inline-block", flexShrink:0 }} />
                BEAST GAMES{!isMobile && " INTERACTIVE"}
              </div>
              <p style={{ fontSize: isMobile ? ".72rem" : isWide ? ".95rem" : ".85rem", lineHeight:1.65, color:"#8a8a9a", maxWidth: isWide ? 400 : 320 }}>
                {isMobile
                  ? "International art production and game development studio. Exceptional 2D and 3D game art for all platforms."
                  : "An international art production and game development studio providing end-to-end external services worldwide. Producing exceptional 2D and 3D game art for PC, console, and mobile platforms."
                }
              </p>
            </div>
            {[
              { title: "Services", items: ["Concept Art","3D Characters","Environments","Animation & VFX","UI/UX Design","Game Trailers"] },
              { title: "Company", items: ["About Us","Portfolio","Careers","News","Contact"] },
              ...(!isMobile ? [{ title: "Platforms", items: ["PC / Steam","PlayStation","Xbox","Nintendo Switch","iOS & Android","VR"] }] : []),
            ].map((col, ci) => (
              <div key={ci}>
                <h4 style={{ fontFamily:"'Exo 2',sans-serif", fontSize: isMobile ? ".55rem" : isWide ? ".75rem" : ".65rem", fontWeight:700, letterSpacing: isWide ? 3 : 2, textTransform:"uppercase", color:"#5a5a6a", marginBottom: isMobile ? 8 : isWide ? 28 : 20 }}>{col.title}</h4>
                <ul style={{ listStyle:"none", padding:0 }}>
                  {col.items.map((item, ii) => (
                    <li key={ii} style={{ marginBottom: isMobile ? 6 : isWide ? 16 : 12 }}>
                      <a href="#" style={{ fontSize: isMobile ? ".7rem" : isWide ? ".95rem" : ".85rem", color:"#8a8a9a", textDecoration:"none", transition:"color .3s" }}
                        onMouseEnter={e => e.target.style.color="#ff3c1f"} onMouseLeave={e => e.target.style.color="#8a8a9a"}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            display:"flex", flexDirection: isMobile ? "column" : "row",
            justifyContent:"space-between", alignItems: isMobile ? "flex-start" : "center",
            paddingTop: isMobile ? 14 : isWide ? 40 : 32, borderTop:"1px solid rgba(255,255,255,0.06)",
            fontSize: isMobile ? ".58rem" : isWide ? ".85rem" : ".78rem", color:"#5a5a6a", gap: isWide ? 8 : 4,
          }}>
            <span>© 2026 Beast Games Interactive. All rights reserved.</span>
            <span>Privacy Policy · Terms of Service · Cookie Policy</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}