# 🌍 TripErly  
Plan your dream trip with AI-powered recommendations, secure authentication, and a modern user experience.

TripErly is an intelligent travel-planning application built with **Next.js**, offering AI-generated itineraries using **Google Gemini**, secure authentication with **Firebase Auth + Firebase Admin**, and persistent session handling using server-side cookies.

---

## ✨ Features

### 🧭 Trip Planning & AI Recommendations
- Intelligent **trip search** based on user inputs (destination, duration, preferences)
- **Daily itinerary recommendations** powered by Google Gemini
- Smart suggestions for hotels, attractions, activities, and nearby experiences

### 💾 Save & Manage Trips
- Save trip details to **Firestore**
- Upload and store trip images via **Firebase Storage**
- Access saved trips through a personalized **Dashboard**

### 🤖 Google Gemini Integration
- Gemini API used for:
  - AI itinerary generation
  - Attraction and activity suggestions
  - Destination insights
  - Context-aware planning

### 🔐 Authentication & Security
- Google Sign-In with **Firebase Authentication**
- Secure **server-side session cookies** using Firebase Admin SDK
- Protected routes using Next.js Middleware (e.g., `/dashboard`)
- Clean logout flow (client sign-out + session cookie removal)

### 🧩 UI & UX Enhancements
- Smooth toast notifications using Framer Motion
- Responsive design with Tailwind CSS
- Dynamic header showing user avatar when logged in
- Fast navigation and interactive feedback

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend / Server**
- Next.js API Routes & Middleware
- Firebase Admin SDK (server-side auth)
- Google Gemini API (AI recommendations)

**Authentication**
- Firebase Authentication (Google Sign-In)
- Secure HttpOnly session cookies

**Database & Storage**
- Cloud Firestore
- Firebase Storage

---

## 📸 Screenshots

### 🏠 Home Page
<img width="3020" alt="home page screenshot 1" src="https://github.com/user-attachments/assets/e0b76502-4143-4792-9826-d70c79bc9600" />

<img width="3016" alt="home page screenshot 2" src="https://github.com/user-attachments/assets/5908a6a1-f912-479e-8367-71e0ca8caacf" />

### 🔐 Login Page
<img width="3020" alt="login screenshot" src="https://github.com/user-attachments/assets/2a55374d-218f-43be-b982-655119aff5c2" />

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Deepak-connect/triperly.git
cd triperly
