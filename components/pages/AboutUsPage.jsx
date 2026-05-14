"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";
import UnlockComponent from "@/components/UnlockComponent";
import ServicesMain from "@/components/services/ServicesMain";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const values = [
  {
    icon: <FaBolt />,
    title: "Engineering Excellence",
    description:
      "We write code that lasts. Clean architecture, rigorous testing, and performance-first thinking in every line.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation-Driven",
    description:
      "We don\u2019t follow trends \u2014 we study them, then build something better. AI, IoT, and next-gen frameworks are our playground.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security by Default",
    description:
      "Zero-trust architecture, encrypted pipelines, and proactive threat modeling baked into every project from day one.",
  },
  {
    icon: <FaUsers />,
    title: "User-Centric Design",
    description:
      "Every pixel serves a purpose. We design for humans first \u2014 intuitive, accessible, and built to convert.",
  },
  {
    icon: <FaRocket />,
    title: "Ship Fast, Ship Right",
    description:
      "Agile sprints, CI/CD pipelines, and rapid iteration. We move with urgency without sacrificing quality.",
  },
  {
    icon: <FaHandshake />,
    title: "Radical Transparency",
    description:
      "No black boxes. Real-time dashboards, weekly demos, and honest communication at every stage of delivery.",
  },
];

const stats = [
  { num: 10, suffix: "+", label: "Projects Shipped" },
  { num: 20, suffix: "+", label: "Technologies Mastered" },
  { num: 10, suffix: "+", label: "Engineers & Designers" },
  { num: 99, suffix: "%", label: "Client Satisfaction" },
];

const timeline = [
  {
    year: "Founded",
    title: "The Beginning",
    description:
      "VEVLET was born from a simple idea \u2014 build technology that actually works for the people using it. No bloat, no shortcuts.",
  },
  {
    year: "Growth",
    title: "Expanding Horizons",
    description:
      "Grew from a small team to a full-stack engineering force covering web, mobile, AI, cybersecurity, design, and IoT.",
  },
  {
    year: "Today",
    title: "Engineering the Future",
    description:
      "Operating from Islamabad and Peshawar, delivering production-grade software to ambitious businesses across industries.",
  },
];

