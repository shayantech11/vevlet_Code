"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────────────────
   APTURA LOADER — Logo-geometry assembling animation
   Pure CSS animations so visuals appear INSTANTLY on first paint,
   no waiting for JS hydration or framer-motion bundle.
   Sequence: Nodes → Connections → Core "A" → Brand text → Fade-out
   ─────────────────────────────────────────────────────── */

const DIAMOND = [
  { x: 100, y: 12 },
  { x: 188, y: 100 },
  { x: 100, y: 188 },
  { x: 12, y: 100 },
];

const INNER_NODES = [
  { x: 100, y: 42 },
  { x: 140, y: 62 },
  { x: 158, y: 100 },
  { x: 140, y: 138 },
  { x: 100, y: 158 },
  { x: 60, y: 138 },
  { x: 42, y: 100 },
  { x: 60, y: 62 },
  { x: 100, y: 80 },
  { x: 118, y: 110 },
  { x: 82, y: 110 },
  { x: 100, y: 130 },
];

const ALL_NODES = [...DIAMOND, ...INNER_NODES];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [0, 4], [1, 5], [2, 8], [3, 10],
  [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 4],
  [4, 8], [5, 9], [6, 10], [7, 11],
  [12, 13], [13, 14], [14, 12],
  [12, 15], [13, 15], [14, 15],
];

const linePath = (a, b) =>
  `M ${ALL_NODES[a].x} ${ALL_NODES[a].y} L ${ALL_NODES[b].x} ${ALL_NODES[b].y}`;

const segmentLength = (a, b) => {
  const dx = ALL_NODES[a].x - ALL_NODES[b].x;
  const dy = ALL_NODES[a].y - ALL_NODES[b].y;
  return Math.sqrt(dx * dx + dy * dy);
};

