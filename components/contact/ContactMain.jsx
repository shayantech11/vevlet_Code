"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import {
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We review your goals and define the project scope together.",
  },
  {
    step: "02",
    title: "NDA & Proposal",
    description:
      "If needed, we sign an NDA. Then deliver a detailed proposal.",
  },
  {
    step: "03",
    title: "Kickoff",
    description:
      "Once aligned, our team begins engineering your solution.",
  },
];

const ContactMain = () => {
  /* ── Refs ── */
  const heroLabelRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroDescRef = useRef(null);

  const formSectionRef = useRef(null);
  const formCardRef = useRef(null);
  const formFieldsRef = useRef([]);
  const formBtnRef = useRef(null);

  const stepsCardRef = useRef(null);
  const stepsItemsRef = useRef([]);
  const stepsLineRef = useRef(null);
  const stepDotsRef = useRef([]);

  const contactCardRef = useRef(null);
  const contactItemsRef = useRef([]);

  const mapSectionRef = useRef(null);
  const mapRef = useRef(null);

  /* ── State ── */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    try {
      await emailjs.send(
        "service_7syzf8p",
        "template_siau848",
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_email: "mshayanyounastech@gmail.com",
          reply_to: formData.email,
        },
        "Cpn322BDQ9EFLPqiq",
      );
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToMap = () =>
    document
      .getElementById("office-map")
      ?.scrollIntoView({ behavior: "smooth" });

  /* ═══════════════ GSAP Animations ═══════════════ */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* ── HERO ── */
        if (heroLabelRef.current) {
          gsap.set(heroLabelRef.current, { autoAlpha: 0, y: 20 });
          gsap.to(heroLabelRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
          });
        }

        if (heroHeadingRef.current) {
          const words =
            heroHeadingRef.current.querySelectorAll(".hero-word");
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

        if (heroDescRef.current) {
          gsap.set(heroDescRef.current, { autoAlpha: 0, y: 25 });
          gsap.to(heroDescRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          });
        }

        /* ── FORM CARD — slides from left ── */
        if (formCardRef.current) {
          gsap.set(formCardRef.current, {
            autoAlpha: 0,
            x: -50,
            scale: 0.96,
          });
          gsap.to(formCardRef.current, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 72%",
            },
          });
        }

        /* Form fields stagger in */
        const fields = formFieldsRef.current.filter(Boolean);
        if (fields.length) {
          gsap.set(fields, { autoAlpha: 0, y: 25 });
          gsap.to(fields, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 65%",
            },
          });
        }

        /* Form submit button */
        if (formBtnRef.current) {
          gsap.set(formBtnRef.current, { autoAlpha: 0, y: 15 });
          gsap.to(formBtnRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 55%",
            },
          });
        }

        /* ── STEPS CARD — slides from right ── */
        if (stepsCardRef.current) {
          gsap.set(stepsCardRef.current, {
            autoAlpha: 0,
            x: 50,
            scale: 0.96,
          });
          gsap.to(stepsCardRef.current, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.12,
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 72%",
            },
          });
        }

        /* Steps line draws */
        if (stepsLineRef.current) {
          gsap.set(stepsLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });
          gsap.to(stepsLineRef.current, {
            scaleY: 1,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 65%",
            },
          });
        }

        /* Step dots pop in */
        const dots = stepDotsRef.current.filter(Boolean);
        dots.forEach((dot, i) => {
          gsap.set(dot, { scale: 0 });
          gsap.to(dot, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(3)",
            delay: 0.5 + i * 0.2,
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 65%",
            },
          });
        });

        /* Steps items stagger */
        const sItems = stepsItemsRef.current.filter(Boolean);
        sItems.forEach((item, i) => {
          gsap.set(item, { autoAlpha: 0, x: 25 });
          gsap.to(item, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.6 + i * 0.15,
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 65%",
            },
          });
        });

        /* ── CONTACT DETAILS CARD ── */
        if (contactCardRef.current) {
          gsap.set(contactCardRef.current, {
            autoAlpha: 0,
            x: 50,
            scale: 0.96,
          });
          gsap.to(contactCardRef.current, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactCardRef.current,
              start: "top 80%",
            },
          });
        }

        const cItems = contactItemsRef.current.filter(Boolean);
        cItems.forEach((item, i) => {
          gsap.set(item, { autoAlpha: 0, x: 20 });
          gsap.to(item, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: contactCardRef.current,
              start: "top 75%",
            },
          });
        });

        /* ── MAP ── */
        if (mapRef.current) {
          gsap.set(mapRef.current, { autoAlpha: 0, y: 40, scale: 0.97 });
          gsap.to(mapRef.current, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapSectionRef.current,
              start: "top 75%",
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

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3.5 text-white text-[14px] font-body focus:outline-none focus:border-[#008080]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(0,128,128,0.06)] transition-all duration-300 placeholder-white/15";

  return (
    <div className="bg-[#050507] min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
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

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Label */}
          <div
            ref={heroLabelRef}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#008080]/50" />
            <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
              Contact
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#008080]/50" />
          </div>

          {/* Heading — word-by-word reveal */}
          <h1
            ref={heroHeadingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-8"
            style={{ perspective: "600px" }}
          >
            <span className="hero-word inline-block mr-[0.25em]">
              Let&apos;s
            </span>
            <span className="hero-word inline-block mr-[0.25em]">start</span>
            <span className="hero-word inline-block mr-[0.25em]">your</span>
            <br className="hidden md:block" />
            <span className="hero-word inline-block gradient-text">
              next&nbsp;project
            </span>
          </h1>

          {/* Description */}
          <p
            ref={heroDescRef}
            className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Have an idea, a challenge, or a vision? Tell us about it. Our
            engineering team is ready to turn it into production-grade reality.
          </p>
        </div>
      </section>

      {/* ═══ FORM + SIDEBAR ═══ */}
      <section ref={formSectionRef} className="pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form Column (3/5) */}
            <div className="lg:col-span-3">
              <div
                ref={formCardRef}
                className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {/* Form header with gradient accent */}
                <div className="relative px-8 md:px-10 pt-8 md:pt-10 pb-6">
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 5%, rgba(0,128,128,0.4) 50%, transparent 95%)",
                    }}
                  />
                  <h2 className="text-2xl font-heading font-bold text-white mb-2">
                    Send a message
                  </h2>
                  <p className="text-[#94a3b8]/60 text-sm">
                    Fill in the details and we&apos;ll get back to you within 24
                    hours.
                  </p>
                </div>

                <div className="px-8 md:px-10 pb-8 md:pb-10">
                  {status === "success" && (
                    <div className="mb-6 p-4 bg-[#008080]/[0.06] border border-[#008080]/15 text-[#008080] rounded-xl text-sm font-medium">
                      Message sent successfully. We&apos;ll be in touch soon.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mb-6 p-4 bg-red-500/[0.06] border border-red-500/15 text-red-400 rounded-xl text-sm font-medium">
                      Something went wrong. Please try again or email us
                      directly.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name row */}
                    <div
                      ref={(el) => {
                        formFieldsRef.current[0] = el;
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                      <div>
                        <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div
                      ref={(el) => {
                        formFieldsRef.current[1] = el;
                      }}
                    >
                      <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Phone + Subject row */}
                    <div
                      ref={(el) => {
                        formFieldsRef.current[2] = el;
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                      <div>
                        <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="+92 XXX XXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="Project inquiry"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div
                      ref={(el) => {
                        formFieldsRef.current[3] = el;
                      }}
                    >
                      <label className="block text-white/50 text-xs font-mono tracking-wider uppercase mb-2.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    {/* Submit */}
                    <div ref={formBtnRef} className="pt-1">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full bg-[#f4e1c1] text-[#050507] font-heading font-bold text-[15px] py-4 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {/* Hover shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                        <span className="relative z-10">
                          {isLoading ? "Sending..." : "Send Message"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Column (2/5) */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {/* What Happens Next */}
                <div
                  ref={stepsCardRef}
                  className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 5%, rgba(0,128,128,0.4) 50%, transparent 95%)",
                    }}
                  />

                  <h3 className="text-lg font-heading font-bold text-white mb-7">
                    What happens next?
                  </h3>

                  <div className="relative flex flex-col gap-6">
                    {/* Animated vertical connecting line */}
                    <div
                      ref={stepsLineRef}
                      className="absolute left-[17px] top-[20px] bottom-[20px] w-px"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,128,128,0.4), rgba(0,128,128,0.1))",
                      }}
                    />

                    {steps.map((s, i) => (
                      <div
                        key={i}
                        ref={(el) => {
                          stepsItemsRef.current[i] = el;
                        }}
                        className="flex items-start gap-4 group"
                      >
                        {/* Step dot */}
                        <div className="relative flex-shrink-0 w-[36px] flex justify-center">
                          <div
                            ref={(el) => {
                              stepDotsRef.current[i] = el;
                            }}
                            className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#008080]/[0.08] border border-[#008080]/15 group-hover:border-[#008080]/30 group-hover:bg-[#008080]/[0.12] transition-all duration-300"
                          >
                            <span className="text-[#008080] text-[11px] font-mono font-bold">
                              {s.step}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="pt-1.5">
                          <p className="text-white text-sm font-semibold mb-1 group-hover:text-[#f4e1c1] transition-colors duration-300">
                            {s.title}
                          </p>
                          <p className="text-[#94a3b8]/60 text-xs leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Details Card */}
                <div
                  ref={contactCardRef}
                  className="bg-[#0a0d14] border border-white/[0.06] rounded-2xl p-8 sticky top-28 relative overflow-hidden"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 5%, rgba(244,225,193,0.3) 50%, transparent 95%)",
                    }}
                  />

                  <h3 className="text-lg font-heading font-bold text-white mb-7">
                    Contact details
                  </h3>
                  <div className="flex flex-col gap-5">
                    {/* Location */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[0] = el;
                      }}
                      className="flex items-start gap-3.5 group"
                    >
                      <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-xl bg-[#008080]/[0.06] border border-[#008080]/10 group-hover:border-[#008080]/25 group-hover:bg-[#008080]/[0.1] transition-all duration-300 flex-shrink-0">
                        <FaBuilding className="text-[#008080]/70 group-hover:text-[#008080] text-xs transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Peshawar, Pakistan</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[2] = el;
                      }}
                      className="h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                      }}
                    />

                    {/* Phone */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[3] = el;
                      }}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#008080]/[0.06] border border-[#008080]/10 group-hover:border-[#008080]/25 group-hover:bg-[#008080]/[0.1] transition-all duration-300 flex-shrink-0">
                        <FaPhoneAlt className="text-[#008080]/70 group-hover:text-[#008080] text-xs transition-colors duration-300" />
                      </div>
                      <a
                        href="tel:+923476801611"
                        className="text-[#94a3b8]/70 text-sm hover:text-[#f4e1c1] transition-colors"
                      >
                        +92 347 6801611
                      </a>
                    </div>

                    {/* Email */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[4] = el;
                      }}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#008080]/[0.06] border border-[#008080]/10 group-hover:border-[#008080]/25 group-hover:bg-[#008080]/[0.1] transition-all duration-300 flex-shrink-0">
                        <FaEnvelope className="text-[#008080]/70 group-hover:text-[#008080] text-xs transition-colors duration-300" />
                      </div>
                      <a
                        href="mailto:mshayanyounastech@gmail.com"
                        className="text-[#94a3b8]/70 text-sm hover:text-[#f4e1c1] transition-colors"
                      >
                        mshayanyounastech@gmail.com
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[5] = el;
                      }}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#25D366]/[0.08] border border-[#25D366]/10 group-hover:border-[#25D366]/25 group-hover:bg-[#25D366]/[0.12] transition-all duration-300 flex-shrink-0">
                        <FaWhatsapp className="text-[#25D366]/70 group-hover:text-[#25D366] text-xs transition-colors duration-300" />
                      </div>
                      <a
                        href="https://wa.me/923476801611"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#94a3b8]/70 text-sm hover:text-[#25D366] transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>

                    {/* Hours */}
                    <div
                      ref={(el) => {
                        contactItemsRef.current[6] = el;
                      }}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#008080]/[0.06] border border-[#008080]/10 group-hover:border-[#008080]/25 group-hover:bg-[#008080]/[0.1] transition-all duration-300 flex-shrink-0">
                        <FaClock className="text-[#008080]/70 group-hover:text-[#008080] text-xs transition-colors duration-300" />
                      </div>
                      <p className="text-[#94a3b8]/70 text-sm">
                        Mon &mdash; Fri, 10:00 AM &mdash; 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section id="office-map" ref={mapSectionRef} className="pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Map section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-[#008080] to-transparent" />
            <span className="text-[#008080] font-mono text-xs tracking-[0.3em] uppercase">
              Find Us
            </span>
          </div>

          <div
            ref={mapRef}
            className="rounded-2xl overflow-hidden border border-white/[0.06] relative"
          >
            {/* Subtle glow above map */}
            <div
              className="absolute -top-px left-0 right-0 h-[1px] z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(0,128,128,0.3) 50%, transparent 90%)",
              }}
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7451203368278!2d71.42299717524048!3d33.99907997317706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91054b7e33661%3A0x30048547e074197d!2sUnited%20Shopping%20Plaza!5e0!3m2!1sen!2s!4v1778088121639!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VEVLET Office - United Shopping Plaza"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactMain;
