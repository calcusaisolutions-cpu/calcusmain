# Calcus Ai — Colombo

Animated services website built with Svelte 5, Vite, Three.js, and a Go HTTP backend.

## Local development

Install Node.js 22.12+ and Go 1.24+. Run `npm ci`, then in separate terminals:

```sh
go run ./server
npm run dev
```

Open the Vite URL (normally http://localhost:5173). Vite proxies `/api` to Go on port 8080.

## Production

```sh
npm run build
go run ./server
```

Open http://localhost:8080. Alternatively run `docker compose up --build`.
Docker uses a persistent named volume for enquiries. Configure `PORT` and `DATA_DIR` as needed.

## Enquiries

POST `/api/enquiries` validates the brief, stores it in `data/enquiries.jsonl` (or `DATA_DIR`), then emails it to **calcusaisolutions@gmail.com** (override with `ENQUIRY_TO`). The email's Reply-To is the visitor, so hitting Reply answers them directly. Saving happens first, so a mail outage never loses an enquiry or shows the visitor an error; failures are logged.

Email is sent through Gmail SMTP and is off until these are set (copy `.env.example` to `.env`; Docker Compose reads it automatically, or export them before `go run ./server`):

- `SMTP_USER` — the Gmail address that sends the mail (e.g. calcusaisolutions@gmail.com)
- `SMTP_PASSWORD` — a Gmail **App Password** for that account (Google Account → Security → turn on 2-Step Verification → App passwords). The normal account password will not work.
- Optional: `ENQUIRY_TO`, `ENQUIRY_FROM`, `SMTP_HOST` (default smtp.gmail.com), `SMTP_PORT` (default 587, STARTTLS).

The server logs at startup whether email is configured. Back up the saved data and set an appropriate retention policy. For a public launch, put the server behind HTTPS and add edge rate limiting. Do not expose the data directory as static content.

## "I don't know how?" advisor

When a visitor clicks **I don't know how?** and says what they do, the page posts it to `/api/advise`. The Go server sends it to Claude (`claude-opus-5-5`, low effort for a quick answer) along with the service and package catalogue, which the build writes to `dist/advisor-catalog.json` from `servicelist.md`. Claude returns a short reply, the best-fitting package, up to three services and a few AI ideas for the visitor's field, in English or Sinhala. A JSON schema limits suggestions to real catalogue entries, and the server checks them again, so every link points at a real page. "Talk to us about this" carries their answer and the suggestions into the contact form.

- Set `ANTHROPIC_API_KEY` (see `.env.example`). Without it, or if Claude is unreachable, the box falls back to filling in the contact form.
- Cost guard: each visitor gets 5 questions a minute and 30 a day, and the whole site gets `ADVISOR_DAILY_LIMIT` (default 500) a day. Behind a reverse proxy, set `TRUST_PROXY=1` so the limits count real visitors rather than the proxy.
- If a safety classifier declines a request, the API's server-side fallback (`fallbacks: "default"`) answers on a suitable fallback model in the same call.
- The catalogue prompt is cached, so repeated questions mostly pay only for the visitor's line and the answer.

## Animation and compatibility

Three.js is loaded separately. The scene caps render resolution and runs at approximately 30 fps, lowering resolution when rendering is slow. Rendering stops while the tab is hidden or the hero is off-screen. Reduced-motion users and browsers without WebGL see the static orbit design. The rest of the site works independently of 3D. Test on your target browsers and devices; performance on every computer cannot be guaranteed.

## Checks

```sh
npm run build
go test ./...
go vet ./...
```

The original assets are retained in `public`. The build output is in `dist`; edit `src`, not generated HTML. The existing deletion of `.openai/hosting.json` was left as found. This project has not been redeployed to a hosted service.

## Brand artwork and interaction

The hero uses the original `public/logo.png`, with an event-driven canvas eye overlay in `src/Mascot.svelte`. Eye movement stops off-screen and in hidden tabs; reduced-motion users see the untouched logo. The Sri Lanka network backdrop is a lightweight local SVG generated from the Sri Lanka boundary in [geo-countries](https://github.com/datasets/geo-countries), based on Natural Earth public-domain data. The node pattern is decorative, not a representation of office locations or network coverage.

All interface icons use `@lucide/svelte` components. The navbar stays hidden and unfocusable while the hero is visible, then appears when the hero scrolls above the viewport. The opening layout stacks the headline above the mascot and Sri Lanka backdrop.
