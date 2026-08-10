function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-white px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </p>
      <p className="mt-1 text-[15px] font-semibold text-ink">{value}</p>
    </div>
  );
}

/** A room being set up, then the one artifact the organizer hands out: a code. */
export function OrganizerVisual() {
  return (
    <div className="rounded-3xl border border-line bg-gradient-to-b from-brand-soft/60 to-white p-6 shadow-lift sm:p-8">
      <div className="space-y-3">
        <Field label="Event name" value="Sarah & Daniel's Wedding" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Guests" value="140" />
          <Field label="Date" value="14 Jun" />
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-ink-black p-5 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
          Share this
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
          {/* A URL is one unbreakable token — let it shrink and wrap, or it sets
              a min-content floor that widens the whole page on small screens. */}
          <p className="nums min-w-0 break-all font-body text-[15px] font-semibold sm:text-[17px] md:text-[19px]">
            roomz.app/<span className="text-brand-soft">sarah-daniel</span>
          </p>
          <div
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 grid-cols-3 gap-0.5 rounded-lg bg-white p-1.5"
          >
            {[1, 0, 1, 0, 1, 1, 1, 1, 0].map((on, i) => (
              <span
                key={i}
                className={`rounded-[2px] ${on ? "bg-ink-black" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The guest side: one profile, one action. */
export function GuestVisual() {
  return (
    <div className="rounded-3xl border border-line bg-gradient-to-b from-brand-soft/60 to-white p-6 shadow-lift sm:p-8">
      <div className="mx-auto w-full max-w-[260px] rounded-[2rem] border-8 border-ink-black bg-white p-4 shadow-card">
        <div className="flex items-center justify-between pb-3">
          <span className="text-[11px] font-bold text-ink">
            Sarah &amp; Daniel's
          </span>
          <span className="rounded-pill bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
            In room
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line">
          <div
            aria-hidden="true"
            className="flex h-32 items-center justify-center bg-brand-soft font-display text-[34px] font-bold text-brand"
          >
            AM
          </div>
          <div className="p-3 text-left">
            <p className="text-[14px] font-bold text-ink">Ava, 29</p>
            <p className="mt-0.5 text-[12px] leading-[17px] text-ink-muted">
              Bride's side · Here with friends
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="flex-1 rounded-pill border-2 border-line py-2.5 text-center text-[13px] font-semibold text-ink-muted">
            Skip
          </div>
          <div className="flex-1 rounded-pill bg-brand py-2.5 text-center text-[13px] font-semibold text-white">
            Hey!
          </div>
        </div>
      </div>
    </div>
  );
}
