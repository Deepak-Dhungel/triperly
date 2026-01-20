import Paris from "@/public/places/paris.jpg";
import Tokyo from "@/public/places/tokyo.jpg";
import Rome from "@/public/places/rome.jpg";
import Bangkok from "@/public/places/bangkok.jpg";
import NewYork from "@/public/places/new_york.jpg";

export const appData = {
  name: "TripErly",
  description: "AI-Trip Planning App",
  logo: "",

  heroSection: {
    title: "Discover your next trip",
    desc: "Your personal AI-Trip planner and travel curator, creating custom itineraries tailored to your interests and budget.",
  },
  aboutSection: {
    title: ["Plan", "Discover", "Experience"],
    desc: "Skip the manual trip planning and start your effortless journey with TripErly today, at no cost. The start of a new Travel Planning Experience.",
    images: ["/USA.svg", "/paris.svg", "/london.svg"],
    buttonText: "Learn More",
  },
  recentDestinationSection: {
    title: "Our Recent Destination",
    desc: "These are some of the popular destinations our users have recently explored.",
  },
};

export const placesToExplore = [
  {
    id: 1,
    name: "Paris",
    places: ["Effiel Tower", "Louver Meuseum", "Notre-Dame Cathedral"],
    image: Paris,
  },
  {
    id: 2,
    name: "Tokyo",
    places: ["Mount Fuji", "Shibuya Crossing", "Tokyo Tower"],
    image: Tokyo,
  },
  {
    id: 3,
    name: "Rome",
    places: ["Colosseum", "Vatican City", "Trevi Fountain"],
    image: Rome,
  },
  {
    id: 4,
    name: "Bangkok",
    places: ["Grand Palace", "Wat Arun", "Chatuchak Market"],
    image: Bangkok,
  },
  {
    id: 5,
    name: "New York",
    places: ["Statue of Liberty", "Central Park", "Times Square"],
    image: NewYork,
  },
];

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Licensing", href: "/licensing" },
  { label: "Contact", href: "/contact" },
];
