"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartBar, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const FancyLandingPage = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          AI-Driven Insights for Startups
        </h1>
        <p className="text-xl text-gray-600 animate-slide-up">
          Choose your path to unlock startup potential
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl relative z-10">
        <button
          onMouseEnter={() => setHoveredCard("management")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleNavigation("/management")}
          className="flex-1 transform transition-all duration-300 hover:scale-105"
        >
          <Card
            className={`h-full p-8 transition-all duration-300 ${
              hoveredCard === "management"
                ? "bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl"
                : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`transform transition-all duration-300 ${
                  hoveredCard === "management" ? "scale-110" : ""
                }`}
              >
                <ChartBar size={64} className="text-blue-500 mb-6" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Management</h2>
              <p className="text-gray-600 mb-6">
                Access AI-powered insights for product decisions and customer
                analysis
              </p>
              <ArrowRight
                className={`transform transition-all duration-300 ${
                  hoveredCard === "management"
                    ? "translate-x-2 text-blue-500"
                    : "text-gray-400"
                }`}
              />
            </div>
          </Card>
        </button>

        <button
          onMouseEnter={() => setHoveredCard("investor")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleNavigation("/investor")}
          className="flex-1 transform transition-all duration-300 hover:scale-105"
        >
          <Card
            className={`h-full p-8 transition-all duration-300 ${
              hoveredCard === "investor"
                ? "bg-gradient-to-br from-green-50 to-green-100 shadow-2xl"
                : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`transform transition-all duration-300 ${
                  hoveredCard === "investor" ? "scale-110" : ""
                }`}
              >
                <Users size={64} className="text-green-500 mb-6" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Investor</h2>
              <p className="text-gray-600 mb-6">
                Explore startup metrics and growth potential with data-driven
                insights
              </p>
              <ArrowRight
                className={`transform transition-all duration-300 ${
                  hoveredCard === "investor"
                    ? "translate-x-2 text-green-500"
                    : "text-gray-400"
                }`}
              />
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
};

export default FancyLandingPage;
