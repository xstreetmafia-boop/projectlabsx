"use client";

import { useEffect, useRef } from "react";

const WIDTH = 3000;
const HEIGHT = 800;

const NAMES = [
  "PROJECT-LABSX",
  "പ്രോജക്റ്റ്-ലാബ്സ്എക്സ്",
  "项目实验室 X",
  "プロジェクトラボX",
  "प्रोजेक्ट-लैब्स X",
];

const FLICKER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*+-/<>[]{}?!";
const randomChar = () => FLICKER_CHARS[(Math.random() * FLICKER_CHARS.length) | 0];

const REVEAL_INTERVAL = 110; // ms per character lock-in (slowmo pacing)
const FLICKER_INTERVAL = 70; // ms between scramble redraws
const HOLD_DURATION = 1500; // ms to hold a fully-revealed name

const MAIN_TEXT_MAX_WIDTH = WIDTH * 0.88;
const MAIN_TEXT_FONT_SIZE = HEIGHT * 0.9;
const SLIDE_DISTANCE = HEIGHT * 0.07;

// Renders text as a chunky pixel-bubble glyph (white fill, black step outline).
// When maxWidth is given, the font size auto-shrinks to fit it — needed since
// the animated word swaps between scripts of very different lengths/widths.
function pixelateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  fontSize: number,
  cell: number,
  fillColor: string,
  outlineColor: string,
  fontFamily: string = '"Arial Black", Impact, sans-serif',
  maxWidth?: number,
) {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return;

  let size = fontSize;
  if (maxWidth) {
    for (; size > 28; size -= 4) {
      probe.font = `900 ${size}px ${fontFamily}`;
      if (probe.measureText(text).width <= maxWidth) break;
    }
  }
  const cellSize = maxWidth ? Math.max(2, Math.round(size / 32)) : cell;

  probe.font = `900 ${size}px ${fontFamily}`;
  const textWidth = probe.measureText(text).width;

  const srcW = Math.ceil((textWidth + size) / cellSize) * cellSize;
  const srcH = Math.ceil((size * 1.8) / cellSize) * cellSize;

  const off = document.createElement("canvas");
  off.width = srcW;
  off.height = srcH;
  const octx = off.getContext("2d");
  if (!octx) return;
  octx.font = `900 ${size}px ${fontFamily}`;
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillStyle = "#ffffff";
  octx.fillText(text, srcW / 2, srcH / 2);

  const cols = Math.floor(srcW / cellSize);
  const rows = Math.floor(srcH / cellSize);
  const data = octx.getImageData(0, 0, srcW, srcH).data;

  const on: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      const px = rx * cellSize + Math.floor(cellSize / 2);
      const py = ry * cellSize + Math.floor(cellSize / 2);
      const idx = (py * srcW + px) * 4;
      on[ry][rx] = data[idx + 3] > 128;
    }
  }

  const outline: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      if (!on[ry][rx]) continue;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = ry + dy;
          const nx = rx + dx;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) outline[ny][nx] = true;
        }
      }
    }
  }

  const originX = centerX - (cols * cellSize) / 2;
  const originY = centerY - (rows * cellSize) / 2;

  const cellRect = (rx: number, ry: number) => {
    const left = Math.round(originX + rx * cellSize);
    const top = Math.round(originY + ry * cellSize);
    const right = Math.round(originX + (rx + 1) * cellSize);
    const bottom = Math.round(originY + (ry + 1) * cellSize);
    return [left, top, right - left, bottom - top] as const;
  };

  ctx.fillStyle = outlineColor;
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      if (outline[ry][rx]) ctx.fillRect(...cellRect(rx, ry));
    }
  }
  ctx.fillStyle = fillColor;
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      if (on[ry][rx]) ctx.fillRect(...cellRect(rx, ry));
    }
  }
}

function drawBackground(bctx: CanvasRenderingContext2D) {
  bctx.fillStyle = "#000000";
  bctx.fillRect(0, 0, WIDTH, HEIGHT);
}

export default function ZectPixelArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.imageSmoothingEnabled = false;

    const bg = document.createElement("canvas");
    bg.width = WIDTH;
    bg.height = HEIGHT;
    const bctx = bg.getContext("2d");
    if (!bctx) return;
    drawBackground(bctx);

    let nameIndex = 0;
    let revealed = 0;
    let phase: "revealing" | "holding" = "revealing";
    let phaseStart = performance.now();
    let lastReveal = performance.now();
    let lastFlicker = performance.now();
    let cancelled = false;
    let raf = 0;

    const draw = (text: string, slideOffset: number) => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(bg, 0, 0);
      pixelateText(
        ctx,
        text,
        WIDTH / 2,
        HEIGHT / 2 + slideOffset,
        MAIN_TEXT_FONT_SIZE,
        8,
        "#ffffff",
        "#0a0a0a",
        undefined,
        MAIN_TEXT_MAX_WIDTH,
      );
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const target = NAMES[nameIndex];
      const len = target.length;

      if (phase === "revealing") {
        if (now - lastReveal > REVEAL_INTERVAL) {
          revealed = Math.min(len, revealed + 1);
          lastReveal = now;
        }
        if (now - lastFlicker > FLICKER_INTERVAL) {
          lastFlicker = now;
          let s = "";
          for (let i = 0; i < len; i++) s += i < revealed ? target[i] : randomChar();
          const slide = (1 - revealed / len) * SLIDE_DISTANCE;
          draw(s, slide);
        }
        if (revealed >= len) {
          phase = "holding";
          phaseStart = now;
          draw(target, 0);
        }
      } else if (now - phaseStart > HOLD_DURATION) {
        nameIndex = (nameIndex + 1) % NAMES.length;
        revealed = 0;
        phase = "revealing";
        lastReveal = now;
        lastFlicker = now;
      }

      raf = requestAnimationFrame(tick);
    };

    let initial = "";
    for (let i = 0; i < NAMES[0].length; i++) initial += randomChar();
    draw(initial, SLIDE_DISTANCE);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", maxWidth: 900, height: "auto", imageRendering: "pixelated" }}
      />
    </div>
  );
}
