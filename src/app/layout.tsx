import type { Metadata } from "next";
import { Baskervville_SC, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baskervilleSC = Baskervville_SC({
  variable: "--font-baskerville-sc",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encounter Forge",
  description:
    "Build balanced and engaging D&D 5e encounters with ease! Customize enemies, set difficulty levels, and fine-tune battles to challenge your players. Plan your next adventure now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${baskervilleSC.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
