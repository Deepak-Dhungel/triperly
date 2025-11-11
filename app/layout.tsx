import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Outfit } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import { AppContextProvider } from "@/context/AppContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "TripErly",
  description: "Plan your dream trip with TripErly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-background">
        <AppContextProvider>
          <AuthContextProvider>
            <Header />
            {children}
          </AuthContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
