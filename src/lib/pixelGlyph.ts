export type Glyph = { cols: number; rows: number; on: Uint8Array };

export const NOISE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*+-/<>[]{}?!";

export function randomNoiseChar(charset: string = NOISE_CHARSET): string {
  return charset[(Math.random() * charset.length) | 0];
}

// Rasterizes every character in `charset` into a fixed-size pixel-bubble bitmap
// once, so per-frame redraws only ever blit cached boolean grids.
export function buildGlyphCache(
  charset: string,
  fontPx: number,
  slotW: number,
  slotH: number,
  cellPx: number,
): Map<string, Glyph> {
  const cols = Math.floor(slotW / cellPx);
  const rows = Math.floor(slotH / cellPx);
  const fontFamily = `900 ${fontPx}px "Arial Black", Impact, sans-serif`;
  const map = new Map<string, Glyph>();

  for (const ch of charset) {
    const off = document.createElement("canvas");
    off.width = slotW;
    off.height = slotH;
    const octx = off.getContext("2d");
    if (!octx) continue;
    octx.font = fontFamily;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "#ffffff";
    octx.fillText(ch, slotW / 2, slotH / 2);
    const data = octx.getImageData(0, 0, slotW, slotH).data;

    const on = new Uint8Array(cols * rows);
    for (let ry = 0; ry < rows; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        const px = Math.min(slotW - 1, rx * cellPx + (cellPx >> 1));
        const py = Math.min(slotH - 1, ry * cellPx + (cellPx >> 1));
        const idx = (py * slotW + px) * 4;
        on[ry * cols + rx] = data[idx + 3] > 128 ? 1 : 0;
      }
    }
    map.set(ch, { cols, rows, on });
  }
  return map;
}

export function drawGlyph(
  ctx: CanvasRenderingContext2D,
  glyph: Glyph,
  centerX: number,
  centerY: number,
  cellPx: number,
) {
  // Snap every cell edge to a whole pixel — adjacent fillRects at fractional
  // coordinates each get antialiased independently, leaving faint seams
  // between them (a grid/checkerboard texture) once the canvas is scaled.
  const originX = centerX - (glyph.cols * cellPx) / 2;
  const originY = centerY - (glyph.rows * cellPx) / 2;
  for (let ry = 0; ry < glyph.rows; ry++) {
    const top = Math.round(originY + ry * cellPx);
    const bottom = Math.round(originY + (ry + 1) * cellPx);
    for (let rx = 0; rx < glyph.cols; rx++) {
      if (glyph.on[ry * glyph.cols + rx]) {
        const left = Math.round(originX + rx * cellPx);
        const right = Math.round(originX + (rx + 1) * cellPx);
        ctx.fillRect(left, top, right - left, bottom - top);
      }
    }
  }
}

// True metaball field: evaluated directly per grid cell (sum of r^2/d^2 per
// ball, soft-thresholded), not a blurred fake.
export function drawMetaballField(
  ctx: CanvasRenderingContext2D,
  balls: { x: number; y: number; r: number }[],
  bounds: { minX: number; minY: number; maxX: number; maxY: number },
  cell: number,
  colorAt: (glow: number, alpha: number) => string,
) {
  for (let y = bounds.minY; y < bounds.maxY; y += cell) {
    for (let x = bounds.minX; x < bounds.maxX; x += cell) {
      let field = 0;
      for (const b of balls) {
        const dx = x - b.x;
        const dy = y - b.y;
        field += (b.r * b.r) / Math.max(dx * dx + dy * dy, 1);
      }
      if (field > 0.85) {
        const alpha = Math.min(1, (field - 0.85) / 0.5);
        const glow = Math.min(1, (field - 1.4) / 1.2);
        ctx.fillStyle = colorAt(glow, alpha);
        ctx.fillRect(x, y, cell, cell);
      }
    }
  }
}
