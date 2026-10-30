import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eggcellent",
  description: "Discover, share, and review the world's greatest egg recipes — from shakshukas and silky french scrambles to tamagoyaki and ramen eggs.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
