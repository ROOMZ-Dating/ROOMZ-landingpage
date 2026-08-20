import { useAuth } from "../state";
import { SectionCard } from "../components/ui";

const PLAN_LABEL: Record<string, string> = {
  unlimited_plan: "Organizer Unlimited",
  guest_premium: "Guest Premium",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-3 last:border-0">
      <dt className="text-[13px] font-semibold text-ink-muted">{label}</dt>
      <dd className="text-right text-[14px] font-semibold text-ink">{value}</dd>
    </div>
  );
}

export default function Account() {
  const { user, billing } = useAuth();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="font-display text-[28px] font-bold leading-tight text-ink">Account</h1>

      <SectionCard title="Organizer profile" sub="Edit your profile in the Roomz app.">
        <dl>
          <Row label="Name" value={user?.organizer_name ?? user?.name ?? "—"} />
          <Row label="Business" value={user?.organizer_business ?? "—"} />
          <Row label="Role" value={user?.organizer_role ?? "—"} />
          <Row label="Email" value={user?.email ?? "—"} />
        </dl>
      </SectionCard>

      <SectionCard title="Plan & billing" sub="Read-only — manage billing in the Roomz app.">
        <dl>
          <Row
            label="Current plan"
            value={billing?.active_plan ? PLAN_LABEL[billing.active_plan] ?? billing.active_plan : "Pay per event"}
          />
          <Row
            label="Payments on record"
            value={billing ? String(billing.history.length) : "—"}
          />
        </dl>
        <p className="mt-4 rounded-xl bg-surface px-4 py-3 text-[13px] leading-[20px] text-ink-muted">
          Manage billing and create rooms in the Roomz app — this dashboard is
          for viewing analytics and generating reports.
        </p>
      </SectionCard>
    </div>
  );
}
