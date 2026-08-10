# Roomz — landing page

Vite + React + TypeScript + Tailwind. Styled after [thespinr.com](https://thespinr.com),
with Spinr's yellow accent replaced by Roomz purple.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Design tokens

Type and spacing are lifted from the reference site so the pages feel related:

| Token | Value | Notes |
| --- | --- | --- |
| Display face | Fraunces | Headlines, stat figures |
| Display weight | **500**, `-0.01em`, `font-optical-sizing: auto` | Set on `.font-display`, which overrides any `font-bold` on the same element — matching the reference. Do not pin the `opsz` axis by hand; it changes the face's character. |
| Body face | Palanquin | Everything else |
| H1 | 34 → 44 → 64px | `text-[34px] sm:text-[44px] md:text-[64px]` |
| H2 | 30 → 38px | |
| H3 | 17px bold | |
| Body | 17–18px / 27px | |
| Small | 14px / 22px | |
| Eyebrow | 12px, `0.18em` tracking, uppercase | |
| Section rhythm | `mt-24` / `mt-32` | |
| Radius | `1rem`, `1.5rem`, pill | |
| Shadow | `0 24px 80px -32px rgba(16,16,18,.25)` | `shadow-lift` |

### Palette

The neutral ramp is unchanged from the reference. The accent is the only swap.

| Token | Hex | Role |
| --- | --- | --- |
| `brand` | `#6B21A8` | Royal Purple — CTAs, stat figures, the rotating headline word |
| `brand-dark` | `#581C87` | Hover / pressed |
| `brand-soft` | `#EDE9FE` | Lavender — tints, section backgrounds, step markers |
| `brand-softEdge` | `#DDD6FE` | Lavender borders |
| `ink` | `#111113` | Body text |
| `ink-black` | `#0A0A0B` | Final CTA band, wordmark |
| `ink-muted` | `#626873` | Secondary copy |
| `line` | `#E8EAEE` | Hairline borders |
| `surface` | `#F3F4F6` | Inert fills, callouts |

**One deliberate deviation:** the reference accent is a light acid yellow carrying
black text. Royal Purple is dark, so labels on it are white. Contrast measured:
white on `#6B21A8` is 8.72:1, `#6B21A8` on `#EDE9FE` is 7.34:1 — both AAA.

## Structure

`src/App.tsx` composes the page; each section is its own component and all copy
lives in `src/lib/content.ts`, so text edits never touch layout.

| Section | Component |
| --- | --- |
| Sticky nav | `Nav.tsx` |
| Hero + rotating headline | `Hero.tsx`, `RotatingWord.tsx` |
| Product demo | `RoomPreview.tsx` |
| Organizer / guest split | `AudienceSplit.tsx` |
| Proof stats (both clusters) | `ProofPoints.tsx` |
| How it works (both tracks) | `HowItWorks.tsx`, `StepVisuals.tsx` |
| Benefits | `WhyOrganizers.tsx`, `WhyGuests.tsx` |
| Trust & safety | `TrustSafety.tsx` |
| FAQ accordion | `Faq.tsx` |
| Final CTA band | `FinalCta.tsx` |
| Footer | `Footer.tsx` |

## Logo

`roomz-logo.svg` at the repo root is the original asset as supplied. Its viewBox
is much larger than the artwork, so `public/roomz-logo.svg` is the same file with
the viewBox cropped to the content bounds (`154.74 381.37 1447.55 285.27`, about
5.07:1) — that cropped copy is the one the site loads. If the logo is ever
re-exported, re-crop it the same way or it will render small inside its own
padding.

The artwork is black lettering with the second O in `#6B21A8`, so it only works
on light backgrounds. A dark surface needs a light variant of the file, not a
CSS colour change. `Wordmark.tsx` takes a `height` prop (nav 24px, footer 23px)
and derives the width from the aspect ratio.

## Notes for launch

- **App Store / Google Play buttons are placeholders.** They are inert `<span>`s
  labelled "Coming soon on", marked `aria-disabled`. Swap them for real links in
  `src/components/ui/StoreBadges.tsx` once the listings exist.
- **Stats are industry benchmarks, not Roomz numbers**, and are attributed inline.
  Replace with real data post-launch in `src/lib/content.ts`.
- **FAQ copy was written for this page** — the source copy deck had no FAQ. Each
  answer restates facts stated elsewhere on the page; no new claims.
- Footer "Pricing" points to `#` — there is no pricing section yet.
