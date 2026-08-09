import type { Metadata } from "next";
import Link from "next/link";
import PixelHero from "@/components/PixelHero";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Project Labs X. Studio based in Ramanattukara, Kozhikode, Kerala. ${SITE_EMAIL} · ${SITE_PHONE}`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Project Labs X",
    description: "Get in touch with Project Labs X — Ramanattukara, Kozhikode, Kerala.",
    url: "/contact",
  },
};

const landmarks = [
  { label: "NISARI JUNCTION", x: 46, y: 40 },
  { label: "SURABHI JUNCTION", x: 74, y: 20 },
  { label: "FEROKE · 5KM", x: 90, y: 58 },
  { label: "KOZHIKODE · 16KM", x: 14, y: 12 },
];

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pt-32 pb-16 text-center">
        <svg
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        >
          <defs>
            <radialGradient id="contactHeroGlow" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#241250" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#120a2e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <pattern id="contactHeroDots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="#a78bfa" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="1200" height="500" fill="url(#contactHeroGlow)" />
          <rect width="1200" height="500" fill="url(#contactHeroDots)" opacity="0.5" />
        </svg>

        <div className="relative z-10">
          <PixelHero word="CONTACT" heading />
          <p className="mx-auto mt-6 max-w-md text-muted">
            We work with clients everywhere from our studio. Drop us a line if you&apos;re
            starting something new — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-16 px-6 pb-24 sm:grid-cols-2">
        <div>
          <p className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium tracking-widest text-accent-soft">
            HOW TO FIND US
          </p>
          <div className="mt-6 border-l border-border pl-6 text-lg leading-relaxed">
            Project Labs X
            <br />
            5V9G+J7G Nisari Mall, Nisari Junction
            <br />
            Ramanattukara, Kozhikode
            <br />
            Kerala 673634
          </div>
        </div>

        <div>
          <p className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium tracking-widest text-accent-soft">
            HOW TO TALK TO US
          </p>
          <div className="mt-6 space-y-6 text-lg leading-relaxed">
            <div>
              <p className="text-sm text-muted">General enquiries</p>
              <a href="mailto:projecthekalabs@gmail.com" className="text-accent-soft hover:opacity-80">
                projecthekalabs@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm text-muted">Phone</p>
              <a href="tel:+917356640404" className="text-accent-soft hover:opacity-80">
                +91 73566 40404
              </a>
            </div>
            <Link
              href="mailto:projecthekalabs@gmail.com"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="relative h-[420px] w-full overflow-hidden border-y border-border bg-[#050214] sm:h-[520px]">
        <svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <rect width="1600" height="700" fill="#050214" />

          <g stroke="#7c3aed" strokeOpacity="0.22" strokeWidth="1.5">
            <line x1="20" y1="0" x2="20" y2="700" />
            <line x1="131" y1="0" x2="131" y2="700" />
            <line x1="274" y1="0" x2="274" y2="700" />
            <line x1="417" y1="0" x2="417" y2="700" />
            <line x1="543" y1="0" x2="543" y2="700" />
            <line x1="694" y1="0" x2="694" y2="700" />
            <line x1="811" y1="0" x2="811" y2="700" />
            <line x1="961" y1="0" x2="961" y2="700" />
            <line x1="1116" y1="0" x2="1116" y2="700" />
            <line x1="1229" y1="0" x2="1229" y2="700" />
            <line x1="1383" y1="0" x2="1383" y2="700" />
            <line x1="1540" y1="0" x2="1540" y2="700" />
            <line x1="0" y1="20" x2="1600" y2="20" />
            <line x1="0" y1="150" x2="1600" y2="150" />
            <line x1="0" y1="230" x2="1600" y2="230" />
            <line x1="0" y1="310" x2="1600" y2="310" />
            <line x1="0" y1="413" x2="1600" y2="413" />
            <line x1="0" y1="552" x2="1600" y2="552" />
            <line x1="0" y1="669" x2="1600" y2="669" />
          </g>
          <g stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="2">
            <line x1="0" y1="620" x2="900" y2="40" />
            <line x1="300" y1="700" x2="1600" y2="120" />
          </g>
          <text x="60" y="600" fill="#c4b5fd" fillOpacity="0.5" fontSize="12" fontFamily="var(--font-mono)" transform="rotate(-33 60 600)">
            NH 66
          </text>

          <path
            d="M0,640 C260,600 420,660 620,630 C860,595 1020,650 1220,615 C1380,590 1500,610 1600,600"
            fill="none"
            stroke="#3d5fd9"
            strokeOpacity="0.4"
            strokeWidth="10"
          />
          <text x="1250" y="590" fill="#8fb0ff" fillOpacity="0.6" fontSize="12" fontFamily="var(--font-mono)">
            CHALIYAR RIVER
          </text>

          <rect x="1180" y="60" width="260" height="150" fill="url(#contactDots)" opacity="0.5" />
          <defs>
            <pattern id="contactDots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#a78bfa" fillOpacity="0.5" />
            </pattern>
          </defs>

          {landmarks.map((l) => (
            <g key={l.label} transform={`translate(${(l.x / 100) * 1600}, ${(l.y / 100) * 700})`}>
              <rect x="-4" y="-4" width="8" height="8" fill="#a78bfa" fillOpacity="0.6" />
              <text x="10" y="4" fill="#c4b5fd" fillOpacity="0.7" fontSize="13" fontFamily="var(--font-mono)">
                {l.label}
              </text>
            </g>
          ))}

          <g transform="translate(800,350)">
            <circle r="26" fill="#7c3aed" />
            <circle r="26" fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="6" />
            <text x="0" y="-40" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700">
              PROJECT-LABS-X
            </text>
          </g>
        </svg>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:flex-row sm:justify-between">
          <div className="flex gap-4 text-sm text-muted">
            <a href="#" className="hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground">
              LinkedIn
            </a>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-muted sm:items-end">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/work" className="hover:text-foreground">
              Work
            </Link>
            <Link href="/research" className="hover:text-foreground">
              Research
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>

        <Link
          href="/work"
          className="group flex items-center justify-between border-t border-border px-6 py-10 transition-colors hover:bg-white/[0.02] sm:px-12 sm:py-14"
        >
          <span className="text-5xl font-black tracking-tight sm:text-7xl">SEE WORK</span>
          <span className="text-4xl text-accent-soft transition-transform group-hover:translate-x-2 sm:text-6xl">
            →
          </span>
        </Link>
      </footer>
    </div>
  );
}
