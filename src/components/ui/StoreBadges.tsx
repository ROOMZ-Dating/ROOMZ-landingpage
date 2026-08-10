/**
 * Placeholder store buttons — the app isn't live, so these are inert by design.
 * Swap the `href` on each and drop `aria-disabled` once the listings exist.
 */

type Tone = "light" | "dark";

function Badge({
  tone,
  store,
  sub,
  name,
  icon,
}: {
  tone: Tone;
  store: string;
  sub: string;
  name: string;
  icon: React.ReactNode;
}) {
  const shell =
    tone === "dark"
      ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
      : "border-ink/15 bg-ink-black text-white hover:bg-ink";

  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${name} — coming soon`}
      title="Coming soon"
      className={`inline-flex cursor-default items-center gap-3 rounded-2xl border px-4 py-2.5 transition-colors ${shell}`}
    >
      <span className="shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-70">
          {sub}
        </span>
        <span className="mt-1 text-[15px] font-semibold">{store}</span>
      </span>
    </span>
  );
}

const appleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.99-.84.95-2.2 1.68-3.32 1.6-.14-1.1.4-2.25 1.07-2.98.76-.85 2.1-1.5 3.37-1.61zM20.9 17.1c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.93-1-4.02-.99-2.09.01-2.52 1.01-4.06.99-1.73-.02-3.06-1.77-4.05-3.32C.36 16.9-.13 11.85 1.83 9.22c1.13-1.53 2.9-2.42 4.57-2.42 1.7 0 2.77 1 4.18 1 1.36 0 2.19-1 4.16-1 1.48 0 3.05.81 4.17 2.2-3.66 2.01-3.07 7.24.99 8.1z" />
  </svg>
);

const googleIcon = (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <path fill="#EA4335" d="M3.6 1.9 14.3 12.6l-2.9 2.9L3 6.6a2 2 0 0 1-.5-1.3V3.4c0-.7.4-1.3 1.1-1.5z" />
    <path fill="#FBBC04" d="m17.7 9.3 3.1 1.8c.9.5.9 1.8 0 2.3l-3.1 1.8-3.4-3z" />
    <path fill="#4285F4" d="M2.5 5.3v13.4c0 1 .6 1.6 1.2 1.8L14.3 12.6z" />
    <path fill="#34A853" d="M3.7 20.5c.4.1.9.1 1.4-.2l12.6-7.1-3.4-3z" />
  </svg>
);

export default function StoreBadges({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge
        tone={tone}
        name="Apple App Store"
        sub="Coming soon on"
        store="App Store"
        icon={appleIcon}
      />
      <Badge
        tone={tone}
        name="Google Play"
        sub="Coming soon on"
        store="Google Play"
        icon={googleIcon}
      />
    </div>
  );
}
