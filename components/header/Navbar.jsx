"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaCode,
  FaMobileAlt,
  FaBrain,
  FaShieldAlt,
  FaPencilRuler,
  FaMicrochip,
  FaProjectDiagram,
  FaCogs,
  FaRocket,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const solutionsData = [
  {
    label: "Web Development",
    description: "Scalable full-stack apps built with MERN, Next.js, and Laravel for performance at any scale.",
    icon: <FaCode />,
    accent: "from-teal-500/20 to-teal-600/5",
  },
  {
    label: "App Development",
    description: "Native and cross-platform mobile experiences crafted for iOS, Android, and beyond.",
    icon: <FaMobileAlt />,
    accent: "from-amber-500/20 to-amber-600/5",
  },
  {
    label: "Artificial Intelligence",
    description: "Custom LLMs, computer vision, NLP pipelines, and predictive models that drive decisions.",
    icon: <FaBrain />,
    accent: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    label: "Cybersecurity",
    description: "Penetration testing, security audits, and zero-trust architecture to protect what matters.",
    icon: <FaShieldAlt />,
    accent: "from-red-500/20 to-red-600/5",
  },
  {
    label: "UI/UX Design",
    description: "Research-driven interfaces, design systems, and prototypes that turn visitors into users.",
    icon: <FaPencilRuler />,
    accent: "from-orange-500/20 to-orange-600/5",
  },
  {
    label: "IoT Solutions",
    description: "Connected device ecosystems, edge computing, and real-time monitoring at industrial scale.",
    icon: <FaMicrochip />,
    accent: "from-cyan-500/20 to-cyan-600/5",
  },
];

