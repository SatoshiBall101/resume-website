import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ✅ Request the exact variant: 400 italic
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],       // must be array, not string
  style: ["italic"],     // must be array, not string
  variable: "--font-ebgaramond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amman Chuhan",
  description: "Personal resume website for Amman Chuhan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable} !scroll-smooth bg-gray-950`}>
      <body className="bg-gray-950 font-sans text-stone-200 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
