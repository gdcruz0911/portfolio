import Image from "next/image";
import Link from "next/link";

const LEAVES = [
  [118, 58, -30], [176, 104, 40], [92, 150, -60], [262, 36, 20], [352, 70, -20],
  [402, 132, 50], [470, 48, -40], [528, 110, 30], [444, 200, -10], [214, 196, 60],
];

export default function NotFound() {
  return <section className="lost" aria-labelledby="lost-title">
    <h1 id="lost-title" className="sr-only">page not found</h1>
    <svg className="lost-art" viewBox="0 0 620 250" aria-hidden>
      <text x="310" y="215" textAnchor="middle">404</text>
      <path className="crack" d="M300 40 L316 78 L302 104 L322 140 L306 168 L326 206 L314 236" />
      <path className="vine" pathLength={1} d="M20 240 C 70 200, 60 140, 120 120 S 190 60, 260 40 S 330 20, 360 60" />
      <path className="vine" pathLength={1} d="M600 236 C 560 210, 560 160, 500 150 S 420 110, 400 60 S 450 20, 480 40" />
      <path className="vine" pathLength={1} d="M160 244 C 200 220, 220 200, 260 206 S 340 230, 400 196 S 470 180, 520 196" />
      {LEAVES.map(([x, y, angle], i) => <ellipse key={i} className="leaf" cx={x} cy={y} rx="9" ry="4.5" transform={`rotate(${angle} ${x} ${y})`} style={{ "--i": i } as React.CSSProperties} />)}
    </svg>
    <Image className="lost-otter" src="/art/sleeping-otter.webp" alt="" width={600} height={400} sizes="300px" />
    <p>nothing&rsquo;s lived here in a while.</p>
    <Link href="/" className="signature text-link">← head home</Link>
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <filter id="ink-print" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues=".184 .973" />
          <feFuncG type="table" tableValues=".310 .961" />
          <feFuncB type="table" tableValues=".435 .933" />
        </feComponentTransfer>
      </filter>
    </svg>
  </section>;
}
