"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import UnlockComponent from "@/components/UnlockComponent";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const CEO = {
  name: "Hassan Shayan",
  role: "Chief Executive Officer",
  roleShort: "CEO",
  img: "/team/HassanShayan.png.jpeg",
  bio: [
    "I am the CEO of Aptura Tech Solution and a dedicated technology enthusiast with strong expertise in Web Development and Flutter App Development. With a solid command of programming languages including C++ and Python, I have successfully completed multiple internships with reputable software companies.",
    "As a tech leader, I am passionate about innovation, problem-solving, and building impactful digital solutions. I continuously strive to grow with modern technologies and lead my team towards delivering high-quality software products.",
  ],
  skills: [
    "Leadership & Team Management",
    "Web Development",
    "Flutter App Development",
    "Python & C++",
    "Innovation Strategy",
    "Problem Solving",
  ],
};

const LEADERSHIP = [
  {
    name: "Muhammad Hammad Ikram",
    role: "Co-Founder & Chief Technology Officer",
    roleShort: "CTO",
    img: "/team/MuhammadHammadIkram.png.jpeg",
    bio: "Co-Founder and CTO of Aptura Tech Company — a detail-oriented technology professional with expertise in Python, C, C++, networking, and graphic designing. Leads technical strategy, oversees development processes, and ensures delivery of innovative, secure digital solutions.",
    skills: [
      "Technology Leadership",
      "Python / C / C++",
      "Graphic Designing",
      "Networking",
      "Social Media Management",
      "Cybersecurity (In Progress)",
    ],
    accentColor: "teal",
  },
  {
    name: "Naqsheen Qazi",
    role: "Chief Operating Officer",
    roleShort: "COO",
    img: "/team/NaqsheenQazi.png.jpeg",
    bio: "COO of Aptura Tech Solution — a motivated and versatile technology enthusiast with experience in Web Development, Video Editing, and Programming. Completed an internship with Arch Technology and is actively expanding expertise in Cybersecurity.",
    skills: [
      "Operations Management",
      "Web Development",
      "Video Editing",
      "Python & C++",
      "Digital Content Creation",
      "Cybersecurity (In Progress)",
    ],
    accentColor: "gold",
  },
];

