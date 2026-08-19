export const handleSubmitUserData = async () => {
  try {
    let tripResult = null;

    // clear previous trip data from local storage
    localStorage.removeItem("tripData");
    localStorage.removeItem("locationPhoto");

    const { location, budget, noOfDays, travellingWith, travelMonth } =
      tripUserInput;
    if (!location || !budget || !noOfDays || !travellingWith || !travelMonth) {
      setMissingInputError(true);
      return;
    }
    setShowLoader(true);

    const geminiPrompt = geminiPromptConstant
      .replace("{location}", location)
      .replace("{budget}", budget)
      .replace("{travellingWith}", travellingWith)
      .replace("{duration}", noOfDays)
      .replace("{travelMonth}", travelMonth);

    try {
      abortControllerRef.current = new AbortController();

      const connectWithGemini = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: geminiPrompt }),
        signal: abortControllerRef.current.signal,
      });
      const geminiResponse = await connectWithGemini.json();

      //store trip data in local storage
      if (geminiResponse.tripResult) {
        tripResult = geminiResponse.tripResult;
        localStorage.setItem("tripData", JSON.stringify(tripResult));
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Request was cancelled");
        return;
      }

      console.error("error while fetching response from gemini", error);
    }

    // fetch location photo
    try {
      const photoURL = await getLocationPhoto(location);

      //store photo URL in local storage
      if (photoURL) {
        localStorage.setItem("locationPhoto", photoURL);
      }
    } catch (error) {
      console.error("error fetching location photo:", error);
    }

    // redirect to my-trip page
    router.push(`/trip-planner/trip-result/${tripResult.tripId}`);
  } catch (error) {
    console.error("error fetching photo:", error);
  } finally {
    setShowLoader(false);
  }
};

export async function analyzeTrip(tripUserInput) {
  const { location, budget, noOfDays, travellingWith, travelMonth } =
    tripUserInput;
}
