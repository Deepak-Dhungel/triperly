// lib/placesearch.ts
export function extractDataId(payload: any): string | null {
  if (!payload) return null;
  const result = payload.result ?? payload;

  // local_results[0]
  if (
    result?.local_results &&
    Array.isArray(result.local_results) &&
    result.local_results.length
  ) {
    const first = result.local_results[0];
    const found = first?.data_id ?? first?.place_id ?? null;
    if (found) {
      console.log("[placesearch] extractDataId found in local_results:", found);
      return found;
    }
  }

  // organic_results
  if (Array.isArray(result?.organic_results)) {
    for (const r of result.organic_results) {
      if (r?.data_id) {
        console.log(
          "[placesearch] extractDataId found in organic_results:",
          r.data_id
        );
        return r.data_id;
      }
      if (r?.place_id) {
        console.log(
          "[placesearch] extractDataId found in organic_results (place_id):",
          r.place_id
        );
        return r.place_id;
      }
    }
  }

  // places[]
  if (Array.isArray(result?.places)) {
    const first = result.places[0];
    if (first?.data_id) {
      console.log(
        "[placesearch] extractDataId found in places:",
        first.data_id
      );
      return first.data_id;
    }
    if (first?.place_id) {
      console.log(
        "[placesearch] extractDataId found in places (place_id):",
        first.place_id
      );
      return first.place_id;
    }
  }

  // recursive fallback
  const findRecursively = (obj: any): string | null => {
    if (!obj || typeof obj !== "object") return null;
    if (typeof obj.data_id === "string") return obj.data_id;
    if (typeof obj.place_id === "string") return obj.place_id;
    for (const k of Object.keys(obj)) {
      const f = findRecursively(obj[k]);
      if (f) return f;
    }
    return null;
  };

  const fallback = findRecursively(result);
  console.log("[placesearch] extractDataId fallback result:", fallback);
  return fallback;
}

export async function fetchDataId(q: string): Promise<string | null> {
  console.log("[placesearch] fetchDataId calling /api/serp?q=", q);
  const res = await fetch(`/api/serp?q=${encodeURIComponent(q)}`);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error(
      "[placesearch] fetchDataId /api/serp failed:",
      res.status,
      txt
    );
    throw new Error(`Search failed: ${res.status} ${txt}`);
  }
  const json = await res.json();
  console.log(
    "[placesearch] fetchDataId got response keys:",
    Object.keys(json || {}).join(", ")
  );
  const id = extractDataId(json);
  console.log("[placesearch] fetchDataId extracted dataId:", id);
  return id;
}

export async function fetchPlacePhotos(dataId: string): Promise<any[]> {
  console.log(
    "[placesearch] fetchPlacePhotos calling /api/serp/photos?data_id=",
    dataId
  );
  if (!dataId) {
    console.warn("[placesearch] fetchPlacePhotos called with empty dataId");
    return [];
  }

  const res = await fetch(
    `/api/serp/photos?data_id=${encodeURIComponent(dataId)}`
  );
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("[placesearch] fetchPlacePhotos failed:", res.status, txt);
    throw new Error(`Photos fetch failed: ${res.status} ${txt}`);
  }
  const json = await res.json();
  console.log(
    "[placesearch] fetchPlacePhotos got photos count:",
    Array.isArray(json.photos) ? json.photos.length : 0
  );
  return json.photos ?? [];
}

export async function fetchPlaceDataAndPhotos(
  q: string
): Promise<{ dataId: string; photos: any[] }> {
  console.log("[placesearch] fetchPlaceDataAndPhotos start for q=", q);
  const dataId = await fetchDataId(q);
  if (!dataId) {
    console.error(
      "[placesearch] fetchPlaceDataAndPhotos no dataId found for q=",
      q
    );
    throw new Error("No data_id found for query: " + q);
  }
  const photos = await fetchPlacePhotos(dataId);
  console.log("[placesearch] fetchPlaceDataAndPhotos finished:", {
    dataId,
    photosCount: photos.length,
  });
  return { dataId, photos };
}
