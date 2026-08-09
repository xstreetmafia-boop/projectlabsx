export default function WorkBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="workBgSkyA" cx="15%" cy="5%" r="55%">
            <stop offset="0%" stopColor="#241250" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#120a2e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="workBgSkyB" cx="82%" cy="14%" r="42%">
            <stop offset="0%" stopColor="#3a1f8a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#180d3d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <pattern id="workBgDots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="#a78bfa" fillOpacity="0.3" />
          </pattern>
        </defs>

        <rect width="1600" height="900" fill="#050214" />
        <rect width="1600" height="900" fill="url(#workBgSkyA)" />
        <rect width="1600" height="900" fill="url(#workBgSkyB)" />

        {/* sweeping arcs, upper-left cluster */}
        <g className="animate-orbit" stroke="#a78bfa" fill="none">
          <circle cx="240" cy="60" r="150" strokeOpacity="0.16" />
          <circle cx="240" cy="60" r="230" strokeOpacity="0.12" />
          <circle cx="240" cy="60" r="320" strokeOpacity="0.08" />
          <circle cx="380" cy="-30" r="190" strokeOpacity="0.1" />
        </g>

        {/* orbital rings, upper-right cluster */}
        <g className="animate-orbit" stroke="#a78bfa" fill="none">
          <circle cx="1220" cy="170" r="60" strokeOpacity="0.3" />
          <circle cx="1220" cy="170" r="110" strokeOpacity="0.22" />
          <circle cx="1220" cy="170" r="165" strokeOpacity="0.16" />
          <circle cx="1220" cy="170" r="230" strokeOpacity="0.1" />
        </g>

        <g fill="#c4b5fd">
          <circle cx="260" cy="120" r="3" fillOpacity="0.7" />
          <circle cx="460" cy="190" r="2" fillOpacity="0.5" />
          <circle cx="640" cy="90" r="2.4" fillOpacity="0.6" />
          <circle cx="110" cy="290" r="2" fillOpacity="0.4" />
          <circle cx="830" cy="230" r="2" fillOpacity="0.5" />
          <circle cx="990" cy="70" r="2.2" fillOpacity="0.55" />
          <circle cx="1310" cy="100" r="2.6" fillOpacity="0.6" />
          <circle cx="1460" cy="290" r="2" fillOpacity="0.4" />
          <circle cx="740" cy="360" r="2" fillOpacity="0.35" />
          <circle cx="1240" cy="380" r="2.2" fillOpacity="0.4" />
          <circle cx="360" cy="400" r="2" fillOpacity="0.35" />
          <circle cx="1020" cy="330" r="2" fillOpacity="0.4" />
        </g>

        {/* ringed planet */}
        <g stroke="#a78bfa" fill="none" strokeOpacity="0.6">
          <circle cx="1400" cy="150" r="22" fill="#1a1040" stroke="none" />
          <ellipse cx="1400" cy="150" rx="42" ry="12" transform="rotate(-18 1400 150)" />
        </g>

        <rect width="1600" height="900" fill="url(#workBgDots)" opacity="0.5" />

        {/* far dune */}
        <path
          d="M0,520 C220,460 400,560 620,500 C840,440 940,540 1120,500 C1320,460 1480,540 1600,490 L1600,900 L0,900 Z"
          fill="#2b1c5c"
          fillOpacity="0.5"
        />
        {/* mid dune */}
        <path
          d="M0,600 C240,660 460,560 700,610 C920,650 1060,600 1280,630 C1440,650 1560,620 1600,625 L1600,900 L0,900 Z"
          fill="#1a1040"
          fillOpacity="0.85"
        />
        {/* near dune */}
        <path
          d="M0,680 C280,760 500,630 750,680 C960,715 1100,650 1320,680 C1460,700 1560,670 1600,675 L1600,900 L0,900 Z"
          fill="#050214"
        />

        {/* sitting figure on the crest */}
        <g transform="translate(748,632) scale(1.6)" fill="#000000">
          <circle cx="0" cy="-34" r="10" />
          <path d="M -13 -24 C -18 -8 -15 6 -6 12 L -2 12 C -4 2 -2 -8 4 -15 C 11 -8 11 3 9 12 L 15 12 C 18 -2 13 -20 2 -27 C -4 -30 -9 -29 -13 -24 Z" />
        </g>
      </svg>
    </div>
  );
}
