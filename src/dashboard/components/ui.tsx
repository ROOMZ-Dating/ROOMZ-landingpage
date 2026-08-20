import type { ReactNode } from "react";
import { fmt } from "../charts/tokens";

export function SectionCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 sm:p-7">
      <h2 className="text-[17px] font-bold text-ink">{title}</h2>
      {sub && <p className="mt-1 text-[13px] text-ink-muted">{sub}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Stat-tile contract: sentence-case label, compact proportional value. */
export function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <p className="text-[13px] font-semibold text-ink-muted">{label}</p>
      <p className="mt-1.5 text-[32px] font-semibold leading-none text-ink">
        {typeof value === "number" ? fmt(value) : value}
      </p>
      {sub && <p className="mt-1.5 text-[12px] text-ink-light">{sub}</p>}
    </div>
  );
}

export function UpsellCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-brand-softEdge bg-brand-soft p-6 sm:p-7">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
        Unlimited Plan
      </p>
      <h2 className="mt-2 text-[17px] font-bold text-ink">{title}</h2>
      <p className="mt-1.5 text-[14px] leading-[22px] text-ink-muted">{body}</p>
      <p className="mt-4 text-[13px] font-semibold text-brand">
        Upgrade from the Billing section in the Roomz app.
      </p>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-[14px] text-ink-muted">
      {children}
    </div>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-label={label} className="flex justify-center py-16">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-line border-t-brand" />
    </div>
  );
}
