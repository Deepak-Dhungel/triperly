import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

export const getPlaceDetail = async (placeQuery: string) => {
  try {
    const response = await axios.get(`/api/placesearch?query=${placeQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
};

export const fetchPlacePhoto = async (placeName: string) => {
  try {
    const data = await getPlaceDetail(placeName);
    // console.log("Place Data:", data.results[0].photos[0].photo_reference);

    const photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1280&photo_reference=${data.results[0].photos[0].photo_reference}&key=${apiKey}`;
    // console.log(photoURL);
    return photoURL;
  } catch (error) {
    console.error("Failed to fetch place data:", error);
  }
};
