import ProjectConstellation from "@/components/ProjectConstellation";

export default function WorkHero() {
  return (
    <div className="relative flex min-h-[70vh] flex-col justify-end gap-8 pb-12 sm:flex-row sm:items-end sm:justify-between">
      <div className="absolute inset-0 z-0">
        <ProjectConstellation />
      </div>

      <div className="relative z-10">
        <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-accent-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> PROJECT-LABS-X
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The work between <span className="text-accent">the work.</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-muted">
          Hover the sky — every project lives up there. Click one to open it.
        </p>
      </div>
      <p className="relative z-10 max-w-[240px] text-sm leading-relaxed text-muted sm:text-right">
        We don&apos;t rush the process.
        <br />
        It reveals itself.
        <br />
        It always has.
      </p>
    </div>
  );
}