/* ── Component ── */
export default function AboutUsPage() {
  /* ── Refs ── */
  const heroRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroDescRef = useRef(null);

  const timelineSectionRef = useRef(null);
  const timelineLabelRef = useRef(null);
  const timelineHeadingRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const timelineDotsRef = useRef([]);

  const valuesSectionRef = useRef(null);
  const valuesLabelRef = useRef(null);
  const valuesHeadingRef = useRef(null);
  const valueCardsRef = useRef([]);

  const statsSectionRef = useRef(null);
  const statNumberRefs = useRef([]);
  const statItemRefs = useRef([]);

  const missionSectionRef = useRef(null);
  const missionLabelRef = useRef(null);
  const missionQuoteRef = useRef(null);
  const missionDescRef = useRef(null);

  const [hoveredCard, setHoveredCard] = useState(null);

  /* ═══════════════ GSAP Animations ═══════════════ */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* ── HERO ── */
        const heroLabel = heroLabelRef.current;
        const heroHeading = heroHeadingRef.current;
        const heroDesc = heroDescRef.current;

        if (heroLabel) {
          gsap.set(heroLabel, { autoAlpha: 0, y: 20 });
          gsap.to(heroLabel, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
          });
        }

        if (heroHeading) {
          const words = heroHeading.querySelectorAll(".hero-word");
          if (words.length) {
            gsap.set(words, { autoAlpha: 0, y: 55, rotateX: -20 });
            gsap.to(words, {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              stagger: 0.09,
              ease: "back.out(1.6)",
              delay: 0.4,
            });
          }
        }

        if (heroDesc) {
          gsap.set(heroDesc, { autoAlpha: 0, y: 25 });
          gsap.to(heroDesc, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          });
        }

        /* ── TIMELINE SECTION ── */
        if (timelineLabelRef.current) {
          gsap.set(timelineLabelRef.current, { autoAlpha: 0, x: -30 });
          gsap.to(timelineLabelRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineSectionRef.current,
              start: "top 75%",
            },
          });
        }

        if (timelineHeadingRef.current) {
          gsap.set(timelineHeadingRef.current, { autoAlpha: 0, y: 30 });
          gsap.to(timelineHeadingRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineSectionRef.current,
              start: "top 70%",
            },
          });
        }

        /* Vertical line draws as you scroll */
        const line = timelineLineRef.current;
        if (line) {
          gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
          gsap.to(line, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineSectionRef.current,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          });
        }

        /* Timeline items slide in */
        const timelineItems = timelineItemsRef.current.filter(Boolean);
        timelineItems.forEach((item) => {
          gsap.set(item, { autoAlpha: 0, x: -50, scale: 0.95 });
          gsap.to(item, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          });
        });

        /* Timeline dots pop in */
        const dots = timelineDotsRef.current.filter(Boolean);
        dots.forEach((dot) => {
          gsap.set(dot, { scale: 0 });
          gsap.to(dot, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: { trigger: dot, start: "top 78%" },
          });
        });

        /* ── VALUES SECTION ── */
        if (valuesLabelRef.current) {
          gsap.set(valuesLabelRef.current, { autoAlpha: 0, x: -30 });
          gsap.to(valuesLabelRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesSectionRef.current,
              start: "top 75%",
            },
          });
        }

        if (valuesHeadingRef.current) {
          gsap.set(valuesHeadingRef.current, { autoAlpha: 0, y: 30 });
          gsap.to(valuesHeadingRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesSectionRef.current,
              start: "top 70%",
            },
          });
        }

        /* Cards fly in with stagger + back easing */
        const cards = valueCardsRef.current.filter(Boolean);
        if (cards.length) {
          cards.forEach((card) => {
            gsap.set(card, { autoAlpha: 0, y: 80, scale: 0.88 });
          });
          ScrollTrigger.create({
            trigger: valuesSectionRef.current,
            start: "top 60%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.4)",
              });
            },
          });
        }

        /* ── STATS SECTION ── */
        const statItems = statItemRefs.current.filter(Boolean);
        if (statItems.length) {
          statItems.forEach((item) => {
            gsap.set(item, { autoAlpha: 0, y: 30 });
          });
        }

        ScrollTrigger.create({
          trigger: statsSectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            /* Fade in stat items */
            gsap.to(statItems, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });

            /* Counter animation */
            stats.forEach((stat, i) => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: stat.num,
                duration: 2.5,
                delay: i * 0.15,
                ease: "power2.out",
                onUpdate: () => {
                  const el = statNumberRefs.current[i];
                  if (el) el.textContent = Math.round(obj.val);
                },
              });
            });
          },
        });

        /* ── MISSION SECTION ── */
        if (missionLabelRef.current) {
          gsap.set(missionLabelRef.current, { autoAlpha: 0, y: 20 });
          gsap.to(missionLabelRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: missionSectionRef.current,
              start: "top 70%",
            },
          });
        }

        if (missionQuoteRef.current) {
          const words =
            missionQuoteRef.current.querySelectorAll(".mission-word");
          if (words.length) {
            gsap.set(words, { autoAlpha: 0.12 });
            gsap.to(words, {
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.04,
              ease: "power1.out",
              scrollTrigger: {
                trigger: missionSectionRef.current,
                start: "top 65%",
              },
            });
          }
        }

        if (missionDescRef.current) {
          gsap.set(missionDescRef.current, { autoAlpha: 0, y: 20 });
          gsap.to(missionDescRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: missionSectionRef.current,
              start: "top 65%",
            },
          });
        }

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, []);

  /* ── 3D tilt on value cards ── */
  const handleCardMouseMove = (e, idx) => {
    const card = valueCardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 14,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (idx) => {
    const card = valueCardsRef.current[idx];
    if (!card) return;
    setHoveredCard(null);
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  /* ── Mission quote word arrays ── */
  const missionLine1 =
    "\u201CTo create digital solutions that are fast, reliable, and genuinely useful \u2014".split(
      " ",
    );
  const missionLine2 = "built with care, for real users.\u201D".split(" ");

  return (
    <div className="bg-[#050507] min-h-screen">
      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-28 px-6 overflow-hidden"
      >
        {/* Background blobs */}
        <div
          className="absolute top-20 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,128,128,0.5) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,225,193,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Label */}
          <div
            ref={heroLabelRef}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#008080]/50" />
            <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
              About VEVLET
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#008080]/50" />
          </div>

          {/* Heading — word-by-word reveal */}
          <h1
            ref={heroHeadingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-8"
            style={{ perspective: "600px" }}
          >
            <span className="hero-word inline-block mr-[0.25em]">We</span>
            <span className="hero-word inline-block mr-[0.25em]">engineer</span>
            <span className="hero-word inline-block mr-[0.25em]">software</span>
            <br className="hidden md:block" />
            <span className="hero-word inline-block gradient-text">
              that&nbsp;matters
            </span>
          </h1>

          {/* Description */}
          <p
            ref={heroDescRef}
            className="text-[#94a3b8] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            VEVLET is a product-minded engineering studio. We
            design, build, and ship intelligent software &mdash; from AI systems
            to full-stack platforms &mdash; for businesses that refuse to settle.
          </p>
        </div>
      </section>

      {/* ═══ STORY / TIMELINE ═══ */}
      <section ref={timelineSectionRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div
              ref={timelineLabelRef}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-[#008080] to-transparent" />
              <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
                Our Story
              </span>
            </div>
            <h2
              ref={timelineHeadingRef}
              className="text-3xl md:text-4xl font-heading font-bold text-white max-w-xl"
            >
              From idea to engineering force
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* The drawing line */}
            <div
              ref={timelineLineRef}
              className="absolute left-[18px] top-0 bottom-0 w-px hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,128,128,0.5) 0%, rgba(0,128,128,0.25) 50%, rgba(0,128,128,0.08) 100%)",
              }}
            />

            <div className="flex flex-col gap-14">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    timelineItemsRef.current[i] = el;
                  }}
                  className="flex items-start gap-6 md:gap-10"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 w-[38px] flex flex-col items-center">
                    <div
                      ref={(el) => {
                        timelineDotsRef.current[i] = el;
                      }}
                      className="w-[12px] h-[12px] rounded-full bg-[#008080] shadow-[0_0_20px_rgba(0,128,128,0.5)]"
                    />
                  </div>

                  {/* Card */}
                  <div className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-7 flex-1 hover:border-[#008080]/15 transition-all duration-300 group cursor-default">
                    <span className="text-[#008080]/50 font-mono text-[11px] tracking-[0.2em] uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-white font-heading font-semibold text-xl mt-2 mb-3 group-hover:text-[#f4e1c1] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#94a3b8]/80 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section ref={valuesSectionRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div
              ref={valuesLabelRef}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-[#008080] to-transparent" />
              <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
                What Drives Us
              </span>
            </div>
            <h2
              ref={valuesHeadingRef}
              className="text-3xl md:text-4xl font-heading font-bold text-white max-w-xl"
            >
              Principles we build on
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            style={{ perspective: "1000px" }}
          >
            {values.map((val, i) => {
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    valueCardsRef.current[i] = el;
                  }}
                  className="group relative bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-7 hover:border-[#008080]/20 transition-all duration-300 overflow-hidden will-change-transform cursor-default"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseMove={(e) => {
                    setHoveredCard(i);
                    handleCardMouseMove(e, i);
                  }}
                  onMouseLeave={() => handleCardMouseLeave(i)}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 20% 80%, rgba(0,128,128,0.06) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#008080]/[0.06] border border-[#008080]/10 text-[#008080]/70 group-hover:text-[#008080] group-hover:border-[#008080]/25 group-hover:bg-[#008080]/[0.1] transition-all duration-300 text-base mb-5">
                      {val.icon}
                    </div>
                    <h3 className="text-white font-heading font-semibold text-[16px] mb-3 group-hover:text-[#f4e1c1] transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-[#94a3b8]/70 text-[13px] leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 10%, rgba(0,128,128,0.5) 50%, transparent 90%)",
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section ref={statsSectionRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-10 md:p-14 relative overflow-hidden">
            {/* Subtle glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-[0.04] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,128,128,0.8) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    statItemRefs.current[i] = el;
                  }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                    <span
                      ref={(el) => {
                        statNumberRefs.current[i] = el;
                      }}
                    >
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-[#94a3b8]/60 text-sm font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION ═══ */}
      <section ref={missionSectionRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div
            ref={missionLabelRef}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#008080]/50" />
            <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
              Our Mission
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#008080]/50" />
          </div>

          {/* Quote — word-by-word reveal */}
          <blockquote
            ref={missionQuoteRef}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-snug mb-8"
          >
            {missionLine1.map((word, i) => (
              <span
                key={i}
                className="mission-word inline-block text-white mr-[0.22em]"
              >
                {word}
              </span>
            ))}
            <br className="hidden md:block" />
            {missionLine2.map((word, i) => (
              <span
                key={`g-${i}`}
                className="mission-word inline-block gradient-text mr-[0.22em]"
              >
                {word}
              </span>
            ))}
          </blockquote>

          <p
            ref={missionDescRef}
            className="text-[#94a3b8]/70 text-base max-w-2xl mx-auto leading-relaxed"
          >
            We empower businesses by crafting technology that solves real
            problems and delivers meaningful impact &mdash; not just features,
            but outcomes that move the needle.
          </p>
        </div>
      </section>

      <ServicesMain />

      <UnlockComponent />
    </div>
  );
}
