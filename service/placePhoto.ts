import { getJson } from "serpapi";

export async function getPlace() {
  getJson(
    {
      engine: "google_maps",
      q: "Denver",
      // ll: "@40.7455096,-74.0083012,15.1z",
      type: "search",
      api_key: process.env.NEXT_PUBLIC_SERPAPI_KEY,
    },
    (json) => {
      console.log(json["local_results"]);
    }
  );
}
