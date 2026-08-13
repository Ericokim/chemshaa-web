# ChemShaa Web

The pre-show flow of the ChemShaa Android app, Kenya's daily live trivia show
with cash prizes, rebuilt as a responsive web app. Four screens: log in with a
mobile money phone number, verify an SMS code, wait in the lobby for the 2:00 PM
(Africa/Nairobi) show, and manage the account from the More panel.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com) (Radix) primitives
- [react-hook-form](https://react-hook-form.com) — forms
- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) — Kenyan phone validation (E.164)
- [date-fns](https://date-fns.org) + date-fns-tz — Nairobi-anchored countdown
- [lucide-react](https://lucide.dev) — icons
- Bodoni Moda (wordmark) + Inter via `next/font`

## Folder structure

```
app/
  layout.tsx           # fonts, tokens, skip link
  globals.css          # Tailwind v4 theme + brand tokens
  page.tsx             # redirect: stored phone → /lobby, else /login
  login/page.tsx       # phone number entry
  verify/page.tsx      # SMS code (mocked — any 4–6 digits pass)
  lobby/page.tsx       # the waiting lobby + countdown banner
  more/page.tsx        # /more deep link (renders the lobby with the sheet open)
components/
  Header.tsx           # lobby header: wordmark + kebab slot
  Button.tsx           # elevated white primary button
  Field.tsx            # the one input: outlined floating-label / underline
  CountdownBanner.tsx  # full-bleed black banner, ticks every second
  MoreSheet.tsx        # right-side account sheet (Radix dialog)
  Wordmark.tsx         # Bodoni Moda "ChemShaa"
  ui/                  # shadcn/ui primitives (button, input, label, sheet)
lib/
  phone.ts             # normalize / validate / display Kenyan numbers
  otp.ts               # sanitize / validate the SMS code
  time.ts              # next-show math in Africa/Nairobi
  storage.ts           # safe localStorage wrapper (chemshaa.phone.v1)
  utils.ts             # cn() class merger
hooks/
  useCountdown.ts      # 1s clock, hydration-safe
```

## Installation

```bash
git clone <repo-url>
cd chemshaa-web
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Login details (mocked)

There is no backend — authentication is mocked, so anything valid-looking gets
you in:

- **Phone number:** any valid Kenyan mobile number, e.g. `0712345678`
- **SMS code:** any 4–6 digit code, e.g. `1234`

Enter those two and you land on the lobby screen (the main event: headline,
show rules, and the live countdown to 2:00 PM Nairobi).
