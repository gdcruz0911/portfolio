// A brushed zen circle, left open at the end, that draws itself around a nav link.
export function Enso() {
  return <svg className="enso" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
    <path pathLength={1} d="M16 31 C 5 25, 6 9, 38 5 C 70 1, 97 7, 96 20 C 95 33, 68 37, 42 37 C 30 37, 22 35, 17 32" />
    <path pathLength={1} className="enso-dry" d="M20 32 C 9 26, 10 11, 40 7 C 69 4, 93 9, 93 20" />
  </svg>;
}
