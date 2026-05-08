"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import UnlockComponent from "@/components/UnlockComponent";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const LEADERSHIP = [
  {
    name: "Muzamil Shiraz",
    role: "Founder & Lead Software Architect",
    roleShort: "Founder",
    img: "/team/muzamil.png.jpeg",
    bio: "The MERN stack powerhouse behind CodeVelvet. Muzamil architects the systems, handles complex backend deployments, and steps into client meetings to close the deals. As the technical authority of the agency, he ensures every solution is built to scale, perform, and last.",
    skills: [
      "MERN Stack",
      "System Architecture",
      "Backend Deployments",
      "Technical Leadership",
      "Client Strategy",
      "Full Stack Development",
    ],
    accentColor: "teal",
  },
  {
    name: "Muhammad Shayan Younas",
    role: "Co founder & Lead Frontend Engineer",
    roleShort: "Co founder & Frontend Lead",
    img: "/team/shayan.png.jpeg",
    bio: "The craftsman behind every pixel of CodeVelvet's digital presence. Shani owns the Next.js codebase, manages the repository, and ensures every client-facing interface is fast, beautiful, and conversion-focused. He is the dedicated expert ensuring platforms look and feel world-class.",
    skills: [
      "Next.js & React",
      "UI/UX Implementation",
      "Repository Management",
      "Performance Optimization",
      "Responsive Design",
      "Component Architecture",
    ],
    accentColor: "gold",
  },
  {
    name: "Mujeeb UR Rehman",
    role: "Co founder & Director of Business Development",
    roleShort: "Co founder & Biz Dev",
    img: "/team/mujeebb.png.jpeg",
    bio: "Mujeeb is on the frontline of CodeVelvet's growth. He hunts the leads, manages outreach, and sets up the initial calls that turn prospects into long-term partners. His Director-level presence instantly establishes credibility with CEOs and business owners from the first conversation.",
    skills: [
      "Lead Generation",
      "Client Outreach",
      "Deal Closing",
      "Relationship Management",
      "Sales Strategy",
      "Business Growth",
    ],
    accentColor: "teal",
  },
  {
    name: " Abdul Rafhay Hussain",
    role: "Co founder & Growth Strategist",
    roleShort: "Co founder & Growth",
    img: "/team/rafhay.png.jpeg",
    bio: "Rafhay drives the hustle that keeps CodeVelvet's pipeline full. From pulling Apollo.io prospect lists to firing off targeted LinkedIn outreach, he is the engine behind the agency's client acquisition machine — analytical, aggressive, and always closing.",
    skills: [
      "Apollo.io & LinkedIn Outreach",
      "Client Acquisition",
      "Growth Hacking",
      "Pipeline Management",
      "Market Research",
      "Campaign Strategy",
    ],
    accentColor: "gold",
  },
];

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 28 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 28 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotY.set(dx * 9);
    rotX.set(-dy * 9);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Marquee Ticker ─── */
const TICKER = [
  "MERN Stack", "Next.js", "System Architecture", "Lead Generation", "UI/UX",
  "Business Development", "Full Stack", "Client Acquisition", "React", "Growth Strategy",
  "Backend Deployments", "Frontend Engineering", "Apollo.io", "Agile Delivery", "Scale",
];

function MarqueeTicker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative py-5 overflow-hidden border-y border-white/[0.05] my-4">
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "linear-gradient(90deg, #050507 0%, transparent 12%, transparent 88%, #050507 100%)" }} />
      <div className="flex animate-marquee gap-0 w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-5 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: i % 3 === 0 ? "#008080" : i % 3 === 1 ? "#c4956a" : "#5f9ea0" }} />
            <span className="text-[#94a3b8]/50 text-[11px] font-mono tracking-[0.18em] uppercase">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Skill Pill ─── */
function SkillPill({ label }) {
  return (
    <span className="skill-pill rounded-full px-3 py-1 text-xs font-medium text-[#94a3b8]">
      {label}
    </span>
  );
}

/* ─── Main Component ─── */
export default function TeamPage() {
  const heroRef = useRef(null);
  const leaderRef = useRef(null);

  useEffect(() => {
    /* Hero text stagger */
    gsap.fromTo(
      heroRef.current?.querySelectorAll(".hero-anim"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out" }
    );

    /* Leadership cards slide in */
    gsap.fromTo(
      leaderRef.current?.querySelectorAll(".leader-anim"),
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: leaderRef.current, start: "top 78%" },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="float-orb absolute top-1/4 left-1/5 w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #008080 0%, transparent 70%)" }} />
          <div className="float-orb-alt absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c4956a 0%, transparent 70%)" }} />
          <div className="grid-overlay absolute inset-0 opacity-50" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="hero-anim inline-flex items-center gap-2 rank-tag rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008080] inline-block animate-pulse" />
            MEET THE TEAM
          </div>

          <h1 className="hero-anim text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}>
            The Minds{" "}
            <span className="gradient-text" style={{ fontFamily: "var(--font-heading)" }}>
              Behind CodeVelvet
            </span>
          </h1>

          <p className="hero-anim text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A team of builders, strategists, and engineers driving real results — one client at a time.
          </p>

          <div className="hero-anim team-divider w-40 mx-auto mt-10 rounded-full" />
        </div>
      </section>

      {/* ════════════════════ TEAM GRID ════════════════════ */}
      <section ref={leaderRef} className="py-16 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="rank-tag rounded-full px-3 py-1">01</span>
            <span className="text-[#94a3b8] text-sm tracking-[0.2em] uppercase">The Core Team</span>
            <div className="team-divider flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP.map((person) => {
              const isTeal = person.accentColor === "teal";
              const accent = isTeal ? "#008080" : "#c4956a";
              const accentLight = isTeal ? "rgba(0,128,128,0.18)" : "rgba(196,149,106,0.12)";
              const ringClass = isTeal ? "photo-ring-teal" : "photo-ring-gold";
              return (
                <TiltCard key={person.name}>
                  <div className="leader-anim leader-card rounded-2xl overflow-hidden h-full">
                    <div className="p-8 md:p-10 flex flex-col h-full">
                      {/* Top: photo + name block */}
                      <div className="flex items-start gap-5 mb-6">
                        <div className={`relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ${ringClass}`}>
                          <Image
                            src={person.img}
                            alt={person.name}
                            fill
                            className="object-cover object-center"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                            style={{ background: accentLight, color: accent, border: `1px solid ${accent}50` }}
                          >
                            {person.roleShort}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}>
                            {person.name}
                          </h3>
                          <p className="text-[#94a3b8] text-xs mt-1 leading-relaxed">{person.role}</p>
                        </div>
                      </div>

                      <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />

                      <p className="text-[#94a3b8] text-sm leading-relaxed flex-1 mb-6">
                        {person.bio}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {person.skills.map((s) => (
                          <SkillPill key={s} label={s} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ MARQUEE TICKER ════════════════════ */}
      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <MarqueeTicker />
        </div>
      </div>

      <UnlockComponent />
    </>
  );
}
