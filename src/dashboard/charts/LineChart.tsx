import { useMemo, useState } from "react";
import {
  BASELINE,
  GRID,
  INK_SECONDARY,
  fmt,
  niceMax,
} from "./tokens";
import {
  ChartTooltip,
  Legend,
  TableView,
  TooltipRow,
  useMeasure,
} from "./primitives";

export type LineSeries = { key: string; label: string; color: string };
export type LinePoint = { t: number } & Record<string, number>;

const M = { top: 12, right: 16, bottom: 30, left: 44 };
const HEIGHT = 240;

function formatTick(t: number, spanMs: number): string {
  const d = new Date(t);
  return spanMs > 3 * 24 * 3.6e6
    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

/**
 * Multi-series line chart: 2px round-capped lines, hairline solid grid,
 * crosshair snapped to the nearest x with a single all-series tooltip, and
 * arrow-key navigation carrying the same readout for keyboard users.
 */
export default function LineChart({
  series,
  points,
  ariaLabel,
}: {
  series: LineSeries[];
  points: LinePoint[];
  ariaLabel: string;
}) {
  const [wrapRef, width] = useMeasure<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const plotW = Math.max(0, width - M.left - M.right);
  const plotH = HEIGHT - M.top - M.bottom;

  const { yTicks, x, y, spanMs } = useMemo(() => {
    const maxVal = Math.max(
      1,
      ...points.flatMap((p) => series.map((s) => p[s.key] ?? 0)),
    );
    const { max, ticks } = niceMax(maxVal);
    const t0 = points[0]?.t ?? 0;
    const t1 = points[points.length - 1]?.t ?? 1;
    const span = Math.max(1, t1 - t0);
    return {
      yMax: max,
      yTicks: ticks,
      spanMs: span,
      x: (t: number) => M.left + ((t - t0) / span) * plotW,
      y: (v: number) => M.top + plotH - (v / max) * plotH,
    };
  }, [points, series, plotW, plotH]);

  if (points.length === 0) return null;

  const nearestIndex = (px: number) => {
    let best = 0;
    let bestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(x(p.t) - px);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };

  const xTickIdx = [0, Math.floor((points.length - 1) / 2), points.length - 1];
  const activePoint = active !== null ? points[active] : null;

  return (
    <div>
      <Legend items={series.map((s) => ({ label: s.label, color: s.color }))} />
      <div ref={wrapRef} className="relative mt-3" style={{ height: HEIGHT }}>
        {width > 0 && (
          <svg
            width={width}
            height={HEIGHT}
            role="img"
            aria-label={ariaLabel}
            tabIndex={0}
            className="outline-offset-4"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                setActive((a) => Math.min(points.length - 1, (a ?? -1) + 1));
                e.preventDefault();
              } else if (e.key === "ArrowLeft") {
                setActive((a) => Math.max(0, (a ?? points.length) - 1));
                e.preventDefault();
              } else if (e.key === "Escape") {
                setActive(null);
              }
            }}
            onBlur={() => setActive(null)}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setActive(nearestIndex(e.clientX - rect.left));
            }}
            onPointerLeave={() => setActive(null)}
          >
            {/* Hairline grid — solid, recessive, one step off the surface. */}
            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={M.left}
                  x2={width - M.right}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke={tick === 0 ? BASELINE : GRID}
                  strokeWidth={1}
                />
                <text
                  x={M.left - 8}
                  y={y(tick) + 4}
                  textAnchor="end"
                  fontSize={11}
                  fill={INK_SECONDARY}
                  className="nums"
                >
                  {fmt(tick)}
                </text>
              </g>
            ))}

            {xTickIdx.map((i) => (
              <text
                key={i}
                x={x(points[i].t)}
                y={HEIGHT - 8}
                textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
                fontSize={11}
                fill={INK_SECONDARY}
              >
                {formatTick(points[i].t, spanMs)}
              </text>
            ))}

            {/* Crosshair snapped to the active x. */}
            {activePoint && (
              <line
                x1={x(activePoint.t)}
                x2={x(activePoint.t)}
                y1={M.top}
                y2={M.top + plotH}
                stroke={BASELINE}
                strokeWidth={1}
              />
            )}

            {series.map((s) => (
              <path
                key={s.key}
                d={points
                  .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.t)},${y(p[s.key] ?? 0)}`)
                  .join("")}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}

            {/* Hover markers: ≥8px, 2px surface ring. */}
            {activePoint &&
              series.map((s) => (
                <circle
                  key={s.key}
                  cx={x(activePoint.t)}
                  cy={y(activePoint[s.key] ?? 0)}
                  r={4}
                  fill={s.color}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
          </svg>
        )}

        {activePoint && (
          <ChartTooltip x={x(activePoint.t)} y={M.top} width={width}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-light">
              {formatTick(activePoint.t, 0)}
            </p>
            {series.map((s) => (
              <TooltipRow
                key={s.key}
                color={s.color}
                label={s.label}
                value={fmt(activePoint[s.key] ?? 0)}
              />
            ))}
          </ChartTooltip>
        )}
      </div>

      <TableView
        caption={ariaLabel}
        columns={["Time", ...series.map((s) => s.label)]}
        rows={points.map((p) => [
          new Date(p.t).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }),
          ...series.map((s) => fmt(p[s.key] ?? 0)),
        ])}
      />
    </div>
  );
}