const Loader = () => {
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip if already shown this session
    try {
      if (sessionStorage.getItem("codevelvet_loaded")) {
        setDismissed(true);
        return;
      }
    } catch (e) {}

    // Dismiss after animation completes (~3.6s)
    const timer = setTimeout(() => {
      setDismissed(true);
      try { sessionStorage.setItem("codevelvet_loaded", "1"); } catch (e) {}
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <>
      {/* CSS keyframes — rendered inline so they work on first paint */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Container exit ── */
        @keyframes loaderExit {
          0%, 75% { opacity: 1; transform: translateY(0) scale(1); }
          100%    { opacity: 0; transform: translateY(-4%) scale(1.03); }
        }

        /* ── Ambient glow ── */
        @keyframes glowIn {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          30%  { opacity: 1; transform: translate(-50%, -50%) scale(0.7); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }

        /* ── SVG container ── */
        @keyframes svgIn {
          0%   { opacity: 0; transform: scale(0.7); }
          15%  { opacity: 1; transform: scale(0.92); }
          55%  { transform: scale(1.05); }
          100% { transform: scale(1.05); }
        }

        /* ── Node pop ── */
        @keyframes nodePop {
          0%   { r: 0; opacity: 0; }
          100% { opacity: 1; }
        }

        /* ── Line draw (uses stroke-dashoffset) ── */
        @keyframes lineDraw {
          0%   { stroke-dashoffset: var(--seg-len); opacity: 0; }
          10%  { opacity: var(--line-opacity); }
          100% { stroke-dashoffset: 0; opacity: var(--line-opacity); }
        }

        /* ── Core A path draw ── */
        @keyframes coreADraw {
          0%   { stroke-dashoffset: 200; opacity: 0; }
          10%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }

        /* ── Core glow circle ── */
        @keyframes coreGlowPulse {
          0%   { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ── Ring pulse ── */
        @keyframes ringPulse {
          0%   { opacity: 0; transform: scale(0.88); transform-origin: 100px 100px; }
          50%  { opacity: 0.35; transform: scale(1.04); transform-origin: 100px 100px; }
          100% { opacity: 0; transform: scale(1.08); transform-origin: 100px 100px; }
        }

        /* ── Brand text ── */
        @keyframes brandSlideUp {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ── Subtitle ── */
        @keyframes subtitleFade {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* ── Bottom accent line ── */
        @keyframes accentExpand {
          0%   { width: 0; opacity: 0; }
          100% { width: 200px; opacity: 1; }
        }

        /* ── Sparkle ── */
        @keyframes sparkle {
          0%   { opacity: 0; transform: scale(0) translate(0, 0); }
          40%  { opacity: 0.8; transform: scale(1.5) translate(var(--sp-dx), calc(var(--sp-dy) * 0.4)); }
          100% { opacity: 0; transform: scale(0) translate(var(--sp-dx), var(--sp-dy)); }
        }

        .codevelvet-loader-root {
          animation: loaderExit 3.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
      `}} />

      <div
        ref={containerRef}
        className="codevelvet-loader-root fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #111215 0%, #0A0A0B 60%, #050506 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 420,
            height: 420,
            left: "50%",
            top: "50%",
            background: "radial-gradient(circle, rgba(0,128,128,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "glowIn 2s ease-out forwards",
          }}
        />

        {/* ━━━━ SVG network ━━━━ */}
        <svg
          viewBox="0 0 200 200"
          className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] relative z-10"
          style={{ animation: "svgIn 2.8s ease-out forwards" }}
        >
          <defs>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="core-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5f9ea0" />
              <stop offset="50%" stopColor="#c0d8d8" />
              <stop offset="100%" stopColor="#008080" />
            </linearGradient>
            <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#d0e8e8" />
              <stop offset="100%" stopColor="#008080" />
            </linearGradient>
          </defs>

          {/* Phase 0 — Nodes pop in (start at 0.1s, staggered) */}
          <g filter="url(#node-glow)">
            {ALL_NODES.map((node, i) => {
              const isDiamond = i < 4;
              const isCore = i >= 12;
              const targetR = isDiamond ? 3 : isCore ? 2.2 : 1.8;
              return (
                <circle
                  key={`n-${i}`}
                  cx={node.x}
                  cy={node.y}
                  r={targetR}
                  fill={isCore ? "#fff" : isDiamond ? "#5f9ea0" : "#8ab4b4"}
                  opacity="0"
                  style={{
                    animation: `nodePop 0.45s ${0.1 + i * 0.028}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  }}
                />
              );
            })}
          </g>

          {/* Phase 1 — Lines draw (start at 0.6s, staggered) */}
          <g>
            {CONNECTIONS.map(([a, b], i) => {
              const len = segmentLength(a, b);
              const isCoreLine = a >= 12 && b >= 12;
              const delay = isCoreLine ? 1.4 + 0.45 + i * 0.018 : 0.6 + i * 0.032;
              const duration = isCoreLine ? 0.65 : 0.5;
              const opacity = isCoreLine ? 1 : 0.55;
              return (
                <path
                  key={`c-${i}`}
                  d={linePath(a, b)}
                  fill="none"
                  stroke={isCoreLine ? "url(#core-grad)" : "url(#line-grad)"}
                  strokeWidth={isCoreLine ? 1.4 : 0.65}
                  strokeLinecap="round"
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  opacity="0"
                  style={{
                    "--seg-len": len,
                    "--line-opacity": opacity,
                    animation: `lineDraw ${duration}s ${delay}s ease-in-out forwards`,
                  }}
                />
              );
            })}
          </g>

          {/* Phase 2 — Core "C" (start at 1.4s) */}
          <g filter="url(#core-glow)">
            <path
              d="M 122 80 C 115 68 103 62 90 65 C 72 69 63 85 65 102 C 67 119 80 132 97 133 C 110 134 121 127 127 116"
              fill="none"
              stroke="url(#core-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              opacity="0"
              style={{ animation: "coreADraw 0.75s 1.45s ease-in-out forwards" }}
            />
            <circle
              cx="122"
              cy="80"
              r="4"
              fill="rgba(0,128,128,0.4)"
              opacity="0"
              style={{
                transformOrigin: "122px 80px",
                animation: "coreGlowPulse 0.5s 1.85s ease-out forwards",
              }}
            />
          </g>

          {/* Ring pulse (start at 1.4s) */}
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="#008080"
            strokeWidth="0.4"
            opacity="0"
            style={{
              transformOrigin: "100px 100px",
              animation: "ringPulse 1.8s 1.4s ease-out forwards",
            }}
          />
        </svg>

        {/* ━━━━ Phase 3 — Brand text (start at 2s) ━━━━ */}
        <div
          className="relative z-10 mt-8 flex flex-col items-center gap-2"
          style={{
            opacity: 0,
            animation: "brandSlideUp 0.65s 2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <span
            className="font-heading text-[1.6rem] sm:text-[1.85rem] font-bold text-white"
            style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}
          >
            CODEVELVET
          </span>
          <span
            className="text-[0.6rem] sm:text-[0.65rem] font-medium tracking-[0.35em] text-[#5f9ea0]/70 uppercase"
            style={{
              opacity: 0,
              animation: "subtitleFade 0.5s 2.2s ease-out forwards",
            }}
          >
            Where Code Meets Elegance
          </span>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-[12%] left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#008080]/30 to-transparent"
          style={{
            opacity: 0,
            width: 0,
            animation: "accentExpand 0.8s 2s ease-out forwards",
          }}
        />

        {/* Sparkles */}
        {[
          { w: 3, h: 2.5, left: "38%", top: "34%", dy: -32, dx: -12, dur: 1.4 },
          { w: 2.2, h: 3.2, left: "52%", top: "42%", dy: -45, dx: 8, dur: 1.6 },
          { w: 3.5, h: 2.8, left: "46%", top: "38%", dy: -28, dx: -18, dur: 1.3 },
          { w: 2, h: 3, left: "60%", top: "48%", dy: -38, dx: 14, dur: 1.7 },
          { w: 2.8, h: 2.2, left: "42%", top: "52%", dy: -42, dx: -6, dur: 1.5 },
          { w: 3.2, h: 2.6, left: "55%", top: "36%", dy: -35, dx: 10, dur: 1.2 },
        ].map((s, i) => (
          <div
            key={`sp-${i}`}
            className="absolute rounded-full"
            style={{
              width: s.w,
              height: s.h,
              background: i % 2 === 0 ? "#008080" : "#5f9ea0",
              left: s.left,
              top: s.top,
              opacity: 0,
              "--sp-dx": `${s.dx}px`,
              "--sp-dy": `${s.dy}px`,
              animation: `sparkle ${s.dur}s ${0.85 + i * 0.12}s ease-out forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Loader;
