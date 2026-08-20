import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Business Development · Southcrest / Meridian",
  description: "Field lead capture and relationship workbench. Store: SPI Relationship Master.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
