// to get image of a location from serpapi, we first need data id
// then we can use that data id to get the image.
// getLocationPhoto() -> fetchDataIdFromSerpAPI() -> fetchLocationPhotoFromSerpAPI()

//fetch data id for a location using serpapi
const fetchDataIdFromSerpAPI = async (location: string) => {
  try {
    const res = await fetch(`/api/serp?q=${encodeURIComponent(location)}`);
    const dataId = await res.json();
    return dataId;
  } catch (error) {
    console.error("Error fetching data ID from SerpAPI:", error);
  }
};

//fetch location photo url using data id from serpapi
const fetchLocationPhotoFromSerpAPI = async (dataId: string) => {
  try {
    const res = await fetch(
      `/api/serp/photo?data_id=${encodeURIComponent(dataId)}`
    );
    const photoURL = await res.json();
    return photoURL;
  } catch (error) {
    console.error("Error fetching location photo from SerpAPI:", error);
  }
};

export const getLocationPhoto = async (location: string) => {
  const dataId = await fetchDataIdFromSerpAPI(location);

  if (dataId) {
    const locationPhotoURL = await fetchLocationPhotoFromSerpAPI(dataId);
    return locationPhotoURL;
  }
};
