export type Bucket = { label: string; count: number };
export type SuppressedBucket = { label: string; count: number | null };

const FLOOR = 3;

/**
 * Small-cell suppression with the complement rule. Any bucket under 3 guests
 * is withheld — and because a single hidden value can be recovered by
 * subtracting the visible buckets from the total, one suppression forces a
 * second: the next-smallest visible bucket is withheld too.
 */
export function suppressSmallCells(buckets: Bucket[]): SuppressedBucket[] {
  const out: SuppressedBucket[] = buckets.map((b) => ({
    label: b.label,
    count: b.count < FLOOR ? null : b.count,
  }));

  const hiddenCount = out.filter((b) => b.count === null).length;
  const visible = out.filter((b) => b.count !== null);
  if (hiddenCount === 1 && visible.length > 1) {
    const nextSmallest = visible.reduce((min, b) =>
      (b.count as number) < (min.count as number) ? b : min,
    );
    nextSmallest.count = null;
  }
  return out;
}
