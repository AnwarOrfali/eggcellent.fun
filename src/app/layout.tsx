import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eggcellent.fun - The Community Egg Recipe Hub",
  description: "Discover, share, and review the world's greatest egg recipes — from shakshukas and silky french scrambles to tamagoyaki and ramen eggs.",
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
