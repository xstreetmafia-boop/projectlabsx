import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description:
    "PLX Research — the R&D arm of Project Labs X, building PLX-X1 to accelerate how AI itself gets built. Security, biosecurity, mechanical, and compute research.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research — Project Labs X",
    description: "PLX Research — building PLX-X1 to accelerate how AI itself gets built.",
    url: "/research",
  },
};

const exchange = [
  {
    role: "user",
    text: "What are you building?",
  },
  {
    role: "assistant",
    text: "We're PLX Research — the R&D arm of Project-Labs-X. Our current focus is a model built to accelerate how AI itself gets built: faster architecture search, smarter training loops, and tooling that helps researchers iterate without waiting on raw compute.",
  },
  {
    role: "user",
    text: "What areas feed into it?",
  },
  {
    role: "assistant",
    tracks: [
      { name: "Security", detail: "Automated vulnerability research and defensive red-teaming." },
      { name: "Biosecurity", detail: "Pathogen surveillance and biological threat defense — not weapons development." },
      { name: "Mechanical", detail: "Simulation and control for robotics and physical systems." },
      { name: "Compute", detail: "Hardware-aware training that squeezes more out of every CPU cycle." },
    ],
  },
  {
    role: "user",
    text: "What stage is it at?",
  },
  {
    role: "assistant",
    text: "Early. Here's where things stand — full details land when it ships.",
    status: true,
  },
  {
    role: "user",
    text: "How do I follow along?",
  },
  {
    role: "assistant",
    text: "Leave your email and we'll share updates as the research progresses.",
    cta: true,
  },
];

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <svg viewBox="0 0 900 1100" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 h-full w-full opacity-60">
        <g stroke="#a78bfa" strokeOpacity="0.10" strokeWidth="1">
          <line x1="-197.6" y1="-54.0" x2="273.6" y2="269.0" />
          <line x1="557.9" y1="48.1" x2="1051.3" y2="91.4" />
          <line x1="777.9" y1="199.9" x2="313.2" y2="238.8" />
          <line x1="732.4" y1="334.3" x2="720.9" y2="782.8" />
          <line x1="819.5" y1="594.9" x2="757.3" y2="1446.3" />
          <line x1="441.9" y1="401.4" x2="-77.2" y2="583.2" />
          <line x1="192.0" y1="475.5" x2="376.8" y2="1001.0" />
          <line x1="-28.2" y1="-102.8" x2="573.2" y2="371.9" />
          <line x1="801.0" y1="360.1" x2="357.2" y2="445.5" />
          <line x1="259.0" y1="746.9" x2="582.9" y2="895.8" />
          <line x1="349.6" y1="657.8" x2="-56.6" y2="811.4" />
          <line x1="1061.5" y1="223.9" x2="727.8" y2="664.5" />
          <line x1="-26.5" y1="176.2" x2="192.4" y2="628.9" />
          <line x1="593.3" y1="120.1" x2="672.4" y2="725.4" />
          <line x1="609.7" y1="-216.5" x2="1119.7" y2="464.8" />
          <line x1="614.4" y1="-59.9" x2="963.2" y2="244.8" />
          <line x1="542.2" y1="716.0" x2="-215.4" y2="946.7" />
          <line x1="850.4" y1="916.9" x2="366.4" y2="1164.3" />
          <line x1="491.8" y1="297.6" x2="434.8" y2="790.5" />
          <line x1="451.9" y1="-120.1" x2="987.4" y2="523.4" />
          <line x1="-136.3" y1="-73.2" x2="166.6" y2="268.1" />
          <line x1="262.3" y1="115.1" x2="138.0" y2="466.7" />
          <line x1="470.5" y1="444.1" x2="1319.2" y2="474.9" />
          <line x1="199.9" y1="380.2" x2="-122.1" y2="1180.8" />
          <line x1="663.4" y1="157.8" x2="-192.0" y2="240.8" />
          <line x1="589.6" y1="-34.4" x2="366.4" y2="487.3" />
          <line x1="474.3" y1="499.7" x2="12.6" y2="1268.4" />
          <line x1="-423.8" y1="504.9" x2="457.0" y2="607.6" />
          <line x1="236.6" y1="144.6" x2="205.6" y2="838.9" />
          <line x1="780.1" y1="229.4" x2="401.6" y2="971.6" />
        </g>
        <g fill="#7c3aed" fillOpacity="0.14" stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="1">
          <path d="M 255.0 270.8 L 273.5 193.8 L 328.8 147.0 L 383.4 226.4 L 341.5 293.8 Z" />
          <path d="M 499.0 107.1 L 568.4 84.4 L 641.4 149.3 L 571.5 203.1 L 515.5 164.4 Z" />
          <path d="M 398.2 367.1 L 479.9 363.2 L 558.3 402.6 L 490.3 520.5 L 421.3 472.6 Z" />
          <path d="M 76.2 587.5 L 87.0 535.0 L 111.3 510.9 L 141.6 517.7 L 166.2 561.3 L 157.4 612.9 L 87.0 619.7 Z" />
          <path d="M 55.0 499.4 L 77.3 463.6 L 96.6 448.1 L 153.3 451.7 L 149.2 481.3 L 122.2 517.5 L 98.8 533.2 Z" />
          <path d="M 88.7 174.5 L 114.9 131.1 L 147.2 114.9 L 178.0 155.4 L 169.6 200.9 L 119.6 200.3 Z" />
          <path d="M 348.8 825.0 L 404.1 780.4 L 468.5 874.1 L 406.7 917.5 L 351.4 892.5 Z" />
          <path d="M 135.5 287.4 L 137.8 264.9 L 168.7 254.5 L 222.7 256.7 L 203.7 306.8 L 181.7 331.1 L 144.1 340.2 Z" />
          <path d="M 491.2 956.1 L 497.0 911.3 L 552.4 918.8 L 578.6 942.0 L 590.9 965.6 L 585.6 1026.8 L 545.2 1038.5 L 509.2 1005.3 Z" />
          <path d="M 439.0 480.1 L 465.8 424.4 L 485.4 398.9 L 545.1 419.8 L 561.8 466.6 L 554.5 495.4 L 492.0 518.5 Z" />
          <path d="M 734.8 103.4 L 795.2 79.9 L 836.3 75.2 L 839.5 113.0 L 839.5 152.1 L 794.3 194.0 L 754.5 174.8 Z" />
          <path d="M 649.3 378.8 L 672.9 310.4 L 723.9 281.4 L 786.7 358.8 L 750.7 408.4 Z" />
          <path d="M 149.8 170.4 L 180.7 144.9 L 215.1 159.1 L 234.2 203.7 L 218.6 228.9 L 187.6 224.6 L 156.8 195.3 Z" />
          <path d="M 253.2 832.2 L 289.9 814.1 L 341.9 805.1 L 340.6 848.1 L 333.3 893.6 L 309.0 900.6 L 260.8 884.4 Z" />
          <path d="M 166.6 636.6 L 174.9 594.0 L 203.2 576.3 L 232.0 581.5 L 252.7 624.8 L 232.8 668.6 L 203.2 679.0 Z" />
          <path d="M 485.9 422.7 L 513.4 363.4 L 585.4 395.3 L 603.6 438.5 L 600.6 482.5 L 538.9 475.8 Z" />
        </g>
      </svg>

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-6 pt-28 pb-10">
        <header className="mb-8 flex items-center justify-between border-b border-border pb-6">
          <div>
            <p className="text-sm font-medium text-accent-soft">PLX Research</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">AI for AI</h1>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            training — 2026
          </span>
        </header>

        <div className="flex flex-1 flex-col gap-5">
          {exchange.map((msg, i) => {
            if (msg.role === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-white">
                    {msg.text}
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-white/[0.03] px-5 py-4 text-sm text-foreground">
                  {msg.text && <p className={msg.tracks || msg.status || msg.cta ? "mb-4 text-muted" : ""}>{msg.text}</p>}

                  {msg.tracks && (
                    <ul className="space-y-3">
                      {msg.tracks.map((track) => (
                        <li key={track.name}>
                          <span className="font-semibold text-accent-soft">{track.name}</span>
                          <span className="text-muted"> — {track.detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {msg.status && (
                    <div className="rounded-xl border border-border bg-black/40 p-4 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="text-muted">model</span>
                        <span>PLX-X1</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border py-3">
                        <span className="text-muted">status</span>
                        <span className="text-accent-soft">training…</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border py-3">
                        <span className="text-muted">parameters</span>
                        <span className="tracking-widest">████ ████</span>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-muted">launch</span>
                        <span>2026</span>
                      </div>
                    </div>
                  )}

                  {msg.cta && (
                    <Link
                      href="mailto:projecthekalabs@gmail.com"
                      className="inline-block rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Get in touch
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-3 rounded-full border border-border bg-white/[0.02] px-5 py-3 opacity-50">
            <span className="flex-1 text-sm text-muted">Ask PLX Research…</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-muted">Send</span>
          </div>
          <p className="mt-2 text-center text-xs text-muted">
            Static preview — this input isn&apos;t a live chat yet.
          </p>
        </div>
      </div>
    </div>
  );
}
