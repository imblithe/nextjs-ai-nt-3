import { Suspense } from "react";
import type { Metadata } from "next";
import {
  Prompt,
  Nunito,
  Poppins,
  Space_Mono,
} from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import AppFooter from "@/app/(front)/components/app-footer";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const prompt = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
  variable: "--font-thai",
});

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-space",
});

export const metadata: Metadata = {
  title: "ShopVibe | E-Commerce COSCI",
  description: "ร้านค้าออนไลน์สไตล์แฟชั่นและไลฟ์สไตล์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        poppins.variable,
        nunito.variable,
        prompt.variable,
        spaceMono.variable
      )}
    >
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
          <Navbar />
        </Suspense>
        {children}
        <AppFooter />
      </body>
    </html>
  );
}