"use client";

import { useEffect, useRef } from "react";

type Page = { label: string; url: string };

// Free live-screenshot service (no API key) — regenerates automatically, so
// every slide stays a real, current thumbnail without manual capture.
const screenshotUrl = (url: string) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1000&h=700`;

export default function ProjectCarousel({
  siteUrl,
  title,
  tag,
  pages,
}: {
  siteUrl: string;
  title: string;
  tag: string;
  pages: Page[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;

    const tick = () => {
      if (!pausedRef.current) {
        const singleSetWidth = el.scrollWidth / 2;
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
      window.clearTimeout(resumeTimer.current);
    };
    const scheduleResume = () => {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, 1800);
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", scheduleResume);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", scheduleResume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", scheduleResume);
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer.current);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", scheduleResume);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", scheduleResume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", scheduleResume);
      el.removeEventListener("wheel", pause);
    };
  }, []);

  const track = [...pages, ...pages];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 flex-1 truncate rounded-full bg-black/30 px-4 py-1.5 text-xs text-muted hover:text-foreground"
        >
          {siteUrl}
        </a>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium text-accent-soft hover:opacity-80"
        >
          Open ↗
        </a>
      </div>

      <div
        ref={trackRef}
        className="flex h-[420px] cursor-grab snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4 py-6 [scrollbar-width:thin] active:cursor-grabbing sm:h-[640px]"
      >
        {track.map((page, i) => (
          <a
            key={`${page.url}-${i}`}
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-white/[0.02]"
          >
            <div className="aspect-video w-[300px] sm:w-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshotUrl(page.url)}
                alt={`${title} — ${page.label}`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <p className="px-3 py-2 text-xs text-muted">{page.label}</p>
          </a>
        ))}
      </div>

      <div className="p-6">
        <p className="text-xs font-medium text-accent-soft">{tag}</p>
        <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
