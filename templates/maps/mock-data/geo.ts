// Inline city + country geocoding tables for the OpenSubsidies map.
// The grants-sources catalog stores only city names (and country codes)
// for funder HQs; the dashboard needs lat/lng to render markers. We
// resolve city → coords first, falling back to country centroids when
// the city is not in the table. This is sufficient for the ~50 unique
// HQ cities currently in the catalog.

export type LatLng = { lat: number; lng: number };

// Country centroids for every country code currently in grants-sources
// (35 entries) plus EU/INTL/CoE supranational codes.
export const COUNTRY_CENTROIDS: Record<string, LatLng> = {
  AE: { lat: 23.4241, lng: 53.8478 },
  AR: { lat: -38.4161, lng: -63.6167 },
  AT: { lat: 47.5162, lng: 14.5501 },
  AU: { lat: -25.2744, lng: 133.7751 },
  BE: { lat: 50.5039, lng: 4.4699 },
  BR: { lat: -14.235, lng: -51.9253 },
  CA: { lat: 56.1304, lng: -106.3468 },
  CH: { lat: 46.8182, lng: 8.2275 },
  CL: { lat: -35.6751, lng: -71.543 },
  CN: { lat: 35.8617, lng: 104.1954 },
  CO: { lat: 4.5709, lng: -74.2973 },
  CR: { lat: 9.7489, lng: -83.7534 },
  DE: { lat: 51.1657, lng: 10.4515 },
  DK: { lat: 56.2639, lng: 9.5018 },
  ES: { lat: 40.4637, lng: -3.7492 },
  FI: { lat: 61.9241, lng: 25.7482 },
  FR: { lat: 46.2276, lng: 2.2137 },
  GB: { lat: 55.3781, lng: -3.436 },
  HK: { lat: 22.3193, lng: 114.1694 },
  IL: { lat: 31.0461, lng: 34.8516 },
  IN: { lat: 20.5937, lng: 78.9629 },
  IS: { lat: 64.9631, lng: -19.0208 },
  IT: { lat: 41.8719, lng: 12.5674 },
  JP: { lat: 36.2048, lng: 138.2529 },
  KR: { lat: 35.9078, lng: 127.7669 },
  MX: { lat: 23.6345, lng: -102.5528 },
  MY: { lat: 4.2105, lng: 101.9758 },
  NL: { lat: 52.1326, lng: 5.2913 },
  NO: { lat: 60.472, lng: 8.4689 },
  NZ: { lat: -40.9006, lng: 174.886 },
  PA: { lat: 8.538, lng: -80.7821 },
  PE: { lat: -9.19, lng: -75.0152 },
  PL: { lat: 51.9194, lng: 19.1451 },
  PT: { lat: 39.3999, lng: -8.2245 },
  SE: { lat: 60.1282, lng: 18.6435 },
  SG: { lat: 1.3521, lng: 103.8198 },
  TH: { lat: 15.87, lng: 100.9925 },
  TR: { lat: 38.9637, lng: 35.2433 },
  TW: { lat: 23.6978, lng: 120.9605 },
  UA: { lat: 48.3794, lng: 31.1656 },
  US: { lat: 37.0902, lng: -95.7129 },
  UY: { lat: -32.5228, lng: -55.7658 },
  ZA: { lat: -30.5595, lng: 22.9375 },

  // Supranational / special codes — pick a representative anchor city.
  EU: { lat: 50.8503, lng: 4.3517 }, // Brussels
  CoE: { lat: 48.5734, lng: 7.7521 }, // Strasbourg
  INTL: { lat: 0, lng: 0 }, // GeoJSON null island as a deliberate fallback
};

