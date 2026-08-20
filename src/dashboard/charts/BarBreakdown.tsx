import { useState } from "react";
import { SERIES, fmt } from "./tokens";
import { TableView } from "./primitives";
import type { SuppressedBucket } from "./suppress";

const SUPPRESSED_HINT = "Hidden to protect guest privacy";

/**
 * Nominal horizontal bars: one series, so every bar wears slot 1 — never a
 * value ramp on unordered categories. Values sit at the bar end (direct
 * labels), so the sub-3:1 relief obligation never applies here. Suppressed
 * buckets render "—" with the privacy hint as both tooltip and label.
 */
export default function BarBreakdown({
  caption,
  buckets,
}: {
  caption: string;
  buckets: SuppressedBucket[];
}) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(1, ...buckets.map((b) => b.count ?? 0));

  return (
    <div>
      <ul className="space-y-1.5">
        {buckets.map((bucket) => (
          <li
            key={bucket.label}
            className="flex items-center gap-3"
            tabIndex={0}
            onPointerEnter={() => setHover(bucket.label)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(bucket.label)}
            onBlur={() => setHover(null)}
            title={bucket.count === null ? SUPPRESSED_HINT : undefined}
            aria-label={
              bucket.count === null
                ? `${bucket.label}: ${SUPPRESSED_HINT}`
                : `${bucket.label}: ${bucket.count}`
            }
          >
            <span className="w-[104px] shrink-0 truncate text-right text-[13px] font-semibold text-ink-muted">
              {bucket.label}
            </span>
            {bucket.count === null ? (
              <span className="text-[13px] text-ink-light">—</span>
            ) : (
              <>
                <div className="min-w-0 flex-1">
                  <div
                    className="h-4 rounded-r"
                    style={{
                      width: `${Math.max(2, (bucket.count / max) * 100)}%`,
                      backgroundColor: SERIES[0],
                      opacity: hover && hover !== bucket.label ? 0.55 : 1,
                      transition: "opacity 120ms ease",
                    }}
                  />
                </div>
                <span className="w-12 shrink-0 text-[13px] font-bold text-ink nums">
                  {fmt(bucket.count)}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      <TableView
        caption={caption}
        columns={["Category", "Guests"]}
        rows={buckets.map((b) => [b.label, b.count === null ? SUPPRESSED_HINT : fmt(b.count)])}
      />
    </div>
  );
}
