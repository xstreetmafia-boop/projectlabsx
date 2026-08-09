import Link from "next/link";
import PixelHero from "@/components/PixelHero";
import TextLoopRibbon from "@/components/TextLoopRibbon";
import ZectPixelArt from "@/components/ZectPixelArt";

const services = [
  {
    title: "Brand Identity",
    description: "Logos, visual systems, and guidelines that give a business a consistent voice.",
  },
  {
    title: "Web Design & Development",
    description: "Fast, responsive marketing sites and web apps built on modern frameworks.",
  },
  {
    title: "Product Design",
    description: "Dashboards and internal tools designed around how your team actually works.",
  },
];

const stats = [
  { value: "3+", label: "Products shipped" },
  { value: "4", label: "Active projects" },
  { value: "2026", label: "Founded" },
];

export default function Home() {
  return (
    <div>
      <ZectPixelArt />

      <TextLoopRibbon />

      <section id="research" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">AI Research &amp; Development</h2>
          <span className="text-sm font-medium text-accent-soft">● R&amp;D — Ongoing</span>
        </div>
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium text-accent-soft">Now in training</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              We&apos;re training a new model.
            </h3>
            <p className="mt-6 max-w-lg text-muted">
              PLX-X1 is being built to accelerate how AI itself gets developed — faster
              architecture search, smarter training loops, and tooling drawn from our
              security, biosecurity, mechanical, and compute research tracks.
            </p>
            <Link
              href="/research"
              className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-white/30"
            >
              Follow the research
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-white/[0.02] p-6 font-mono text-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-muted">model</span>
              <span>PLX-X1</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <span className="text-muted">status</span>
              <span className="text-accent-soft">training…</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <span className="text-muted">parameters</span>
              <span className="tracking-widest">████ ████</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-muted">launch</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl font-semibold tracking-tight">What we do</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-accent-soft">About</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              A small studio out of Kerala, building brands, products, and AI.
            </h2>
            <p className="mt-6 max-w-lg text-muted">
              We handle brand identity, web design and development, product design, and AI
              research — end to end, for teams who want one team across the whole build.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 self-start sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold tracking-tight text-accent">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Drop a line and we&apos;ll usually reply within one business day.
          </p>
          <Link
            href="mailto:projecthekalabs@gmail.com"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-lg text-muted">Let&apos;s build something worth shipping.</p>
          <div className="flex gap-16">
            <div>
              <p className="text-sm text-muted">Site</p>
              <nav className="mt-4 flex flex-col gap-2 text-sm">
                <Link href="/" className="hover:text-accent-soft">
                  Home
                </Link>
                <Link href="/work" className="hover:text-accent-soft">
                  Work
                </Link>
                <Link href="/about" className="hover:text-accent-soft">
                  About
                </Link>
                <Link href="/research" className="hover:text-accent-soft">
                  Research
                </Link>
              </nav>
            </div>
            <div>
              <p className="text-sm text-muted">Contact</p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a href="mailto:projecthekalabs@gmail.com" className="hover:text-accent-soft">
                  Email
                </a>
                <Link href="/contact" className="hover:text-accent-soft">
                  Contact page
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden px-6 py-8">
          <PixelHero word="PROJECT-LABSX" maxWidth={2400} />
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Project Labs X. All rights reserved.</p>
            <p>Design &amp; AI research studio — Kozhikode, Kerala.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
