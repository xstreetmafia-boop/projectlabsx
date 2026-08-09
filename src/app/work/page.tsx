import type { ShowcaseTab } from "@/components/WorkShowcase";
import WorkBackground from "@/components/WorkBackground";
import WorkHero from "@/components/WorkHero";
import WorkProcess from "@/components/WorkProcess";
import WorkShowcase from "@/components/WorkShowcase";

const showcaseTabs: ShowcaseTab[] = [
  { type: "site", label: "ProjectLabsX", tag: "Flagship", url: "https://www.projectlabsx.com/" },
  {
    type: "site",
    label: "DEMO — E-Commerce",
    tag: "Web Development",
    url: "https://e-commerce-ruby-iota-62.vercel.app/",
  },
  {
    type: "site",
    label: "Surya Communication",
    tag: "Web Development",
    url: "https://www.suryacommunication.com/",
  },
  {
    type: "site",
    label: "PropXLabs",
    tag: "Trading Education Platform",
    url: "https://propxlabs-frontend.vercel.app/",
  },
  { type: "video", label: "Project Walkthrough", tag: "Video", src: "/workvideo1.mp4" },
  { type: "mobile", label: "Heka Labs", tag: "Mobile Responsive View", url: "https://heka-data-chunk.vercel.app/" },
];

export default function WorkPage() {
  return (
    <div className="relative">
      <WorkBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24">
        <WorkHero />

        <div className="mt-16">
          <p className="text-sm font-medium text-accent-soft">Selected work</p>
          <div className="mt-8">
            <WorkShowcase tabs={showcaseTabs} />
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-black/40 p-8 backdrop-blur-sm sm:p-12">
          <p className="text-sm font-medium text-accent-soft">Process</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">How we do it.</h2>
          <div className="mt-16">
            <WorkProcess />
          </div>
        </div>
      </div>
    </div>
  );
}
