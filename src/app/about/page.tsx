import Link from "next/link";
import PixelHero from "@/components/PixelHero";
import TeamGrid from "@/components/TeamGrid";

const services = [
  {
    n: "01",
    title: "Brand Identity",
    description: "Logos, visual systems, and guidelines that give a business a consistent voice.",
  },
  {
    n: "02",
    title: "Web Design & Development",
    description: "Fast, responsive marketing sites and web apps built on modern frameworks.",
  },
  {
    n: "03",
    title: "Product Design",
    description: "Dashboards and internal tools designed around how your team actually works.",
  },
  {
    n: "04",
    title: "AI Research",
    description: "R&D on models built to accelerate how AI itself gets built — see /research.",
  },
];

const values = [
  { title: "Ship fast", detail: "Short iterations, real feedback, no six-month reveals." },
  { title: "Stay honest", detail: "We say what stage something is at — no fake polish." },
  { title: "Design with intent", detail: "Every screen earns its place, or it doesn't ship." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pt-32 pb-16 text-center">
        <svg
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        >
          <defs>
            <radialGradient id="aboutHeroGlow" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#241250" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#120a2e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <pattern id="aboutHeroDots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="#a78bfa" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="1200" height="500" fill="url(#aboutHeroGlow)" />
          <rect width="1200" height="500" fill="url(#aboutHeroDots)" opacity="0.5" />
        </svg>

        <div className="relative z-10">
          <PixelHero word="ABOUT US" />
          <p className="mx-auto mt-6 max-w-md text-muted">
            Project Labs X is a small studio out of Kozhikode, Kerala — design, development,
            and AI research under one roof. We ship fast, stay honest about where things
            stand, and build things worth using.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight">
            We provide various services
          </h2>
          <div>
            {services.map((service) => (
              <div key={service.n} className="border-b border-border py-6 first:pt-0 last:border-0">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent-soft">{service.n}</span>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="mt-2 max-w-lg text-sm text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white/[0.02] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Professional team</h2>
          <TeamGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How we work</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.detail}</p>
            </div>
          ))}
        </div>
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