const methodData = [
  {
    label: "Agile Methodology",
    description: "Sprint-based delivery with full transparency — every milestone is visible, measurable, and on track. We adapt as your product evolves.",
    icon: <FaProjectDiagram />,
    step: "01",
  },
  {
    label: "Build & Ship Cycle",
    description: "Plan, Build, Ship, Iterate. We move with urgency without cutting corners — delivering production-grade code at every stage of the pipeline.",
    icon: <FaCogs />,
    step: "02",
  },
  {
    label: "Idea to Production",
    description: "From concept to deployment — we handle feasibility, design, development, QA, and launch. One team, zero handoffs, complete ownership.",
    icon: <FaRocket />,
    step: "03",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const toggleMobileMenu = (label) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const navItems = ["Home", "About", "Clients", "Team", "Solutions", "Method", "Contact"];

  return (
    <header
      className={`w-full relative md:fixed top-0 z-50 lg:px-20 sm:px-6 py-2 transition-all duration-300 text-white ${
        isScrolled || activeMenu ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between h-16 sm:h-[70px]">
        {/* Logo */}
        <div
          className="flex items-center gap-3 md:gap-4 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logoo.png"
            alt="CodeVelvet Logo"
            width={200}
            height={200}
            quality={100}
            priority={true}
            unoptimized={true}
            className="w-auto h-10 md:h-12 lg:h-14 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col justify-center leading-none">
            <span className="font-heading text-xl md:text-2xl font-bold tracking-[0.05em] text-white leading-none">
              CODEVELVET
            </span>
            <span className="text-[0.65rem] font-medium tracking-[0.3em] text-gray-400 mt-1 uppercase">
              Where Code Meets Elegance
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block z-50 relative">
          <ul className="flex items-center gap-1 text-[15px] font-medium tracking-wide">
            {navItems.map((label) => {
              const hasDropdown = label === "Solutions" || label === "Method";
              const isActive = activeMenu === label;

              if (!hasDropdown) {
                const hrefMap = { Home: "/", About: "/about", Clients: "/clients", Team: "/team", Contact: "/contact" };
                const href = hrefMap[label] || "#";
                const isCurrentPage = pathname === href;
                return (
                  <li key={label} className="relative">
                    <Link
                      href={href}
                      className={`nav-link flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${isCurrentPage ? "text-[#f4e1c1]" : ""}`}
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setActiveMenu(null);
                      }}
                    >
                      {label}
                      {isCurrentPage && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#f4e1c1]" />
                      )}
                    </Link>
                  </li>
                );
              }

              const isDropdownActive = (label === "Solutions" && pathname.startsWith("/service")) || (label === "Method" && pathname === "/methodology");

              return (
                <li
                  key={label}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(label)}
                  onMouseLeave={handleMenuLeave}
                >
                  <div
                    className={`nav-link flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      isActive ? "nav-link-active" : ""
                    } ${isDropdownActive ? "text-[#f4e1c1]" : ""}`}
                  >
                    {label}
                    {isDropdownActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#f4e1c1]" />
                    )}
                    <MdArrowDropDown
                      className={`ml-0.5 text-lg transition-transform duration-200 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Solutions Dropdown */}
                  {isActive && label === "Solutions" && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fade-in-down"
                      onMouseEnter={() => handleMenuEnter(label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="navbar-dropdown rounded-2xl overflow-hidden w-[420px]">
                        {/* Header */}
                        <div className="px-5 pt-5 pb-3">
                          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#008080]/50">
                            Our Expertise
                          </p>
                        </div>
                        {/* Items */}
                        <div className="px-3 pb-3 flex flex-col gap-0.5">
                          {solutionsData.map((item, idx) => (
                            <div
                              key={idx}
                              className="dropdown-item group flex items-start gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 cursor-default"
                            >
                              <div
                                className={`mt-0.5 w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} text-[#008080]/70 group-hover:text-[#008080] transition-colors text-sm flex-shrink-0`}
                              >
                                {item.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-white/90 font-medium text-[13px] group-hover:text-[#f4e1c1] transition-colors leading-tight">
                                  {item.label}
                                </p>
                                <p className="text-[#94a3b8]/60 text-[11px] mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Method Dropdown */}
                  {isActive && label === "Method" && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-fade-in-down"
                      onMouseEnter={() => handleMenuEnter(label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="navbar-dropdown rounded-2xl overflow-hidden w-[400px]">
                        {/* Header */}
                        <div className="px-5 pt-5 pb-3">
                          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#008080]/50">
                            How We Work
                          </p>
                        </div>
                        {/* Items */}
                        <div className="px-3 pb-3 flex flex-col gap-0.5">
                          {methodData.map((item, idx) => (
                            <div
                              key={idx}
                              className="dropdown-item group flex items-start gap-3.5 px-3 py-3.5 rounded-xl transition-all duration-200 cursor-default"
                            >
                              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[#008080]/[0.06] border border-[#008080]/10">
                                <span className="text-[#008080]/60 group-hover:text-[#008080] text-[11px] font-mono font-bold transition-colors">
                                  {item.step}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-white/90 font-medium text-[13px] group-hover:text-[#f4e1c1] transition-colors leading-tight">
                                    {item.label}
                                  </p>
                                  <span className="text-[#008080]/30 group-hover:text-[#008080]/60 transition-colors text-xs">
                                    {item.icon}
                                  </span>
                                </div>
                                <p className="text-[#94a3b8]/60 text-[11px] mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Footer accent */}
                        <div className="mx-5 mb-4 pt-3 border-t border-white/[0.04]">
                          <p className="text-[#94a3b8]/40 text-[10px] font-mono tracking-wide">
                            Agile-first delivery &middot; Zero handoffs &middot; Complete ownership
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="navbar-cta cursor-pointer px-6 py-2.5 text-sm rounded-lg hidden md:block font-semibold transition-all duration-300"
          >
            Get in Touch
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-3xl ml-2 focus:outline-none text-white/80 hover:text-[#f4e1c1] transition-colors"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden navbar-dropdown text-white px-5 py-6 shadow-2xl border-t border-white/5 mt-2 rounded-xl mx-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((label) => {
              const hasDropdown = label === "Solutions" || label === "Method";

              if (!hasDropdown) {
                const hrefMap = { Home: "/", About: "/about", Clients: "/clients", Team: "/team", Contact: "/contact" };
                const href = hrefMap[label] || "#";
                return (
                  <li
                    key={label}
                    className="border-b border-white/5 pb-3 mb-1"
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between text-base font-medium text-white/90 hover:text-[#f4e1c1] transition-colors py-1"
                    >
                      {label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={label}
                  className="border-b border-white/5 pb-3 mb-1"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer text-base font-medium text-white/90 hover:text-[#f4e1c1] transition-colors py-1"
                    onClick={() => toggleMobileMenu(label)}
                  >
                    {label}
                    <MdArrowDropDown
                      className={`text-xl transition-transform duration-200 ${
                        activeMenu === label ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {activeMenu === label && (
                    <ul className="mt-2 pl-1 flex flex-col gap-0.5">
                      {label === "Solutions" &&
                        solutionsData.map((item, idx) => (
                          <li key={idx}>
                            <div className="flex items-start gap-2.5 py-2.5 px-3 text-sm rounded-lg">
                              <span className="text-[#008080]/50 text-xs mt-0.5 flex-shrink-0">
                                {item.icon}
                              </span>
                              <div>
                                <p className="text-white/80 font-medium text-sm">
                                  {item.label}
                                </p>
                                <p className="text-[#94a3b8]/50 text-xs mt-0.5 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}

                      {label === "Method" &&
                        methodData.map((item, idx) => (
                          <li key={idx}>
                            <div className="flex items-start gap-2.5 py-2.5 px-3 text-sm rounded-lg">
                              <span className="text-[#008080]/40 text-[11px] font-mono font-bold mt-0.5 flex-shrink-0">
                                {item.step}
                              </span>
                              <div>
                                <p className="text-white/80 font-medium text-sm">
                                  {item.label}
                                </p>
                                <p className="text-[#94a3b8]/50 text-xs mt-0.5 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full navbar-cta rounded-lg px-6 py-3 block text-center font-semibold transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
