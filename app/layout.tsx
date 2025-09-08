import type { Metadata } from "next";
import { Inter,  Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// Setup for the main font (Inter)
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Set up a CSS variable
});

// Setup for the new, thin italic font (Cormorant Garamond)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'], // Load the light weight
  style: ['italic'], // Load the italic style
  variable: '--font-cormorant', // Set up a CSS variable for it
});


export const metadata: Metadata = {
  title: "Amman Chuhan",
  description: "Personal resume website for Amman Chuhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} !scroll-smooth bg-gray-950`}>
      <body className={`font-sans text-stone-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
