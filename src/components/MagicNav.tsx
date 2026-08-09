"use client";

import { useEffect, useRef } from "react";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

// Fixed per-character pixel-bubble slot. Every glyph is rasterized into the
// same box so DOM anchor widths (label.length * NAV_SLOT_W) line up exactly
// with what the canvas draws — no runtime measuring/scaling needed.
const FONT_PX = 24;
const CELL_PX = 3;
const NAV_SLOT_W = 26;
const NAV_SLOT_H = 36;
const FONT_FAMILY = `900 ${FONT_PX}px "Arial Black", Impact, sans-serif`;

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*+-/<>[]{}?! ";
const NOISE_POOL = CHARSET.replace(" ", "").split("");
const randNoise = () => NOISE_POOL[(Math.random() * NOISE_POOL.length) | 0];

type Glyph = { cols: number; rows: number; on: Uint8Array };

let glyphCache: Map<string, Glyph> | null = null;

function buildGlyphCache(): Map<string, Glyph> {
  if (glyphCache) return glyphCache;
  const cols = Math.floor(NAV_SLOT_W / CELL_PX);
  const rows = Math.floor(NAV_SLOT_H / CELL_PX);
  const map = new Map<string, Glyph>();

  for (const ch of CHARSET) {
    const off = document.createElement("canvas");
    off.width = NAV_SLOT_W;
    off.height = NAV_SLOT_H;
    const octx = off.getContext("2d");
    if (!octx) continue;
    octx.font = FONT_FAMILY;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "#ffffff";
    octx.fillText(ch, NAV_SLOT_W / 2, NAV_SLOT_H / 2);
    const data = octx.getImageData(0, 0, NAV_SLOT_W, NAV_SLOT_H).data;

    const on = new Uint8Array(cols * rows);
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const px = Math.min(NAV_SLOT_W - 1, rx * CELL_PX + (CELL_PX >> 1));
        const py = Math.min(NAV_SLOT_H - 1, ry * CELL_PX + (CELL_PX >> 1));
        const idx = (py * NAV_SLOT_W + px) * 4;
        on[ry * cols + rx] = data[idx + 3] > 128 ? 1 : 0;
      }
    }
    map.set(ch, { cols, rows, on });
  }
  glyphCache = map;
  return map;
}

const DISTURB_RADIUS = 140; // letters start noticing the blob
const DECODE_RADIUS = 45; // letters fully resolved this close
const FUSION_RADIUS = 90; // link spawns its own metaball, fusing with the cursor blob

