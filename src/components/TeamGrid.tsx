"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const team = [
  {
    initials: "AK",
    name: "Mohammed Ali AK",
    role: "Founder · Software Engineer",
    bio: "6+ years across multiple languages",
    photo: "/mohdali-2.jpg",
  },
  {
    initials: "SD",
    name: "Sidha",
    role: "Software Engineer · UI/UX Designer",
    bio: "3+ years · storyteller, idea development",
    photo: "/sidha.jpg",
  },
  {
    initials: "INTROVERT",
    role: "Co-Founder · SEO & UI/UX",
    bio: "5+ years experience, multiple skills",
    dark: true,
  },
];

export default function TeamGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (openIndex === null) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const close = () => {
    setVisible(false);
    window.setTimeout(() => setOpenIndex(null), 300);
  };

  const active = openIndex !== null ? team[openIndex] : null;

  return (
    <>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        {team.map((member, i) => (
          <div
            key={member.initials}
            onClick={() => member.photo && setOpenIndex(i)}
            className={`relative aspect-[3/4] overflow-hidden rounded-2xl border border-border ${
              member.dark ? "bg-black" : "bg-gradient-to-br from-[#241250] to-[#7c3aed]"
            } ${i === 0 ? "sm:flex-[2]" : "sm:flex-[1]"} ${member.photo ? "cursor-zoom-in" : ""}`}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name || member.role}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4">
                <span
                  className={`text-center font-black tracking-tight text-white/90 ${
                    member.initials.length > 4 ? "text-2xl" : "text-5xl"
                  }`}
                >
                  {member.initials}
                </span>
              </div>
            )}
            {member.role && (
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="text-xs text-muted">{member.role}</p>
                {member.name && <p className="font-semibold">{member.name}</p>}
                {member.bio && <p className="mt-1 text-xs text-muted">{member.bio}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {active && (
        <div
          className={`fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-6 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        >
          <div
            className={`relative w-full max-w-2xl transition-all duration-300 ease-out ${
              visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.photo!}
              alt={active.name || active.role}
              width={900}
              height={1200}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
              priority
            />
            <div className="absolute right-0 bottom-0 left-0 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-sm text-accent-soft">{active.role}</p>
              {active.name && <p className="text-xl font-semibold">{active.name}</p>}
              {active.bio && <p className="mt-1 text-sm text-muted">{active.bio}</p>}
            </div>
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-sm text-muted hover:text-foreground"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
