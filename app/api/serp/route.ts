// app/api/serp/route.ts
import { NextResponse } from "next/server";

const CACHE_TTL_MS = 1000 * 60 * 5;
const cache = new Map<string, { ts: number; data: any }>();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim();
    console.log("[api/serp] incoming request, q=", q);

    if (!q) {
      console.log("[api/serp] missing 'q' param");
      return NextResponse.json({ error: "Missing q param" }, { status: 400 });
    }

    const key = q.toLowerCase();
    const cached = cache.get(key);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      console.log(
        `[api/serp] cache hit for '${q}' (age ms= ${Date.now() - cached.ts})`
      );
      return NextResponse.json({ fromCache: true, result: cached.data });
    }

    const API_KEY = process.env.SERPAPI_KEY;
    if (!API_KEY) {
      console.error("[api/serp] missing SERPAPI_KEY on server");
      return NextResponse.json(
        { error: "Missing server SERPAPI_KEY" },
        { status: 500 }
      );
    }

    const serpUrl = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(
      q
    )}&type=search&api_key=${encodeURIComponent(API_KEY)}`;
    console.log("[api/serp] fetching SerpAPI URL:", serpUrl);

    const r = await fetch(serpUrl);
    const text = await r.text();
    console.log(
      `[api/serp] SerpAPI response status=${r.status} bodyLength=${text.length}`
    );

    if (!r.ok) {
      console.error("[api/serp] SerpAPI returned error:", text);
      return NextResponse.json(
        { error: "SerpAPI error", details: text },
        { status: r.status }
      );
    }

    const json = JSON.parse(text);
    cache.set(key, { ts: Date.now(), data: json });
    console.log(
      "[api/serp] returning result, keys:",
      Object.keys(json).join(", ")
    );
    return NextResponse.json({ fromCache: false, result: json });
  } catch (err) {
    console.error("[api/serp] unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
