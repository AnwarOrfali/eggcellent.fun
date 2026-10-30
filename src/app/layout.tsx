import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Eggcellent";
const siteDescription =
  "A cozy corner of the internet for anyone who loves eggs. Find, share, and review everyday favorites, from quick morning scrambles to lazy weekend shakshukas.";

export const metadata: Metadata = {
  metadataBase: new URL("https://eggcellent.fun"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "egg recipes",
    "easy breakfast ideas",
    "shakshuka",
    "scrambled eggs",
    "tamagoyaki",
    "mayak eggs",
    "brunch recipes",
    "home cooking",
  ],
  authors: [{ name: "Eggcellent Community" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eggcellent.fun",
    siteName: "Eggcellent",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Eggcellent Homemade Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-amber-50/20 text-neutral-900 font-sans">
        {children}
      </body>
    </html>
  );
}
