import type { Metadata } from "next";
import AIAssistant from "@/components/layouts/ai-assistant";

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
    url: "https://growthlens.vercel.app",
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <AIAssistant />
    </div>
  );
}
