import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json({ error: "No query provided", status: 400 });
  }

  const api_key = process.env.SERPAPI_KEY;
  if (!api_key) {
    return NextResponse.json({ error: "Missing api key", status: 500 });
  }

  const api_url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(
    query
  )}&type=search&api_key=${encodeURIComponent(api_key)}`;

  try {
    const response = await fetch(api_url);
    const data = await response.json();

    if (!data.place_results || !data.place_results.data_id) {
      return NextResponse.json({ error: "No data ID found", status: 404 });
    }

    const dataId = data.place_results.data_id;

    return NextResponse.json(dataId);
  } catch (error) {
    console.error("Error fetching data ID from SerpAPI:", error);
    return NextResponse.json({ error: "Failed to fetch data ID", status: 500 });
  }
}