export default function MagicNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const focusIndexRef = useRef(-1);

  useEffect(() => {
    const glyphs = buildGlyphCache();
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    let blobX = 0;
    let blobY = 0;

    const noiseState = new Map<string, { char: string; until: number }>();

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

      let targetX = blobX;
      let targetY = blobY;
      let blobActive = false;

      if (mouseRef.current.active) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
        blobActive = true;
      } else if (focusIndexRef.current >= 0 && linkRefs.current[focusIndexRef.current]) {
        const r = linkRefs.current[focusIndexRef.current]!.getBoundingClientRect();
        targetX = r.left - rect.left + r.width / 2;
        targetY = r.top - rect.top + r.height / 2;
        blobActive = true;
      }

      blobX += (targetX - blobX) * 0.2;
      blobY += (targetY - blobY) * 0.2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      type Engage = { idx: number; el: HTMLAnchorElement; left: number; top: number; cx: number; cy: number; dist: number };
      const engages: Engage[] = [];
      linkRefs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const left = r.left - rect.left;
        const top = r.top - rect.top;
        const cx = left + r.width / 2;
        const cy = top + r.height / 2;
        const dist = blobActive ? Math.hypot(blobX - cx, blobY - cy) : Infinity;
        engages.push({ idx, el, left, top, cx, cy, dist });
      });

      // --- metaball field: cursor blob + a fusing blob per nearby link ---
      const balls: { x: number; y: number; r: number }[] = [];
      if (blobActive) balls.push({ x: blobX, y: blobY, r: 15 });
      for (const eng of engages) {
        if (eng.dist < FUSION_RADIUS) {
          const t = 1 - eng.dist / FUSION_RADIUS;
          balls.push({ x: eng.cx, y: eng.cy, r: 9 + t * 13 });
        }
      }

      if (balls.length) {
        const cell = 5;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const b of balls) {
          minX = Math.min(minX, b.x - b.r * 3);
          maxX = Math.max(maxX, b.x + b.r * 3);
          minY = Math.min(minY, b.y - b.r * 3);
          maxY = Math.max(maxY, b.y + b.r * 3);
        }
        minX = Math.max(0, minX);
        minY = Math.max(0, minY);
        maxX = Math.min(rect.width, maxX);
        maxY = Math.min(rect.height, maxY);

        for (let y = minY; y < maxY; y += cell) {
          for (let x = minX; x < maxX; x += cell) {
            let field = 0;
            for (const b of balls) {
              const dx = x - b.x;
              const dy = y - b.y;
              field += (b.r * b.r) / Math.max(dx * dx + dy * dy, 1);
            }
            if (field > 0.85) {
              const alpha = Math.min(1, (field - 0.85) / 0.5);
              const glow = Math.min(1, (field - 1.4) / 1.2);
              const r = Math.round(124 + glow * 80);
              const g = Math.round(58 + glow * 105);
              const b2 = Math.round(237 + glow * 15);
              ctx.fillStyle = `rgba(${r},${g},${Math.min(255, b2)},${alpha})`;
              ctx.fillRect(x, y, cell, cell);
            }
          }
        }
      }

      // --- letters: decode outward from wherever the blob makes contact ---
      engages.forEach((eng) => {
        const label = eng.el.dataset.label || "";
        for (let i = 0; i < label.length; i++) {
          const ch = label[i].toUpperCase();
          const letterCenterX = eng.left + NAV_SLOT_W * (i + 0.5);
          const letterCenterY = eng.top + NAV_SLOT_H / 2;
          const dLetter = blobActive ? Math.hypot(blobX - letterCenterX, blobY - letterCenterY) : Infinity;

          const key = `${eng.idx}-${i}`;
          let displayChar = ch;
          let decodeT = 0;

          if (dLetter < DISTURB_RADIUS) {
            decodeT = Math.max(
              0,
              Math.min(1, 1 - (dLetter - DECODE_RADIUS) / (DISTURB_RADIUS - DECODE_RADIUS)),
            );
            if (decodeT < 0.97) {
              const st = noiseState.get(key);
              if (!st || now > st.until) {
                noiseState.set(key, { char: randNoise(), until: now + 60 + Math.random() * 80 });
              }
              displayChar = noiseState.get(key)!.char;
            } else {
              noiseState.delete(key);
            }
          } else {
            noiseState.delete(key);
          }

          const g = glyphs.get(displayChar) || glyphs.get(" ")!;
          const originX = letterCenterX - (g.cols * CELL_PX) / 2;
          const originY = letterCenterY - (g.rows * CELL_PX) / 2;

          const alpha = 0.5 + 0.5 * decodeT;
          const rr = Math.round(190 + decodeT * 65);
          const gg = Math.round(165 + decodeT * 90);
          ctx.fillStyle = `rgba(${rr},${gg},255,${alpha})`;

          for (let ry = 0; ry < g.rows; ry++) {
            const top = Math.round(originY + ry * CELL_PX);
            const bottom = Math.round(originY + (ry + 1) * CELL_PX);
            for (let rx = 0; rx < g.cols; rx++) {
              if (g.on[ry * g.cols + rx]) {
                const left = Math.round(originX + rx * CELL_PX);
                const right = Math.round(originX + (rx + 1) * CELL_PX);
                ctx.fillRect(left, top, right - left, bottom - top);
              }
            }
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
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        ref={containerRef}
        className="relative pointer-events-auto flex items-center gap-8 rounded-full bg-black/40 px-8 py-3 backdrop-blur-md"
      >
        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              data-label={item.label}
              ref={(el) => {
                linkRefs.current[idx] = el;
              }}
              onFocus={() => {
                focusIndexRef.current = idx;
              }}
              onBlur={() => {
                focusIndexRef.current = -1;
              }}
              style={{ width: item.label.length * NAV_SLOT_W, height: NAV_SLOT_H }}
              className="relative block rounded text-transparent outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
