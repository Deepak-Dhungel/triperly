// import {
//   GoogleGenerativeAI,
//   GenerateContentResult,
// } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyAbU4MDY2Hz6guHiCnUFfN5qHLTf0_62Yo");

// export async function fetchTripRecommendations() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   // Prepare the Gemini API request body using user input
//   const geminiPrompt = `
//     You are an intelligent travel assistant helping users plan trips by providing tailored recommendations. Based on the input provided, generate the best travel experience with the following details:

//     User Input:
//     1. Location: Kathmandu
//     2. Budget: low
//     3. Traveling With: solo
//     4. Trip Duration: 3 days

//     Output (in JSON format):
//     {
//       "tripSummary": {
//         "summaryText": "A brief summary of the recommended trip.",
//         "totalCost": "Estimated total cost for the trip."
//       },
//       "hotelRecommendations": [
//         {
//           "name": "Hotel Name",
//           "pricePerNight": "Hotel price per night in local currency",
//           "rating": "Hotel rating out of 5",
//           "description": "A brief description of the hotel."
//         }
//         // provide 4 hotel recommendations
//       ],
//       "itinerary": [
//         {
//           "day": 1,
//           "places": [
//             {
//               "name": "Place Name",
//               "description": "A brief description of the place.",
//               "placeId": "PLACE_ID", // Include Place ID for Google Places API
//               "approxExpenses": "Approximate expenses in local currency.",
//               "bestTimeToVisit": "Suggested time to visit the place."
//             }
//               // Add multiple places that can be covered in a day
//           ]
//         }
//           // Repeat for each day of the trip.
//       ],
//       "costBreakdown": {
//         "accommodation": "Total accommodation cost for the trip.",
//         "transportation": "Estimated transportation expenses.",
//         "activities": "Cost of activities and excursions.",
//         "meals": "Estimated cost of food and beverages."
//       }
//     }
//     `;

//   try {
//     const geminiData = await model.generateContent([geminiPrompt]);
//     const response = geminiData.response.text();

