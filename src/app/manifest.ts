import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Design, Development & AI Research Studio`,
    short_name: SITE_NAME,
    description: "Design, development, and AI research studio based in Kozhikode, Kerala.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
