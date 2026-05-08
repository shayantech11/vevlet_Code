"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroPic = () => {
  const btnRef = useRef(null);
  const lineRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const shimmerRef = useRef(null);
  const marqueeRef = useRef(null);

  /* Magnetic button effect */
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translate(0, 0)";
    }
  };

  /* ═══ GSAP cinematic sequence ═══ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      /* 1 — Decorative line draws from left */
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          0,
        );
      }

      /* 2 — Headline words: clip-reveal slide-up from behind overflow mask */
      const words = headlineRef.current?.querySelectorAll(".word-inner");
      if (words?.length) {
        tl.fromTo(
          words,
          { yPercent: 120, rotateX: -10 },
          {
            yPercent: 0,
            rotateX: 0,
            duration: 1.3,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.25,
        );
      }

      /* 3 — Shimmer sweep across gradient text */
      if (shimmerRef.current) {
        tl.fromTo(
          shimmerRef.current,
          { xPercent: -100 },
          {
            xPercent: 200,
            duration: 1.2,
            ease: "power2.inOut",
          },
          1.4,
        );
      }

      /* 4 — Subtitle words: blur-to-sharp reveal, one by one */
      const subWords = subtitleRef.current?.querySelectorAll(".sub-word");
      if (subWords?.length) {
        tl.fromTo(
          subWords,
          { autoAlpha: 0, y: 14, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.025,
            ease: "power2.out",
          },
          1.2,
        );
      }

      /* 5 — CTA buttons rise up */
      const buttons = ctaRef.current?.querySelectorAll(".cta-btn");
      if (buttons?.length) {
        tl.fromTo(
          buttons,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      /* 6 — Marquee fades in last */
      if (marqueeRef.current) {
        tl.fromTo(
          marqueeRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8, ease: "power1.out" },
          "-=0.3",
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const subtitleText =
    "Transforming complex data and logic into seamless, high-performance digital experiences.";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fullscreen video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="/heroVideo.mp4" type="video/mp4" />
      </video>

      {/* Very light uniform darkening so the video pops */}
      <div className="absolute inset-0" style={{ background: "rgba(5,5,7,0.28)" }} />

      {/* Heavy fade only at the bottom third where text lives */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[70%] md:h-[55%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.88) 30%, rgba(5,5,7,0.5) 55%, transparent 100%)",
        }}
      />

      {/* Top nav fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,7,0.7) 0%, transparent 100%)" }}
      />

      {/* ═══ Content ═══ */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-6 sm:pb-10 md:pb-20">
        <div className="max-w-6xl mx-auto w-full">

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-bold tracking-tight leading-[1.05] text-white"
            style={{ fontSize: "clamp(1.9rem,6vw,5.5rem)", perspective: "800px" }}
          >
            <span className="inline-block overflow-hidden mr-[0.22em] align-bottom pb-[0.28em]">
              <span className="word-inner inline-block will-change-transform">Intelligence,</span>
            </span>
            <span className="relative inline-block overflow-hidden align-bottom pb-[0.28em]">
              <span className="word-inner inline-block gradient-text will-change-transform">Engineered.</span>
              <span
                ref={shimmerRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg,transparent 30%,rgba(244,225,193,0.3) 45%,rgba(255,255,255,0.2) 50%,rgba(244,225,193,0.3) 55%,transparent 70%)",
                  mixBlendMode: "screen",
                }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="max-w-lg mt-2 sm:mt-4 leading-relaxed"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            {subtitleText.split(" ").map((word, i) => (
              <span
                key={i}
                className="sub-word inline-block text-white/60 text-sm sm:text-base md:text-[1.05rem] mr-[0.28em] will-change-transform"
                style={{ visibility: "hidden" }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 mt-4 sm:mt-6 md:mt-8">
            <Link
              href="/contact"
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="cta-btn group relative overflow-hidden px-8 py-3.5 font-heading font-semibold text-[#050507] text-sm rounded-xl glow-btn transition-all duration-300"
              style={{ background: "#f4e1c1", visibility: "hidden" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Let&apos;s Talk
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>

            <Link
              href="/about"
              className="cta-btn flex items-center gap-2 px-8 py-3.5 font-heading font-medium text-white/85 text-sm rounded-xl transition-all duration-300 hover:text-white hover:border-[#008080]/50"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", visibility: "hidden" }}
            >
              Explore Our Work
            </Link>
          </div>

          {/* Stat pills row */}
          <div ref={marqueeRef} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-5 md:mt-8" style={{ visibility: "hidden" }}>
            {[
              ["10+", "Projects"],
              ["7", "Team Members"],
              ["100%", "Client Retention"],
              ["20+", "Tech Stacks"],
            ].map(([num, lbl]) => (
              <div
                key={lbl}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="font-heading font-bold text-[#f4e1c1] text-sm">{num}</span>
                <span className="text-white/40 text-xs font-mono tracking-wider uppercase">{lbl}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroPic;
