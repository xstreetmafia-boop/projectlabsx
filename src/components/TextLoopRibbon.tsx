"use client";

import { useEffect, useRef } from "react";

const WORDS = [
  "CASE STUDIES",
  "SHOWCASE",
  "WORK",
  "PROJECTS",
  "SELECTED WORK",
  "EXPERIENCE",
  "PROOF OF WORK",
  "PROJECT ARCHIVE",
  "LAB",
  "WORKS",
  "BUILDS",
  "EXPERIMENTS",
];
const LOOP_TEXT = WORDS.join(" ✦ ") + " ✦ ";
const SPEED = 0.5; // px per frame
const AMPLITUDE = 26;
const FREQUENCY = (Math.PI * 2) / 320; // px per full wave cycle
const RIBBON_WIDTH = 42;
const FONT_PX = 20;
const FONT = `800 ${FONT_PX}px "Arial Black", Impact, sans-serif`;

export default function TextLoopRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let cancelled = false;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let baseline = 0;

    const chars = Array.from(LOOP_TEXT);
    const measure = document.createElement("canvas").getContext("2d");
    let charWidths: number[] = [];
    let patternWidth = 0;
    if (measure) {
      measure.font = FONT;
      charWidths = chars.map((ch) => measure.measureText(ch).width);
      patternWidth = charWidths.reduce((a, b) => a + b, 0);
    }

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      baseline = height / 2;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const waveY = (x: number) => baseline + Math.sin(x * FREQUENCY) * AMPLITUDE;
    const waveSlope = (x: number) => Math.cos(x * FREQUENCY) * AMPLITUDE * FREQUENCY;

    let offset = 0;

    const tick = () => {
      if (cancelled) return;
      offset = patternWidth > 0 ? (offset + SPEED) % patternWidth : 0;

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = RIBBON_WIDTH;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#7c3aed";
      ctx.beginPath();
      for (let x = -10; x <= width + 10; x += 6) {
        const y = waveY(x);
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (patternWidth > 0) {
        ctx.font = FONT;
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";

        let startX = -patternWidth - offset;
        while (startX < width + patternWidth) {
          let cx = startX;
          for (let i = 0; i < chars.length; i++) {
            const chWidth = charWidths[i];
            const charCenter = cx + chWidth / 2;
            if (charCenter > -40 && charCenter < width + 40) {
              const y = waveY(charCenter);
              const angle = Math.atan(waveSlope(charCenter));
              ctx.save();
              ctx.translate(charCenter, y);
              ctx.rotate(angle);
              ctx.fillText(chars[i], -chWidth / 2, 0);
              ctx.restore();
            }
            cx += chWidth;
          }
          startX += patternWidth;
        }
      }

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
    <div className="relative h-28 w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