const TEAM = [
  {
    name: "Allah Yar Durrani",
    role: "Frontend Developer",
    img: "/team/AllahYarDurrani.png.jpeg",
    imgPos: "object-center",
    bio: "Brings websites to life with clean code and a keen eye for user-friendly design. Skilled in HTML, CSS, and JavaScript. Completed an internship at Code Alpha in frontend development — delivering standout projects that clients love.",
    skills: ["HTML / CSS", "JavaScript", "UI Design", "Frontend Dev"],
  },
  {
    name: "Abyan Ud Din",
    role: "Head of Community",
    img: "/team/Abayan.png.jpeg",
    imgPos: "object-top",
    bio: "The vital bridge between Aptura's audience and its mission. Oversees WhatsApp community channels and spearheads events that bring users together. Driven by a passion for human connection and problem-solving.",
    skills: ["Community Building", "Event Management", "Engagement Strategy", "Leadership"],
  },
  {
    name: "Muhammad Khan",
    role: "Graphic Designer",
    img: "/team/MuhmmadKhan.png.jpeg",
    imgPos: "object-top",
    bio: "Architect of Aptura's visual identity. From iconic logos to high-impact digital posters, he ensures every pixel aligns with the brand's mission — transforming complex ideas into stunning, memorable designs.",
    skills: ["Logo Design", "Digital Posters", "Brand Identity", "Visual Storytelling"],
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
  "Innovation", "Web Development", "Flutter", "Python", "UI/UX Design",
  "Cybersecurity", "Community First", "Graphic Design", "Team Work",
  "C++ & Python", "Full Stack", "Agile Delivery", "Open Source", "Networking",
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
  const ceoRef = useRef(null);
  const leaderRef = useRef(null);
  const teamRef = useRef(null);
  const [ceoVisible, setCeoVisible] = useState(false);

  useEffect(() => {
    /* Hero text stagger */
    gsap.fromTo(
      heroRef.current?.querySelectorAll(".hero-anim"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out" }
    );

    /* CEO card reveal */
    const ceoCb = ScrollTrigger.create({
      trigger: ceoRef.current,
      start: "top 80%",
      onEnter: () => setCeoVisible(true),
    });

    /* Leadership cards slide in */
    gsap.fromTo(
      leaderRef.current?.querySelectorAll(".leader-anim"),
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, stagger: 0.2, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: leaderRef.current, start: "top 78%" },
      }
    );

    /* Team cards stagger */
    gsap.fromTo(
      teamRef.current?.querySelectorAll(".team-anim"),
      { opacity: 0, scale: 0.92, y: 40 },
      {
        opacity: 1, scale: 1, y: 0, stagger: 0.18, duration: 0.75, ease: "back.out(1.4)",
        scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
      }
    );

    return () => { ceoCb.kill(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="float-orb absolute top-1/4 left-1/5 w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #008080 0%, transparent 70%)" }} />
          <div className="float-orb-alt absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c4956a 0%, transparent 70%)" }} />
          <div className="grid-overlay absolute inset-0 opacity-50" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Label */}
          <div className="hero-anim inline-flex items-center gap-2 rank-tag rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008080] inline-block animate-pulse" />
            MEET THE TEAM
          </div>

          {/* Heading */}
          <h1 className="hero-anim text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}>
            The Minds{" "}
            <span
              className="gradient-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Behind CodeVelvet
            </span>
          </h1>

          <p className="hero-anim text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A team of visionaries, builders, and creators engineering the future of digital technology — one breakthrough at a time.
          </p>

          {/* Divider */}
          <div className="hero-anim team-divider w-40 mx-auto mt-10 rounded-full" />
        </div>
      </section>

      {/* ════════════════════ CEO SPOTLIGHT ════════════════════ */}
      <section ref={ceoRef} className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="rank-tag rounded-full px-3 py-1">01</span>
            <span className="text-[#94a3b8] text-sm tracking-[0.2em] uppercase">Leadership</span>
            <div className="team-divider flex-1" />
          </div>

          {/* CEO mega card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={ceoVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Outer glow ring — conic animated border */}
            <div className="ceo-card-glow absolute inset-0 rounded-3xl" aria-hidden="true" />

            {/* Inner content surface */}
            <div className="relative m-[2px] rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0a0e17 0%, #050507 60%, #080d14 100%)" }}>

              {/* Decorative bg inside card */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="float-orb absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15"
                  style={{ background: "radial-gradient(circle, #008080, transparent 70%)" }} />
                <div className="float-orb-alt absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #c4956a, transparent 70%)" }} />
                <div className="grid-overlay absolute inset-0 opacity-30" />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* ── Left: Photo column ── */}
                <div className="relative flex flex-col items-center justify-center p-10 lg:p-16
                  lg:border-r lg:border-white/5">
                  {/* Rank label */}
                  <div className="absolute top-8 left-8">
                    <span className="rank-tag rounded-lg px-2 py-1 font-mono text-[10px]">
                      #001 ◆ FOUNDER
                    </span>
                  </div>

                  {/* Photo */}
                  <div className="relative mt-8 lg:mt-0">
                    {/* Outer pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(0,128,128,0.3), transparent 70%)" }}
                    />
                    <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden photo-ring-teal">
                      <Image
                        src={CEO.img}
                        alt={CEO.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 224px, 288px"
                      />
                      {/* Photo overlay gradient */}
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(5,5,7,0.4) 0%, transparent 50%)" }} />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap
                        rounded-2xl px-5 py-2 text-sm font-bold tracking-wide
                        border border-[#008080]/40"
                      style={{
                        background: "rgba(0,128,128,0.18)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        boxShadow: "0 0 24px rgba(0,128,128,0.3)",
                      }}
                    >
                      <span className="holo-badge">{CEO.roleShort}</span>
                    </motion.div>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-8 mt-14">
                    {[["Multi", "Internships"], ["C++ & Python", "Languages"], ["Flutter + Web", "Expertise"]].map(([val, lbl]) => (
                      <div key={lbl} className="text-center">
                        <div className="text-[#f4e1c1] font-bold text-lg leading-none">{val}</div>
                        <div className="text-[#94a3b8] text-[10px] mt-1 tracking-wider uppercase">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: Info column ── */}
                <div className="flex flex-col justify-center p-10 lg:p-14">
                  {/* Role chip */}
                  <div className="inline-flex items-center gap-2 mb-4 w-fit
                    rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase"
                    style={{
                      background: "rgba(0,128,128,0.12)",
                      border: "1px solid rgba(0,128,128,0.35)",
                      color: "#5f9ea0",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
                    {CEO.role}
                  </div>

                  {/* Name */}
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}>
                    {CEO.name}
                  </h2>

                  {/* Bio */}
                  <div className="space-y-3 mb-8">
                    {CEO.bio.map((para, i) => (
                      <p key={i} className="text-[#94a3b8] text-sm md:text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="team-divider mb-8 w-full" />

                  {/* Skills */}
                  <div>
                    <p className="text-[#94a3b8] text-xs tracking-[0.2em] uppercase mb-3">
                      Key Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CEO.skills.map((s) => (
                        <SkillPill key={s} label={s} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ LEADERSHIP ════════════════════ */}
      <section ref={leaderRef} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <span className="rank-tag rounded-full px-3 py-1">02</span>
            <span className="text-[#94a3b8] text-sm tracking-[0.2em] uppercase">Executive Leadership</span>
            <div className="team-divider flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP.map((person, idx) => {
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
                          {/* Role badge */}
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

                      {/* Divider */}
                      <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />

                      {/* Bio */}
                      <p className="text-[#94a3b8] text-sm leading-relaxed flex-1 mb-6">
                        {person.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {person.skills.map((s) => (
                          <span key={s} className="skill-pill rounded-full px-3 py-1 text-xs font-medium text-[#94a3b8]">
                            {s}
                          </span>
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
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <MarqueeTicker />
        </div>
      </div>

      {/* ════════════════════ TEAM MEMBERS ════════════════════ */}
      <section ref={teamRef} className="py-16 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <span className="rank-tag rounded-full px-3 py-1">03</span>
            <span className="text-[#94a3b8] text-sm tracking-[0.2em] uppercase">Our Crew</span>
            <div className="team-divider flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((person, idx) => (
              <TiltCard key={person.name}>
                <div className="team-anim team-card rounded-2xl overflow-hidden h-full group">
                  {/* Photo header */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className={`object-cover ${person.imgPos} transition-transform duration-700 group-hover:scale-105`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Base gradient */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, #050507 0%, rgba(5,5,7,0.5) 40%, transparent 70%)" }} />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-3
                      translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-400 ease-out"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,128,128,0.35) 60%, transparent 100%)" }}
                    >
                      <p className="text-white/70 text-[10px] font-mono tracking-[0.2em] uppercase">{person.role}</p>
                    </div>

                    {/* Index tag */}
                    <div className="absolute top-4 left-4">
                      <span className="rank-tag rounded-md px-2 py-0.5 font-mono">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Role chip */}
                    <span className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold
                      tracking-[0.15em] uppercase mb-2 text-[#c4956a]"
                      style={{ background: "rgba(196,149,106,0.12)", border: "1px solid rgba(196,149,106,0.3)" }}>
                      {person.role}
                    </span>

                    {/* Name */}
                    <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight"
                      style={{ fontFamily: "var(--font-heading)" }}>
                      {person.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 line-clamp-3">
                      {person.bio}
                    </p>

                    {/* Divider */}
                    <div className="team-divider mb-4" />

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((s) => (
                        <SkillPill key={s} label={s} />
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <UnlockComponent />
    </>
  );
}