//     const formatResponse = response.replace(/```json\s?|\s?```/g, "").trim();
//     const parsedGeminiData = JSON.parse(formatResponse);
//     return parsedGeminiData;
//   } catch (error) {
//     console.error("Error fetching trip recommendations:", error);
//     throw error;
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Google Generative AI API key");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'You are an intelligent travel assistant helping users plan trips by providing tailored recommendations. Based on the input provided, generate the best travel experience with the following details:\n  \n    User Input:\n    1. Location: Kathmandu\n    2. Budget: low\n    3. Traveling With: solo\n    4. Trip Duration: 3 days\n  \n    Output (in JSON format):\n    {\n      "tripSummary": {\n        "summaryText": "A brief summary of the recommended trip.",\n        "totalCost": "Estimated total cost for the trip."\n      },\n      "hotelRecommendations": [\n        {\n          "name": "Hotel Name",\n          "pricePerNight": "Hotel price per night in local currency",\n          "rating": "Hotel rating out of 5",\n          "description": "A brief description of the hotel."\n        }\n        // provide 4 hotel recommendations\n      ],\n      "itinerary": [\n        {\n          "day": 1,\n          "places": [\n            {\n              "name": "Place Name",\n              "description": "A brief description of the place.",\n              "placeId": "PLACE_ID", // Include Place ID for Google Places API\n              "approxExpenses": "Approximate expenses in local currency.",\n              "bestTimeToVisit": "Suggested time to visit the place."\n            }\n              // Add multiple places that can be covered in a day\n          ]\n        }\n          // Repeat for each day of the trip.\n      ],\n      "costBreakdown": {\n        "accommodation": "Total accommodation cost for the trip.",\n        "transportation": "Estimated transportation expenses.",\n        "activities": "Cost of activities and excursions.",\n        "meals": "Estimated cost of food and beverages."\n      }\n    }\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripSummary": {\n    "summaryText": "Explore the rich cultural tapestry of Kathmandu on a budget-friendly 3-day solo adventure. Immerse yourself in ancient temples, bustling markets, and breathtaking mountain views while savoring local delicacies and experiencing the warmth of Nepalese hospitality.",\n    "totalCost": "Approximately $150 - $200 USD"\n  },\n  "hotelRecommendations": [\n    {\n      "name": "Zostel Kathmandu",\n      "pricePerNight": "1000 NPR (approx. $8 USD)",\n      "rating": "4.2",\n      "description": "A popular hostel known for its social atmosphere, comfortable dorms, and rooftop terrace with panoramic city views."\n    },\n    {\n      "name": "Kathmandu Guest House",\n      "pricePerNight": "1500 NPR (approx. $12 USD)",\n      "rating": "4.0",\n      "description": "A charming guesthouse offering clean and cozy private rooms with friendly staff and a central location."\n    },\n    {\n      "name": "The Old House",\n      "pricePerNight": "1800 NPR (approx. $14 USD)",\n      "rating": "4.5",\n      "description": "A traditional Nepali house converted into a guesthouse, offering a unique cultural experience with comfortable rooms and a peaceful ambiance."\n    },\n    {\n      "name": "Hotel Shanker",\n      "pricePerNight": "2500 NPR (approx. $20 USD)",\n      "rating": "3.8",\n      "description": "A budget-friendly hotel with clean and functional rooms, located near Thamel, offering a convenient base for exploring the city."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "places": [\n        {\n          "name": "Boudhanath Stupa",\n          "description": "A UNESCO World Heritage Site, this iconic stupa is a significant Buddhist pilgrimage site with a towering structure surrounded by prayer wheels and colorful prayer flags.",\n          "placeId": "ChIJy5Y-y8q4kjoR22-07b7H48",\n          "approxExpenses": "100 NPR (approx. $0.8 USD)",\n          "bestTimeToVisit": "Morning for a peaceful atmosphere and less crowds"\n        },\n        {\n          "name": "Pashupatinath Temple",\n          "description": "A sacred Hindu temple dedicated to Lord Shiva, known for its intricate architecture and religious significance.",\n          "placeId": "ChIJuwS7H6u4kjoR1B_6d47_xQ",\n          "approxExpenses": "50 NPR (approx. $0.4 USD)",\n          "bestTimeToVisit": "Morning for a serene atmosphere and fewer crowds"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "places": [\n        {\n          "name": "Kathmandu Durbar Square",\n          "description": "A historical square with ancient palaces, temples, and courtyards showcasing traditional Newari architecture, a vibrant cultural hub.",\n          "placeId": "ChIJp0q258u4kjoR1y2H6t5G34",\n          "approxExpenses": "100 NPR (approx. $0.8 USD)",\n          "bestTimeToVisit": "Afternoon to experience the lively street life and cultural performances"\n        },\n        {\n          "name": "Swayambhunath Stupa (Monkey Temple)",\n          "description": "A hilltop stupa offering panoramic views of Kathmandu valley, known for its resident monkeys and peaceful atmosphere.",\n          "placeId": "ChIJy5Y-y8q4kjoR22-07b7H48",\n          "approxExpenses": "100 NPR (approx. $0.8 USD)",\n          "bestTimeToVisit": "Sunset for breathtaking city views and a magical ambiance"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "places": [\n        {\n          "name": "Thamel",\n          "description": "A vibrant district known for its bustling markets, souvenir shops, restaurants, and nightlife, offering a unique shopping experience.",\n          "placeId": "ChIJy5Y-y8q4kjoR22-07b7H48",\n          "approxExpenses": "Varies based on shopping and dining",\n          "bestTimeToVisit": "Throughout the day for browsing, shopping, and enjoying street food"\n        },\n        {\n          "name": "Garden of Dreams",\n          "description": "A tranquil oasis offering a respite from the city bustle, featuring lush gardens, beautiful ponds, and serene walkways.",\n          "placeId": "ChIJd22tO8u4kjoR0_T3c4V78k",\n          "approxExpenses": "100 NPR (approx. $0.8 USD)",\n          "bestTimeToVisit": "Late afternoon for a relaxing stroll and admiring the flora"\n        }\n      ]\n    }\n  ],\n  "costBreakdown": {\n    "accommodation": "3 nights at 1500 NPR per night = 4500 NPR (approx. $36 USD)",\n    "transportation": "Public transportation and taxis: 500 NPR (approx. $4 USD)",\n    "activities": "Entrance fees and souvenirs: 500 NPR (approx. $4 USD)",\n    "meals": "3 days of local meals: 3000 NPR (approx. $24 USD)"\n  }\n}\n```',
        },
      ],
    },
  ],
});
