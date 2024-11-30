"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialMetrics from "@/components/investors/financial-metrics";
// import FinancialMetrics1 from "@/components/investors/financial-metrics-1";
import MetricsOverview from "@/components/investors/metrics-overview";
import RevenueChart from "@/components/investors/revenue-chart";
import CustomerSegments from "@/components/investors/customer-segments";

const InvestorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/")}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold">Investor Dashboard</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsOverview />
          <RevenueChart />
          <CustomerSegments />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorPage;
