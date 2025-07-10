export type TripUserInputType = {
  location: string | undefined;
  noOfDays: string;
  budget: string;
  travellingWith: string;
  travelMonth: string;
};

export type TripDataType = {
  costBreakdown: CostBreakdownType;
  hotelRecommendations: HotelRecommendationType[];
  itinerary: ItineraryType[];
  tripSummary: TripSummaryType;
};

export type CostBreakdownType = {
  accommodation: string;
  activities: string;
  meals: string;
  transportation: string;
};

export type HotelRecommendationType = {
  name: string;
  hotelLocation: string;
  description: string;
  pricePerNight: string;
  rating: string;
};

export type ItineraryType = {
  day: number;
  places: ItineraryPlaceType[];
};

export type ItineraryPlaceType = {
  name: string;
  description: string;
  bestTimeToVisit: string;
  approxExpenses: string;
};

export type TripSummaryType = {
  summaryText: string;
  totalCost: string;
};
