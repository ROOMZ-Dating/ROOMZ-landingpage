/**
 * Chart color system, validated with the dataviz skill's validator against the
 * site's white surface (light mode only — the site has no dark mode).
 *
 * Categorical (fixed order, never cycled; assigned Joins→Hey!s→Matches):
 *   worst adjacent CVD ΔE 9.2, normal-vision 27.6 — all gates pass. Slot 3
 *   (aqua) sits at 2.82:1 contrast, under the 3:1 mark floor — the relief rule
 *   applies, satisfied by the table view every chart ships with.
 *
 * Ordinal ramp (funnel stages): 5 purple steps, monotone L, all ΔL ≥ 0.06,
 * light end 2.72:1 — passes --ordinal.
 */
export const SERIES = ["#6B21A8", "#eb6834", "#1baf7a"] as const;

export const ORDINAL_RAMP = [
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6b21a8",
  "#3b0764",
] as const;

/** Sequential endpoints for the heatmap: one hue, light→dark. */
export const SEQ_LIGHT = "#ede9fe";
export const SEQ_DARK = "#3b0764";

export const SURFACE = "#ffffff";
export const INK = "#111113";
export const INK_SECONDARY = "#626873";
export const GRID = "#E8EAEE";
export const BASELINE = "#E1E4E9";

/** Mix the sequential ramp at t ∈ [0,1] (linear RGB — monotone in lightness). */
export function seqColor(t: number): string {
  const a = [0xed, 0xe9, 0xfe];
  const b = [0x3b, 0x07, 0x64];
  const c = a.map((av, i) => Math.round(av + (b[i] - av) * Math.max(0, Math.min(1, t))));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** 1,284 below 10K; 12.9K / 1.2M above — the stat-tile compact contract. */
export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(n) >= 10_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString("en-US");
}

/** Round an axis max up to a clean tick step. */
export function niceMax(max: number, tickCount = 4): { max: number; ticks: number[] } {
  if (max <= 0) return { max: 1, ticks: [0, 1] };
  const rough = max / tickCount;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s * tickCount >= max) ?? 10 * pow;
  const top = step * tickCount;
  return { max: top, ticks: Array.from({ length: tickCount + 1 }, (_, i) => i * step) };
}
