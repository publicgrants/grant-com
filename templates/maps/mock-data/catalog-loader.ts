// Runtime adapter: loads the build-time catalog.json produced by
// scripts/build-catalog.ts and shapes it into the `Grant` / `Funder`
// types the store and components consume. Status / coordinates are
// derived here (the catalog itself doesn't store them, per the
// grants-sources no-assumption rule).

import catalog from "./catalog.json";
import { coordsForCityOrCountry, type LatLng } from "./geo";
import type {
  ApplicationMode,
  Catalog,
  FunderRecord,
  FunderType,
  GrantDocument,
  GrantRecord,
  InstrumentType,
} from "./catalog-types";

export type { FunderType, InstrumentType, ApplicationMode, GrantDocument };

export type GrantStatus = "open" | "upcoming" | "closing-soon" | "closed";

export type Funder = {
  id: string;
  name: string;
  shortName: string;
  type: FunderType;
  country: string;
  countryName: string;
  region: string;
  hq: string | null;
  website: string;
  faviconUrl: string;
  prose: string;
};

export type Grant = {
  id: string;
  name: string;
  funderId: string;
  url: string;
  applicationUrl: string | null;
  description: string;
  prose: string;
  coordinates: LatLng;
  address: string | null;
  status: GrantStatus;

  closesAt: string | null;
  opensAt: string | null;
  applicationMode: ApplicationMode;
  currency: string | null;
  minAmount: number | null;
  maxAmount: number | null;
  fundingRatePct: number | null;
  totalBudget: number | null;
  instrumentType: InstrumentType;
  schemeCode: string | null;
  program: string | null;
  documents: GrantDocument[];
  sourceUpdatedAt: string | null;

  isSaved: boolean;
  viewCount: number;
  lastViewed?: string;
};

const CLOSING_SOON_DAYS = 30;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function deriveStatus(record: GrantRecord, now: number): GrantStatus {
  const opensAt = record.opensAt ? Date.parse(record.opensAt) : NaN;
  const closesAt = record.closesAt ? Date.parse(record.closesAt) : NaN;

  if (Number.isFinite(opensAt) && opensAt > now) return "upcoming";
  if (Number.isFinite(closesAt)) {
    if (closesAt < now) return "closed";
    const daysLeft = (closesAt - now) / ONE_DAY_MS;
    if (daysLeft <= CLOSING_SOON_DAYS) return "closing-soon";
    return "open";
  }
  // No closesAt — rolling and unknown both treated as available.
  return "open";
}

function firstParagraph(prose: string, maxLen = 280): string {
  if (!prose) return "";
  const para = prose.split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").trim() ?? "";
  if (para.length <= maxLen) return para;
  return para.slice(0, maxLen).replace(/[\s,;]+\S*$/, "") + "…";
}

const typedCatalog = catalog as unknown as Catalog;

const funderById = new Map<string, FunderRecord>();
for (const f of typedCatalog.funders) {
  funderById.set(f.id, f);
}

export const funders: Funder[] = typedCatalog.funders.map((f) => ({
  id: f.id,
  name: f.name,
  shortName: f.shortName,
  type: f.funderType,
  country: f.country,
  countryName: f.countryName,
  region: f.region,
  hq: f.hqCity,
  website: f.website,
  faviconUrl: f.faviconUrl,
  prose: f.prose,
}));

const now = Date.now();

export const grants: Grant[] = typedCatalog.grants.map((g) => {
  const funder = funderById.get(g.funderId);
  const coords = coordsForCityOrCountry(
    funder?.hqCity ?? null,
    funder?.country ?? "INTL",
  );
  return {
    id: g.id,
    name: g.name,
    funderId: g.funderId,
    url: g.url,
    applicationUrl: g.applicationUrl,
    description: firstParagraph(g.prose),
    prose: g.prose,
    coordinates: coords,
    address: funder?.hqCity ?? null,
    status: deriveStatus(g, now),
    closesAt: g.closesAt,
    opensAt: g.opensAt,
    applicationMode: g.applicationMode,
    currency: g.currency,
    minAmount: g.minAmount,
    maxAmount: g.maxAmount,
    fundingRatePct: g.fundingRatePct,
    totalBudget: g.totalBudget,
    instrumentType: g.instrumentType,
    schemeCode: g.schemeCode,
    program: g.program,
    documents: g.documents,
    sourceUpdatedAt: g.sourceUpdatedAt,
    isSaved: false,
    viewCount: 0,
  };
});

export const generatedAt = typedCatalog.generatedAt;
