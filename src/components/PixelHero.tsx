"use client";

import { useEffect, useRef } from "react";
import { buildGlyphCache, drawGlyph, randomNoiseChar } from "@/lib/pixelGlyph";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-";

const HEIGHT = 480;
const FONT_PX = 320;
const CELL_PX = 13;
const SLOT_W = 300;
const SLOT_H = 380;
const STEP = SLOT_W * 0.82;

const REVEAL_INTERVAL = 90;
const FLICKER_INTERVAL = 60;

export default function PixelHero({
  word,
  maxWidth = 1600,
  heading = false,
}: {
  word: string;
  maxWidth?: number;
  heading?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalWidth = STEP * word.length;
    const width = Math.round(totalWidth + SLOT_W * 1.6);

    canvas.width = width;
    canvas.height = HEIGHT;
    ctx.imageSmoothingEnabled = false;

    const glyphs = buildGlyphCache(CHARSET, FONT_PX, SLOT_W, SLOT_H, CELL_PX);

    let cancelled = false;
    let raf = 0;
    let revealed = 0;
    let lastReveal = performance.now();
    let lastFlicker = performance.now();

    const draw = (text: string) => {
      ctx.clearRect(0, 0, width, HEIGHT);
      let cursorX = width / 2 - totalWidth / 2;
      const centerY = HEIGHT / 2;
      ctx.fillStyle = "#ffffff";
      for (const ch of text) {
        const glyph = glyphs.get(ch);
        if (glyph) drawGlyph(ctx, glyph, cursorX + STEP / 2, centerY, CELL_PX);
        cursorX += STEP;
      }
    };

    const tick = (now: number) => {
      if (cancelled) return;
      if (revealed < word.length) {
        if (now - lastReveal > REVEAL_INTERVAL) {
          revealed++;
          lastReveal = now;
        }
        if (now - lastFlicker > FLICKER_INTERVAL) {
          lastFlicker = now;
          let s = "";
          for (let i = 0; i < word.length; i++) {
            s += i < revealed || word[i] === " " ? word[i] : randomNoiseChar(CHARSET);
          }
          draw(s);
        }
        raf = requestAnimationFrame(tick);
      } else {
        draw(word);
      }
    };

    let initial = "";
    for (let i = 0; i < word.length; i++) {
      initial += word[i] === " " ? " " : randomNoiseChar(CHARSET);
    }
    draw(initial);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [word]);

  const AccessibleText = heading ? "h1" : "span";

  return (
    <div>
      <AccessibleText className="sr-only">{word}</AccessibleText>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth, height: "auto", imageRendering: "pixelated" }}
        className="mx-auto"
        aria-hidden="true"
      />
    </div>
  );
}
