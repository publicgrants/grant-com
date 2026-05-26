// =============================================================================
// OpenSubsidies — Catalog Re-Export Shim
// =============================================================================
// This module used to be a hand-curated TypeScript seed dataset. It is now a
// thin re-export of `catalog-loader.ts`, which loads the build-time
// `catalog.json` produced by `scripts/build-catalog.ts` from the
// grants-sources catalog. The legacy export names (`grants`, `funders`,
// plus `Grant`, `Funder`, `GrantStatus`, `FunderType`) are preserved so
// imports across the dashboard keep working.
// =============================================================================

export {
  grants,
  funders,
  generatedAt,
} from "./catalog-loader";

export type {
  Grant,
  Funder,
  GrantStatus,
  FunderType,
  InstrumentType,
  ApplicationMode,
  GrantDocument,
} from "./catalog-loader";
