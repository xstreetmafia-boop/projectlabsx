"use client";

import { useEffect, useRef, useState } from "react";
import { buildGlyphCache, drawGlyph, drawMetaballField, randomNoiseChar } from "@/lib/pixelGlyph";

const STEPS = [
  {
    n: "01",
    title: "DISCOVER",
    detail: "We start by understanding the problem, the users, and the real constraints — not just the brief.",
  },
  {
    n: "02",
    title: "DESIGN",
    detail: "Wireframes, systems, and prototypes get tested against real use cases before a line of production code is written.",
  },
  {
    n: "03",
    title: "BUILD",
    detail: "Engineering happens in short iterations, with real feedback and testing baked in from day one.",
  },
  {
    n: "04",
    title: "LAUNCH",
    detail: "We ship, measure what actually happened, and keep iterating instead of walking away.",
  },
];

const FONT_PX = 22;
const CELL_PX = 3;
const SLOT_W = 24;
const SLOT_H = 32;
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const DISTURB = 90;
const DECODE = 20;

export default function WorkProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

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

    const tick = (now: number) => {
      if (cancelled) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 as the section top enters the bottom of the viewport, 1 as its
      // bottom leaves the top — a continuous scroll-scrub, not a fade toggle.
      const raw = (vh - rect.top) / (rect.height + vh);
      const progress = Math.max(0, Math.min(1, raw));

      ctx.clearRect(0, 0, rect.width, rect.height);

      const badgeCenters = badgeRefs.current.map((el) => {
        if (!el) return { x: 20, y: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
      });

      const lineX = badgeCenters[0]?.x ?? 20;
      const lineTop = badgeCenters[0]?.y ?? 0;
      const lineBottom = badgeCenters[badgeCenters.length - 1]?.y ?? rect.height;
      const lineLen = Math.max(1, lineBottom - lineTop);
      const blobY = lineTop + progress * lineLen;

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lineX, lineTop);
      ctx.lineTo(lineX, lineBottom);
      ctx.stroke();

      ctx.strokeStyle = "#7c3aed";
      ctx.beginPath();
      ctx.moveTo(lineX, lineTop);
      ctx.lineTo(lineX, Math.min(blobY, lineBottom));
      ctx.stroke();

      if (progress > 0.005 && progress < 0.999) {
        drawMetaballField(
          ctx,
          [{ x: lineX, y: blobY, r: 13 }],
          { minX: lineX - 45, minY: blobY - 45, maxX: lineX + 45, maxY: blobY + 45 },
          4,
          (glow, alpha) => {
            const r = Math.round(124 + glow * 90);
            const g = Math.round(58 + glow * 115);
            return `rgba(${r},${g},255,${alpha})`;
          },
        );
      }

      let newActive = -1;
      STEPS.forEach((step, idx) => {
        const center = badgeCenters[idx];
        if (!center) return;
        const dist = Math.abs(blobY - center.y);
        const disturbed = progress > 0.01 && dist < DISTURB;
        const decodeT = disturbed
          ? Math.max(0, Math.min(1, 1 - (dist - DECODE) / (DISTURB - DECODE)))
          : center.y < blobY
            ? 1
            : 0;

        if (decodeT > 0.6 || center.y < blobY) newActive = idx;

        const label = step.title;
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

        const alpha = 0.45 + 0.55 * decodeT;
        const rr = Math.round(190 + decodeT * 65);
        const gg = Math.round(165 + decodeT * 90);
        ctx.fillStyle = `rgba(${rr},${gg},255,${alpha})`;

        let cursorX = center.x + 34;
        for (const ch of display) {
          const glyph = glyphs.get(ch) || glyphs.get(" ")!;
          drawGlyph(ctx, glyph, cursorX + (SLOT_W * 0.7) / 2, center.y, CELL_PX);
          cursorX += SLOT_W * 0.7;
        }
      });

      setActiveStep((prev) => (prev === newActive ? prev : newActive));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl">
      {STEPS.map((step, idx) => (
        <div key={step.n} className="relative flex gap-6 pb-16 last:pb-0">
          <div
            ref={(el) => {
              badgeRefs.current[idx] = el;
            }}
            className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-500 ${
              activeStep >= idx ? "border-accent bg-accent text-white" : "border-border text-muted"
            }`}
          >
            {step.n}
          </div>
          <div className="pt-1.5">
            <h3 className="text-lg font-semibold text-transparent">{step.title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{step.detail}</p>
          </div>
        </div>
      ))}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}
