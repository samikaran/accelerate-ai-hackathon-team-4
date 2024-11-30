"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import FeedbackAnalytics from "@/components/management/feedback-analytics";
// import CostAnalytics from "@/components/management/cost-analytics";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FeedbackAnalysis from "@/components/management/feedback-analysis";
import CostAnalysis from "@/components/management/cost-analysis";
import MarketAnalysis from "@/components/management/market-analysis";

const ManagementPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/")}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold">Management Dashboard</h1>
      </div>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback">
          {/* <FeedbackAnalytics /> */}
          <FeedbackAnalysis />
        </TabsContent>
        <TabsContent value="market">
          {/* <FeedbackAnalytics /> */}
          <MarketAnalysis />
        </TabsContent>

        <TabsContent value="costs">
          {/* <CostAnalytics /> */}
          <CostAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagementPage;
