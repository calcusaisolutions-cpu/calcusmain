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

POST `/api/enquiries` validates the brief and stores it in `data/enquiries.jsonl` (or `DATA_DIR`). These are local records, not emails; connect a mail provider or CRM before promising email notifications. Back up this data and set an appropriate retention policy. For a public launch, put the server behind HTTPS and add edge rate limiting. Do not expose the data directory as static content.

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
