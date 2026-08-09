"use client";

import { useEffect, useRef, useState } from "react";
import { buildGlyphCache, drawGlyph, drawMetaballField, randomNoiseChar } from "@/lib/pixelGlyph";

type Project = {
  id: string;
  title: string;
  tag: string;
  description: string;
  x: number;
  y: number;
};

const PROJECTS: Project[] = [
  {
    id: "one",
    title: "PROJECTLABSX",
    tag: "Flagship",
    description: "Our own site — the studio's home base for design, development, and AI research.",
    x: 14,
    y: 28,
  },
  {
    id: "two",
    title: "DEMO STORE",
    tag: "Web Development",
    description: "A full e-commerce build — product catalog, cart, and checkout, live on Vercel.",
    x: 56,
    y: 14,
  },
  {
    id: "three",
    title: "PROPXLABS",
    tag: "Web Development",
    description: "A trading education platform — courses, pricing, and a simulated funding track.",
    x: 84,
    y: 34,
  },
  {
    id: "four",
    title: "SURYA COMMS",
    tag: "Web Development",
    description: "Home automation and networking site for a Kerala-based installer, built end to end.",
    x: 36,
    y: 44,
  },
];

const FONT_PX = 18;
const CELL_PX = 2.4;
const SLOT_W = 18;
const SLOT_H = 24;
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const DISTURB = 110;
const DECODE = 30;

export default function ProjectConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const focusRef = useRef(-1);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs = buildGlyphCache(CHARSET, FONT_PX, SLOT_W, SLOT_H, CELL_PX);
    const noiseState = new Map<string, { char: string; until: number }>();

    let cancelled = false;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const tick = (now: number) => {
      if (cancelled) return;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      PROJECTS.forEach((project, idx) => {
        const cx = (project.x / 100) * rect.width;
        const cy = (project.y / 100) * rect.height;

        const focused = focusRef.current === idx;
        const dist = mouseRef.current.active
          ? Math.hypot(mouseRef.current.x - cx, mouseRef.current.y - cy)
          : Infinity;
        const near = focused || dist < DISTURB;
        const decodeT = focused
          ? 1
          : near
            ? Math.max(0, Math.min(1, 1 - (dist - DECODE) / (DISTURB - DECODE)))
            : 0;

        if (decodeT > 0.02) {
          drawMetaballField(
            ctx,
            [{ x: cx, y: cy, r: 10 + decodeT * 20 }],
            { minX: cx - 60, minY: cy - 60, maxX: cx + 60, maxY: cy + 60 },
            4,
            (glow, alpha) => {
              const r = Math.round(124 + glow * 90);
              const g = Math.round(58 + glow * 115);
              return `rgba(${r},${g},255,${alpha * 0.8})`;
            },
          );
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(196,181,253,0.8)";
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        if (decodeT > 0.03) {
          const label = project.title;
          let display = label;
          if (decodeT < 0.97) {
            display = "";
            for (let i = 0; i < label.length; i++) {
              const key = `${idx}-${i}`;
              if (decodeT > (i + 1) / label.length) {
                display += label[i];
                noiseState.delete(key);
                continue;
              }
              const st = noiseState.get(key);
              if (!st || now > st.until) {
                noiseState.set(key, { char: randomNoiseChar(), until: now + 70 + Math.random() * 80 });
              }
              display += noiseState.get(key)!.char;
            }
          }

          const alpha = Math.min(1, decodeT * 1.3);
          const rr = Math.round(190 + decodeT * 65);
          const gg = Math.round(165 + decodeT * 90);
          ctx.fillStyle = `rgba(${rr},${gg},255,${alpha})`;

          const step = SLOT_W * 0.6;
          let cursorX = cx - (display.length * step) / 2;
          const labelY = cy - 26;
          for (const ch of display) {
            const glyph = glyphs.get(ch) || glyphs.get(" ")!;
            drawGlyph(ctx, glyph, cursorX + step / 2, labelY, CELL_PX);
            cursorX += step;
          }
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {PROJECTS.map((project, idx) => (
        <button
          key={project.id}
          onFocus={() => {
            focusRef.current = idx;
          }}
          onBlur={() => {
            focusRef.current = -1;
          }}
          onClick={() => setSelected(project)}
          style={{ left: `${project.x}%`, top: `${project.y}%` }}
          className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full text-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
        >
          {project.title}
        </button>
      ))}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-[#0a0518] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-accent-soft">{selected.tag}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{selected.title}</h3>
            <p className="mt-4 text-sm text-muted">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-8 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-white/30"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
