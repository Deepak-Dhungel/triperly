// app/api/serp/photos/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const data_id = url.searchParams.get("data_id");
    console.log("[api/serp/photos] incoming request data_id=", data_id);

    if (!data_id) {
      console.log("[api/serp/photos] missing data_id");
      return NextResponse.json({ error: "Missing data_id" }, { status: 400 });
    }

    const API_KEY = process.env.SERPAPI_KEY;
    if (!API_KEY) {
      console.error("[api/serp/photos] missing SERPAPI_KEY on server");
      return NextResponse.json(
        { error: "Missing server SERPAPI_KEY" },
        { status: 500 }
      );
    }

    const serpUrl = `https://serpapi.com/search.json?engine=google_maps_photos&data_id=${encodeURIComponent(
      data_id
    )}&api_key=${encodeURIComponent(API_KEY)}`;
    console.log("[api/serp/photos] fetching SerpAPI photos URL:", serpUrl);

    const r = await fetch(serpUrl);
    const text = await r.text();
    console.log(
      `[api/serp/photos] SerpAPI photos response status=${r.status} bodyLength=${text.length}`
    );

    if (!r.ok) {
      console.error("[api/serp/photos] SerpAPI error:", text);
      return NextResponse.json(
        { error: "SerpAPI error", details: text },
        { status: r.status }
      );
    }

    const json = JSON.parse(text);
    console.log(
      "[api/serp/photos] photos count (raw):",
      Array.isArray(json.photos) ? json.photos.length : "no photos array"
    );
    return NextResponse.json({ photos: json.photos ?? [] });
  } catch (err) {
    console.error("[api/serp/photos] unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
