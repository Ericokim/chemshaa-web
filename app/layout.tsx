import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: "700",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chemshaa-web.vercel.app"),
  title: "ChemShaa — Live Trivia",
  description:
    "ChemShaa live trivia: log in with your mobile money number and get ready for the next show at 2:00 PM Nairobi.",
  openGraph: {
    title: "ChemShaa — Live Trivia",
    description:
      "Daily live trivia with cash prizes. Log in and get ready for the next show at 2:00 PM Nairobi.",
    url: "/",
    siteName: "ChemShaa",
    images: [{ url: "/icon.png", width: 240, height: 240 }],
  },
  twitter: {
    card: "summary",
    title: "ChemShaa — Live Trivia",
    description:
      "Daily live trivia with cash prizes. Log in and get ready for the next show at 2:00 PM Nairobi.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFD92F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(bodoniModa.variable, inter.variable, "font-sans")}>
      <body className="min-h-dvh bg-brand text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
