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

    if (
      !photo.photos ||
      !Array.isArray(photo.photos) ||
      photo.photos.length === 0
    ) {
      return NextResponse.json({ error: "No photos found", status: 404 });
    }

    const photoURL = photo.photos[0].image;
    if (!photoURL) {
      return NextResponse.json({ error: "Photo URL not found", status: 404 });
    }

    return NextResponse.json(photoURL);
  } catch (error) {
    console.error("Error fetching photo from SerpAPI:", error);
    return NextResponse.json({ error: "Failed to fetch photo", status: 500 });
  }
}
