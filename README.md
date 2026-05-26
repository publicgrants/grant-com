# OpenSubsidies

OpenSubsidies is an open, public map of grant funders and schemes — a
discovery layer for public funding opportunities. This repository
contains the dashboard implementation; the underlying data lives in the
sibling [`grants-sources`](https://github.com/Stotteportalen/grants-sources)
catalog, which catalogues funders and schemes worldwide as YAML
frontmatter + English prose.

The dashboard is built on a maps-based interface with country, funder
type, instrument, and application-mode filters. Sectors, themes, and
"open/closed" status are deliberately **not** filterable — those are
forbidden by the grants-sources catalog's no-assumption rule and are
left to downstream RAG.

The product is reachable at:

- **opensubsidies.com** — canonical brand domain
- **opensubsidy.com** — 301 redirect to the canonical

## Repository layout

```
opensubsidies/
├── templates/maps/      ← primary OpenSubsidies dashboard (Next.js 16)
│   ├── app/             ← App Router routes
│   ├── components/      ← UI components
│   ├── mock-data/       ← legacy seed (being replaced)
│   ├── scripts/         ← catalog build script
│   └── store/           ← Zustand store
├── home/                ← unrelated square-ui landing (kept verbatim)
├── templates/…          ← other unrelated demo templates (kept verbatim)
└── templates-baseui/…   ← BaseUI variants (kept verbatim)
```

The OpenSubsidies dashboard is only `templates/maps/`. The other
template families inherited from `square-ui` are unmodified.

## Data source: grants-sources

OpenSubsidies consumes the [`grants-sources`](https://github.com/Stotteportalen/grants-sources)
catalog from a sibling path. At build time, `pnpm catalog` reads
`process.env.GRANTS_SOURCES_DIR` (default: `../../../grants-sources`
relative to `templates/maps/`) and aggregates the catalog's YAML
frontmatter + prose into `mock-data/catalog.json`, which the Next.js
app then ships as static data.

To run locally with the catalog:

```bash
# 1. Clone both repos as siblings
git clone https://github.com/Stotteportalen/opensubsidies.git
git clone https://github.com/Stotteportalen/grants-sources.git

# 2. Install + build the catalog + start the dev server
cd opensubsidies/templates/maps
pnpm install
pnpm catalog            # produces mock-data/catalog.json
pnpm dev
```

`pnpm build` runs `pnpm catalog` automatically via the `prebuild` hook.

## Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui component patterns
- Radix UI primitives
- Zustand for state management
- MapLibre GL for map rendering and interaction
- gray-matter + js-yaml for catalog ingestion (build time)

## What this dashboard intentionally does NOT do

The grants-sources catalog records only facts that funders publish.
Themes, sectors, beneficiary types, and open/closed status are
intentionally omitted from the catalog (see `CONTRIBUTING.md` in
grants-sources). OpenSubsidies inherits that discipline:

- **No sector/theme filter.** RAG handles topic-matching downstream.
- **No "open now" badge driven by static state.** The badge is derived
  at view time from the scheme's `closes_at` date.
- **No fabricated allocation history, match score, success rate, or
  notable awardees.** Those UI affordances still exist in the codebase
  for future enrichment but render only when the underlying data is
  present.

## License

This repository is licensed under the terms in `LICENSE.md`. The
grants-sources catalog itself is licensed CC-BY-4.0.
