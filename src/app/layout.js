import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google"; // ✅ Import Poppins
import "./globals.css";
import TawkToScript from "@/components/TawkToScript"; // <-- Tawk.to Script

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Optional: include the weights you plan to use
});

export const metadata = {
  title: "bundelkhandchamberofcommerce",
   description: "Official site for BCOC",
  icons: {
    icon: "/logo.png", // path from public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <TawkToScript />
        {children}
      </body>
    </html>
  );
}





























































//DEVELOPED BY - ARPIT SHUKLA