"use client";

import { useEffect, useState } from "react";

const SIZE = 3;
const CELL = 20;
const GAP = 3;
const MOVE_INTERVAL = 750;

function neighbors(emptyIdx: number): number[] {
  const r = Math.floor(emptyIdx / SIZE);
  const c = emptyIdx % SIZE;
  const result: number[] = [];
  if (r > 0) result.push(emptyIdx - SIZE);
  if (r < SIZE - 1) result.push(emptyIdx + SIZE);
  if (c > 0) result.push(emptyIdx - 1);
  if (c < SIZE - 1) result.push(emptyIdx + 1);
  return result;
}

// Ambient decoration: a 3x3 sliding puzzle that shuffles itself forever,
// one legal move at a time — never "solved," just always quietly moving.
export default function MiniPuzzle() {
  const [positions, setPositions] = useState<number[]>(() =>
    Array.from({ length: SIZE * SIZE }, (_, i) => i),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPositions((prev) => {
        const emptyTile = prev.length - 1;
        const emptyPos = prev[emptyTile];
        const candidates = neighbors(emptyPos);
        const targetPos = candidates[(Math.random() * candidates.length) | 0];
        const movingTile = prev.findIndex((p) => p === targetPos);
        const next = [...prev];
        next[movingTile] = emptyPos;
        next[emptyTile] = targetPos;
        return next;
      });
    }, MOVE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const total = SIZE * CELL + (SIZE - 1) * GAP;

  return (
    <div className="relative" style={{ width: total, height: total }}>
      {positions.map((pos, tile) => {
        if (tile === positions.length - 1) return null;
        const r = Math.floor(pos / SIZE);
        const c = pos % SIZE;
        return (
          <div
            key={tile}
            className="absolute rounded-[3px] bg-[#241250] transition-all duration-500 ease-in-out"
            style={{
              width: CELL,
              height: CELL,
              left: c * (CELL + GAP),
              top: r * (CELL + GAP),
            }}
          />
        );
      })}
    </div>
  );
}
