// A slightly wobbly hand-drawn rule that draws itself in once.
export function Brushstroke() {
  return <svg className="brushstroke" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
    <path pathLength={1} d="M2 8 C 30 4, 55 9, 90 6 S 150 3, 172 7 S 192 8, 198 5" />
  </svg>;
}
