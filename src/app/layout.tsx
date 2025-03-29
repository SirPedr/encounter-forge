import type { Metadata } from "next";
import { Inter, Bentham } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bentham = Bentham({
  subsets: ["latin"],
  variable: "--font-bentham",
  display: "swap",
  weight: "400",
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
      <body className={`${inter.variable} ${bentham.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
