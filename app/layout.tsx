import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Outfit } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContextProvider } from "@/context/ToastContext";
import Toast from "@/components/ui-elements/Toast";

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
        <ToastContextProvider>
          <AuthContextProvider>
            <Header />
            <Toast />
            {children}
          </AuthContextProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
