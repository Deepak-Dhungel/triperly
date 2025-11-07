import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dataId = url.searchParams.get("data_id");

  if (!dataId) {
    return NextResponse.json({ error: "Missing Data Id", status: 400 });
  }

  const api_key = process.env.SERPAPI_KEY;

  if (!api_key) {
    return NextResponse.json({ error: "Missing API Key", status: 500 });
  }

  const api_url = `https://serpapi.com/search.json?engine=google_maps_photos&data_id=${encodeURIComponent(
    dataId
  )}&api_key=${encodeURIComponent(api_key)}`;

  try {
    const response = await fetch(api_url);
    const photo = await response.json();
    const photoURL = photo.photos[0].image;

    return NextResponse.json(photoURL);
  } catch (error) {
    console.error("Error fetching photo from SerpAPI:", error);
  }
}
