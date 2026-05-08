"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GuidanceMain = () => {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!circleRef.current || !sectionRef.current) return;
      gsap.set(circleRef.current, { scale: 70 });
      gsap.to(circleRef.current, {
        scale: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true, pin: true, pinSpacing: true },
        ease: "none",
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=100",
        end: "bottom top",
        onUpdate: (self) => {
          const direction = self.direction;
          textRefs.current.forEach((el) => {
            if (!el) return;
            if (direction === -1) {
              gsap.to(el, { color: "#ffffff", duration: 0.2 });
            } else {
              const originalColor = el.dataset.originalColor;
              gsap.to(el, { color: originalColor || "#ffffff", duration: 0.1 });
            }
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      el.dataset.originalColor = getComputedStyle(el).color;
      textRefs.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} id="guidance-section" className="w-full h-[100vh] relative flex flex-col items-center justify-center text-center lg:py-24 md:py-24 sm:py-10 px-6 overflow-hidden bg-[#050507]">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
        <div ref={circleRef} className="w-[100px] h-[100px] bg-[#7C3AED] relative top-29 rounded-full blur-[1px]"></div>
      </div>
      <div className="relative z-10 max-w-4xl p-5">
        <p className="uppercase text-sm font-mono tracking-[0.3em] text-[#94a3b8] mb-10 transition-colors duration-300" ref={addToTextRefs}>Our Philosophy</p>
        <h2 className="lg:text-7xl md:text-7xl sm:text-4xl font-heading font-bold text-white leading-tight -mt-5 transition-colors duration-300" ref={addToTextRefs}>
          Engineering tomorrow&apos;s
          <span className="block">digital reality<span className="text-[#008080] rounded-full">.</span></span>
        </h2>
        <div className="flex justify-center text-center">
          <p className="mt-8 text-[#94a3b8] text-lg leading-relaxed lg:w-150 md:w-150 sm:w-full transition-colors duration-300" ref={addToTextRefs}>
            From concept to deployment, we craft intelligent systems that scale with ambition. Our multidisciplinary teams merge strategy, design, and deep tech to deliver products that don&apos;t just solve problems — they redefine what&apos;s possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidanceMain;
