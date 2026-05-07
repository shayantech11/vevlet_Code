"use client";

import Link from "next/link";
import Image from "next/image";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaLinkedinIn, FaArrowRight } from "react-icons/fa";

const FooterMain = () => {
  return (
    <footer className="relative bg-[#050507] text-[#94a3b8] pt-20 pb-0 border-t border-white/5 overflow-hidden">
      {/* Subtle gradient glow behind content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#008080]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Giant watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-heading font-bold text-white/[0.02] leading-none tracking-tight">
          CODEVELVET
        </span>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-16 lg:px-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section — wider */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <Image
                src="/logoo.png"
                alt="CODEVELVET Logo"
                width={200}
                height={200}
                quality={100}
                unoptimized={true}
                className="w-auto h-10 md:h-12 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-heading text-xl md:text-2xl font-bold tracking-[0.05em] text-white leading-none">
                  CODEVELVET
                </span>
                <span className="text-[0.6rem] font-medium tracking-[0.3em] text-gray-400 mt-1 uppercase">
                  Where Code Meets Elegance
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#94a3b8]/80 max-w-xs">
              Engineering intelligent software, AI systems, and digital products
              that give ambitious businesses their unfair advantage.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/aptura-tech-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94a3b8] hover:bg-[#008080]/20 hover:border-[#008080]/40 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923315085483"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94a3b8] hover:bg-[#25D366]/20 hover:border-[#25D366]/40 hover:text-[#25D366] transition-all duration-300"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Expertise */}
          <div className="lg:col-span-3">
            <p className="text-sm font-heading font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Expertise
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                "Web Development",
                "App Development",
                "UI/UX Design",
                "Cyber Security",
                "Artificial Intelligence",
                "Internet Of Things",
              ].map((name) => (
                <li key={name}>
                  <span className="flex items-center gap-2 text-[#94a3b8]/80">
                    <span className="w-1 h-1 rounded-full bg-[#008080]" />
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-sm font-heading font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Company
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Clients", path: "/clients" },
                { name: "Our Team", path: "/team" },
                { name: "Case Studies", path: "/case-studies" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="group/link flex items-center gap-2 text-[#94a3b8]/80 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#008080] opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-sm font-heading font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Get In Touch
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#008080]/10 border border-[#008080]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMagnifyingGlassLocation className="text-[#008080] text-xs" />
                </span>
                <p className="text-[#94a3b8]/80">Peshawar, Pakistan</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#008080]/10 border border-[#008080]/20 flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt className="text-[#008080] text-xs" />
                </span>
                <a href="tel:+923315085483" className="text-[#94a3b8]/80 hover:text-white transition-colors duration-200">
                  +92 331 5085483
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#008080]/10 border border-[#008080]/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-[#008080] text-xs" />
                </span>
                <a href="mailto:apturatechsolution@gmail.com" className="text-[#94a3b8]/80 hover:text-white transition-colors duration-200 break-all">
                  apturatechsolution@gmail.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#008080] hover:text-white border border-[#008080]/30 hover:border-[#008080] bg-[#008080]/5 hover:bg-[#008080]/15 px-4 py-2.5 rounded-lg transition-all duration-300 group/cta"
            >
              Start a Conversation
              <FaArrowRight className="text-[10px] group-hover/cta:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/[0.06]" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-xs text-[#94a3b8]/60">
          <div className="flex items-center gap-2">
            <Image
              src="/logoo.png"
              alt="CodeVelvet"
              width={50}
              height={50}
              unoptimized={true}
              className="w-auto h-4 object-contain opacity-40"
            />
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" className="hover:text-white transition-colors duration-200">
                CodeVelvet
              </Link>
              . All rights reserved.
            </p>
          </div>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
            <li className="w-px h-3 bg-white/10" />
            <li>
              <Link href="/clients" className="hover:text-white transition-colors duration-200">
                Clients
              </Link>
            </li>
            <li className="w-px h-3 bg-white/10" />
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Creator watermark */}
        <div className="flex items-center justify-center pb-5 text-[11px] text-[#94a3b8]/30">
          <span>
            Crafted by{" "}
            <a
              href="https://www.muzamilshiraz.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5f9ea0]/50 hover:text-[#f4e1c1] transition-colors duration-300"
            >
              CodeVELVET
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
