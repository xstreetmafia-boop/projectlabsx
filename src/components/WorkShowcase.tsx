"use client";

import { useState } from "react";

export type ShowcaseTab =
  | { type: "site"; label: string; tag: string; url: string }
  | { type: "video"; label: string; tag: string; src: string }
  | { type: "mobile"; label: string; tag: string; url: string };

const FRAME_HEIGHT = "h-[560px] sm:h-[780px]";

export default function WorkShowcase({ tabs }: { tabs: ShowcaseTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <div className="ml-3 flex flex-1 gap-1 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                i === active ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {current.type !== "video" && (
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-medium text-accent-soft hover:opacity-80"
          >
            Open ↗
          </a>
        )}
      </div>

      <div className="flex items-center justify-center bg-black/20">
        {current.type === "site" && (
          <iframe
            key={current.url}
            src={current.url}
            title={current.label}
            className={`w-full ${FRAME_HEIGHT}`}
            loading="lazy"
          />
        )}

        {current.type === "video" && (
          <video
            key={current.src}
            src={current.src}
            className={`w-full bg-black object-contain ${FRAME_HEIGHT}`}
            controls
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {current.type === "mobile" && (
          <div className={`flex ${FRAME_HEIGHT} w-full items-center justify-center py-8`}>
            <div className="w-[300px] max-w-full rounded-[2.75rem] border-[10px] border-white/10 bg-black shadow-2xl">
              <div className="relative overflow-hidden rounded-[2rem] bg-white">
                <div className="absolute top-0 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />
                <iframe key={current.url} src={current.url} title={current.label} className="h-[640px] w-[280px]" loading="lazy" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-medium text-accent-soft">{current.tag}</p>
        <h3 className="mt-1 text-lg font-semibold">{current.label}</h3>
      </div>
    </div>
  );
}
