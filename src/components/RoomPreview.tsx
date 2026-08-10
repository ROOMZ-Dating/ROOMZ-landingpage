const guests = [
  { initials: "AM", tint: "bg-brand text-white" },
  { initials: "JR", tint: "bg-brand-soft text-brand" },
  { initials: "TK", tint: "bg-ink-black text-white" },
  { initials: "SD", tint: "bg-brand-soft text-brand" },
  { initials: "LP", tint: "bg-brand text-white" },
  { initials: "NB", tint: "bg-surface text-ink" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line py-3 last:border-0">
      <span className="text-[13px] font-medium text-ink-muted">{label}</span>
      <span className="nums font-display text-[22px] font-bold text-ink">
        {value}
      </span>
    </div>
  );
}

/**
 * Both sides of the product in one frame: the organizer's live dashboard behind,
 * the guest's room on the phone in front.
 */
export default function RoomPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-brand-soft/60 to-white p-5 shadow-lift sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        {/* Organizer dashboard */}
        <div className="rounded-2xl border border-line bg-white p-5 text-left shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Room
              </p>
              <p className="mt-1 font-display text-[20px] font-bold text-ink">
                Sarah &amp; Daniel's Wedding
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Live
            </span>
          </div>

          <div className="mt-4">
            <Stat label="Guests joined" value="128" />
            <Stat label="Hey!s sent" value="64" />
            <Stat label="Matches made" value="19" />
          </div>
        </div>

        {/* Guest phone */}
        <div className="mx-auto w-full max-w-[240px]">
          <div className="rounded-[2rem] border-8 border-ink-black bg-white p-3 shadow-lift">
            <div className="flex items-center justify-between px-1 pb-3">
              <span className="text-[11px] font-bold text-ink">Who's here</span>
              <span className="nums text-[11px] font-medium text-ink-muted">
                128
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {guests.map((g) => (
                <div
                  key={g.initials}
                  className={`flex aspect-square items-center justify-center rounded-xl text-[13px] font-bold ${g.tint}`}
                  aria-hidden="true"
                >
                  {g.initials}
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-brand-soft p-3 text-left">
              <p className="text-[11px] font-semibold text-brand">
                It's a match!
              </p>
              <p className="mt-0.5 text-[11px] leading-[15px] text-ink-muted">
                You and AM both said Hey!
              </p>
            </div>

            <div className="mt-3 rounded-pill bg-brand py-2.5 text-center text-[13px] font-semibold text-white">
              Send a Hey!
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">
        A preview of the Roomz organizer dashboard showing 128 guests joined, 64
        Hey!s sent and 19 matches made, alongside the guest view of a room.
      </p>
    </div>
  );
}
