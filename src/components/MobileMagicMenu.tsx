"use client";

import { useEffect, useRef } from "react";
import { buildGlyphCache, drawGlyph, drawMetaballField, randomNoiseChar } from "@/lib/pixelGlyph";
import MiniPuzzle from "@/components/MiniPuzzle";

type NavItem = { label: string; href: string };

const FONT_PX = 18;
const CELL_PX = 2;
const SLOT_W = 18;
const SLOT_H = 26;
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

const DISTURB_RADIUS = 110;
const DECODE_RADIUS = 36;
const FUSION_RADIUS = 80;

export default function MobileMagicMenu({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const nearestRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glyphs = buildGlyphCache(CHARSET, FONT_PX, SLOT_W, SLOT_H, CELL_PX);
    const noiseState = new Map<string, { char: string; until: number }>();

    let raf = 0;
    let cancelled = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mountTime = performance.now();

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

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    };
    const onPointerEnd = () => {
      pointerRef.current.active = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerMove);
    container.addEventListener("pointerup", onPointerEnd);
    container.addEventListener("pointerleave", onPointerEnd);
    container.addEventListener("pointercancel", onPointerEnd);

    const tick = (now: number) => {
      if (cancelled) return;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // brief scramble-in on open, independent of touch — gives the menu a
      // "materializing" feel even before anyone drags a finger across it.
      const entrance = Math.min(1, (now - mountTime) / 850);

      const centers = nodeRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0, labelY: 0 };
        const r = el.getBoundingClientRect();
        const top = r.top - rect.top;
        return {
          x: r.left - rect.left + r.width / 2,
          y: top + r.height / 2,
          labelY: top + r.height * 0.24,
        };
      });

      let nearestIdx = -1;
      let nearestDist = Infinity;
      if (pointerRef.current.active) {
        centers.forEach((c, i) => {
          const d = Math.hypot(pointerRef.current.x - c.x, pointerRef.current.y - c.y);
          if (d < nearestDist) {
            nearestDist = d;
            nearestIdx = i;
          }
        });
      }

      const fusedNow = nearestDist < FUSION_RADIUS ? nearestIdx : -1;
      if (fusedNow !== nearestRef.current) {
        if (fusedNow >= 0 && typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(8);
        }
        nearestRef.current = fusedNow;
      }

      if (pointerRef.current.active) {
        const balls = [{ x: pointerRef.current.x, y: pointerRef.current.y, r: 20 }];
        if (nearestIdx >= 0 && nearestDist < FUSION_RADIUS) {
          const t = 1 - nearestDist / FUSION_RADIUS;
          balls.push({ x: centers[nearestIdx].x, y: centers[nearestIdx].y, r: 16 + t * 26 });
        }
        drawMetaballField(
          ctx,
          balls,
          { minX: 0, minY: 0, maxX: rect.width, maxY: rect.height },
          5,
          (glow, alpha) => {
            const r = Math.round(124 + glow * 90);
            const g = Math.round(58 + glow * 115);
            return `rgba(${r},${g},255,${alpha * 0.85})`;
          },
        );
      }

      items.forEach((item, i) => {
        const c = centers[i];
        if (!c.x && !c.y) return;
        const dist = pointerRef.current.active
          ? Math.hypot(pointerRef.current.x - c.x, pointerRef.current.y - c.y)
          : Infinity;
        const near = dist < DISTURB_RADIUS;
        const proximityT = near
          ? Math.max(0, Math.min(1, 1 - (dist - DECODE_RADIUS) / (DISTURB_RADIUS - DECODE_RADIUS)))
          : 0;
        const decodeT = Math.max(entrance, proximityT);

        const label = item.label;
        let display = label;
        if (decodeT < 0.97) {
          display = "";
          for (let ci = 0; ci < label.length; ci++) {
            const key = `${i}-${ci}`;
            if (decodeT > (ci + 1) / label.length) {
              display += label[ci];
              noiseState.delete(key);
              continue;
            }
            const st = noiseState.get(key);
            if (!st || now > st.until) {
              noiseState.set(key, { char: randomNoiseChar(), until: now + 70 + Math.random() * 90 });
            }
            display += noiseState.get(key)!.char;
          }
        }

        const alpha = 0.6 + 0.4 * decodeT;
        const rr = Math.round(190 + decodeT * 65);
        const gg = Math.round(165 + decodeT * 90);
        ctx.fillStyle = `rgba(${rr},${gg},255,${alpha})`;

        const step = SLOT_W * 0.72;
        let cursorX = c.x - (step * label.length) / 2;
        for (const ch of display) {
          const glyph = glyphs.get(ch) || glyphs.get(" ")!;
          drawGlyph(ctx, glyph, cursorX + step / 2, c.labelY, CELL_PX);
          cursorX += step;
        }
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerMove);
      container.removeEventListener("pointerup", onPointerEnd);
      container.removeEventListener("pointerleave", onPointerEnd);
      container.removeEventListener("pointercancel", onPointerEnd);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 p-6">
        {items.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            onClick={onNavigate}
            className="relative flex items-center justify-center rounded-3xl border border-border text-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
          >
            {item.label}
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 opacity-70">
              <MiniPuzzle />
            </div>
          </a>
        ))}
      </div>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted">
        Drag your finger across the tiles
      </p>
    </div>
  );
}
