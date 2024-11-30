import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GrowthLens - AI-Powered Analytics Platform",
  description:
    "Transform your startup growth with AI-driven insights. GrowthLens provides clear analytics for product managers and investors.",
  keywords:
    "startup analytics, AI insights, business growth, investor metrics, product management",
  openGraph: {
    title: "GrowthLens - AI-Powered Analytics Platform",
    description: "Transform your startup growth with AI-driven insights",
    type: "website",
    url: "https://growthlens.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GrowthLens Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthLens - AI-Powered Analytics Platform",
    description: "Transform your startup growth with AI-driven insights",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <AIAssistant /> */}
      </body>
    </html>
  );
}