// Common HQ cities found in grants-sources funder records. Where the
// funder lives in a city not in this table, the loader falls back to
// the country centroid above.
export const CITY_COORDS: Record<string, LatLng> = {
  // Norway
  Oslo: { lat: 59.9139, lng: 10.7522 },
  Bergen: { lat: 60.3913, lng: 5.3221 },
  Trondheim: { lat: 63.4305, lng: 10.3951 },
  Stavanger: { lat: 58.9699, lng: 5.7331 },
  Tromsø: { lat: 69.6492, lng: 18.9553 },
  Kristiansand: { lat: 58.1599, lng: 8.0182 },
  Lillehammer: { lat: 61.1153, lng: 10.4663 },

  // Sweden / Denmark / Finland / Iceland
  Stockholm: { lat: 59.3293, lng: 18.0686 },
  Gothenburg: { lat: 57.7089, lng: 11.9746 },
  Copenhagen: { lat: 55.6761, lng: 12.5683 },
  Aarhus: { lat: 56.1629, lng: 10.2039 },
  Helsinki: { lat: 60.1699, lng: 24.9384 },
  Reykjavik: { lat: 64.1466, lng: -21.9426 },
  Reykjavík: { lat: 64.1466, lng: -21.9426 },

  // Germany / Austria / Switzerland / Netherlands / Belgium
  Berlin: { lat: 52.52, lng: 13.405 },
  Bonn: { lat: 50.7374, lng: 7.0982 },
  Munich: { lat: 48.1351, lng: 11.582 },
  München: { lat: 48.1351, lng: 11.582 },
  Frankfurt: { lat: 50.1109, lng: 8.6821 },
  Hamburg: { lat: 53.5511, lng: 9.9937 },
  Cologne: { lat: 50.9375, lng: 6.9603 },
  Köln: { lat: 50.9375, lng: 6.9603 },
  Düsseldorf: { lat: 51.2277, lng: 6.7735 },
  Stuttgart: { lat: 48.7758, lng: 9.1829 },
  Karlsruhe: { lat: 49.0069, lng: 8.4037 },
  Leipzig: { lat: 51.3397, lng: 12.3731 },
  Vienna: { lat: 48.2082, lng: 16.3738 },
  Wien: { lat: 48.2082, lng: 16.3738 },
  Bern: { lat: 46.948, lng: 7.4474 },
  Zurich: { lat: 47.3769, lng: 8.5417 },
  Amsterdam: { lat: 52.3676, lng: 4.9041 },
  "The Hague": { lat: 52.0705, lng: 4.3007 },
  Brussels: { lat: 50.8503, lng: 4.3517 },
  Bruxelles: { lat: 50.8503, lng: 4.3517 },

  // France / Italy / Spain / Portugal
  Paris: { lat: 48.8566, lng: 2.3522 },
  Lyon: { lat: 45.764, lng: 4.8357 },
  Marseille: { lat: 43.2965, lng: 5.3698 },
  Rome: { lat: 41.9028, lng: 12.4964 },
  Roma: { lat: 41.9028, lng: 12.4964 },
  Milan: { lat: 45.4642, lng: 9.19 },
  Madrid: { lat: 40.4168, lng: -3.7038 },
  Barcelona: { lat: 41.3851, lng: 2.1734 },
  Lisbon: { lat: 38.7223, lng: -9.1393 },

  // United Kingdom / Ireland
  London: { lat: 51.5074, lng: -0.1278 },
  Edinburgh: { lat: 55.9533, lng: -3.1883 },
  Manchester: { lat: 53.4808, lng: -2.2426 },
  Cardiff: { lat: 51.4816, lng: -3.1791 },
  Belfast: { lat: 54.5973, lng: -5.9301 },
  Swindon: { lat: 51.5557, lng: -1.7797 },
  Dublin: { lat: 53.3498, lng: -6.2603 },

  // Poland
  Warsaw: { lat: 52.2297, lng: 21.0122 },
  Warszawa: { lat: 52.2297, lng: 21.0122 },
  Kraków: { lat: 50.0647, lng: 19.945 },
  Krakow: { lat: 50.0647, lng: 19.945 },

  // United States
  Washington: { lat: 38.9072, lng: -77.0369 },
  "Washington, DC": { lat: 38.9072, lng: -77.0369 },
  Bethesda: { lat: 38.9847, lng: -77.0947 },
  Alexandria: { lat: 38.8048, lng: -77.0469 },
  "New York": { lat: 40.7128, lng: -74.006 },
  Atlanta: { lat: 33.749, lng: -84.388 },
  Boston: { lat: 42.3601, lng: -71.0589 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  Seattle: { lat: 47.6062, lng: -122.3321 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },

  // Canada
  Ottawa: { lat: 45.4215, lng: -75.6972 },
  Toronto: { lat: 43.6532, lng: -79.3832 },
  Montreal: { lat: 45.5017, lng: -73.5673 },

  // Asia / APAC
  Tokyo: { lat: 35.6762, lng: 139.6503 },
  Kawasaki: { lat: 35.5308, lng: 139.7029 },
  Seoul: { lat: 37.5665, lng: 126.978 },
  Beijing: { lat: 39.9042, lng: 116.4074 },
  Shanghai: { lat: 31.2304, lng: 121.4737 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  "Kuala Lumpur": { lat: 3.139, lng: 101.6869 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Taipei: { lat: 25.033, lng: 121.5654 },
  "Hong Kong": { lat: 22.3193, lng: 114.1694 },
  Sydney: { lat: -33.8688, lng: 151.2093 },
  Canberra: { lat: -35.2809, lng: 149.13 },
  Melbourne: { lat: -37.8136, lng: 144.9631 },
  Wellington: { lat: -41.2865, lng: 174.7762 },

  // Middle East / Africa / South America
  Jerusalem: { lat: 31.7683, lng: 35.2137 },
  "Tel Aviv": { lat: 32.0853, lng: 34.7818 },
  Dubai: { lat: 25.2048, lng: 55.2708 },
  "New Delhi": { lat: 28.6139, lng: 77.209 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  "São Paulo": { lat: -23.5505, lng: -46.6333 },
  "Sao Paulo": { lat: -23.5505, lng: -46.6333 },
  Brasilia: { lat: -15.8267, lng: -47.9218 },
  "Mexico City": { lat: 19.4326, lng: -99.1332 },
  "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
  Santiago: { lat: -33.4489, lng: -70.6693 },
};

export function coordsForCityOrCountry(
  city: string | null,
  countryCode: string,
): LatLng {
  if (city) {
    const exact = CITY_COORDS[city];
    if (exact) return exact;
    // Try the part before a comma ("Brussels, Belgium" → "Brussels")
    const beforeComma = city.split(",")[0]?.trim();
    if (beforeComma && CITY_COORDS[beforeComma]) {
      return CITY_COORDS[beforeComma];
    }
  }
  return COUNTRY_CENTROIDS[countryCode] ?? COUNTRY_CENTROIDS.INTL;
}
