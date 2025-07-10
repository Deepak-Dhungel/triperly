import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import LoginPage from "./login/page";

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
    <html lang="en">
      <body className="bg-background relative">
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
