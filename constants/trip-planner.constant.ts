export const budgetOptions = [
  {
    icon: "💵",
    title: "Low",
    desc: "0 - 1000 USD",
  },
  {
    icon: "💰",
    title: "Medium",
    desc: "1000 - 2500 USD",
  },
  {
    icon: "💸",
    title: "High",
    desc: "2500+ USD",
  },
];

export const travellingWith = [
  {
    icon: "🧑",
    title: "Solo",
    desc: "1 person",
  },
  {
    icon: "👩‍❤️‍👨",
    title: "Couple",
    desc: "2 people",
  },
  {
    icon: "👨🏻‍👩🏻‍👦🏻‍👦🏻",
    title: "Small Family",
    desc: "3-4 people",
  },
  {
    icon: "🤝",
    title: "Group",
    desc: "5-10 people",
  },
];

export const travelMonth = [
  {
    icon: "⛄",
    season: "Winter",
    months: "December-February",
  },
  {
    icon: "🌸",
    season: "Spring",
    months: "March-May",
  },
  {
    icon: "🌞",
    season: "Summer",
    months: "June-August",
  },
  {
    icon: "🍁",
    season: "Autumn",
    months: "September-November",
  },
];

export const geminiPromptConstant = `You are an intelligent travel assistant helping users plan trips by providing tailored recommendations based on the selected travel month. Hotel prices and activity costs should reflect the seasonal variation for the given month, in USD. Based on the input provided, generate the best travel experience with the following details:

User Input:
1. Location: {location}
2. Budget: {budget}
3. Traveling With: {travellingWith}
4. Trip Duration: {duration} days
5. Travel Month: {travelMonth}

Output (in JSON format):
{
  "tripSummary": {
    "summaryText": "A brief summary of the recommended trip.",
    "totalCost": "Estimated total cost for the trip.",
    "location":"location of the Trip",
    "duration":"total duration of the trip",
    "travellingWith":"travelling with input provided by the user",
    "travelMonth":"travel month input provided by the user",
    "userBudgetChoice": "budget input provided by the user",
  },
  "hotelRecommendations": [
    {
      "name": "Hotel Name",
      "hotelLocation": "Address of the hotel",
      "pricePerNight": "Hotel price per night in local currency",
      "rating": "Hotel rating out of 5",
      "description": "A brief description of the hotel."
    }
    // provide 4 hotel recommendations
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "name": "Place Name",
          "description": "A brief description of the place.",
          "approxExpenses": "Approximate expenses in local currency.",
          "bestTimeToVisit": "Suggested time to visit the place."
        }
          // Add multiple places that can be covered in a day
      ]
    }
      // Repeat for each day of the trip.
  ],
  "costBreakdown": {
    "accommodation": "Total accommodation cost for the trip.",
    "transportation": "Estimated transportation expenses.",
    "activities": "Cost of activities and excursions.",
    "meals": "Estimated cost of food and beverages."
  }
}`;
