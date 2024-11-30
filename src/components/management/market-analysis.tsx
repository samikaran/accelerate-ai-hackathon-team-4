"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";

interface MarketData {
  marketShare: {
    competitor: string;
    share: number;
    revenue: number;
    growth: number;
  }[];
  customerSegments: {
    segment: string;
    revenue: number;
    growth: number;
    customers: number;
    satisfaction: number;
  }[];
  trends: {
    month: string;
    marketSize: number;
    opportunity: number;
    penetration: number;
  }[];
  metrics: {
    title: string;
    value: number;
    change: number;
    trend: "up" | "down";
    icon: any;
  }[];
}

const mockMarketData: MarketData = {
  marketShare: [
    { competitor: "Our Company", share: 28, revenue: 2800000, growth: 15 },
    { competitor: "Competitor A", share: 35, revenue: 3500000, growth: 10 },
    { competitor: "Competitor B", share: 22, revenue: 2200000, growth: 8 },
    { competitor: "Others", share: 15, revenue: 1500000, growth: 5 },
  ],
  customerSegments: [
    {
      segment: "Enterprise",
      revenue: 450000,
      growth: 15,
      customers: 12,
      satisfaction: 92,
    },
    {
      segment: "Mid-Market",
      revenue: 280000,
      growth: 22,
      customers: 45,
      satisfaction: 88,
    },
    {
      segment: "Small Business",
      revenue: 150000,
      growth: 28,
      customers: 120,
      satisfaction: 85,
    },
    {
      segment: "Startup",
      revenue: 80000,
      growth: 35,
      customers: 200,
      satisfaction: 90,
    },
  ],
  trends: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString("default", { month: "short" }),
    marketSize: Math.floor(Math.random() * 1000000) + 4000000,
    opportunity: Math.floor(Math.random() * 500000) + 1000000,
    penetration: Math.floor(Math.random() * 20) + 10,
  })),
  metrics: [
    {
      title: "Total Market Size",
      value: 5000000,
      change: 12.5,
      trend: "up",
      icon: Target,
    },
    {
      title: "Market Share",
      value: 28,
      change: 3.2,
      trend: "up",
      icon: PieChart,
    },
    {
      title: "Customer Base",
      value: 377,
      change: 15.8,
      trend: "up",
      icon: Users,
    },
    {
      title: "Growth Rate",
      value: 22.5,
      change: 4.3,
      trend: "up",
      icon: TrendingUp,
    },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function MarketAnalysis() {
  const [data] = useState(mockMarketData);

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">{metric.title}</p>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <p className="text-2xl font-bold">
                        {typeof metric.value === "number" &&
                        (metric.title.includes("Rate") ||
                          metric.title.includes("Share"))
                          ? `${metric.value}%`
                          : metric.title.includes("Size")
                          ? `$${(metric.value / 1000000).toFixed(1)}M`
                          : metric.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span className="ml-1">{Math.abs(metric.change)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Market Share Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Share Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.marketShare}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="share"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.marketShare.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <BarChart data={data.marketShare}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competitor" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | string) => {
                      if (typeof value === "number") {
                        return `$${(value / 1000000).toFixed(1)}M`;
                      }
                      return value;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="growth" fill="#82ca9d" name="Growth %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Segment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={data.customerSegments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="customers"
                  fill="#8884d8"
                  name="Customer Count"
                />
                <Bar
                  yAxisId="right"
                  dataKey="satisfaction"
                  fill="#82ca9d"
                  name="Satisfaction %"
                />
                <Bar
                  yAxisId="right"
                  dataKey="growth"
                  fill="#ffc658"
                  name="Growth %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends & Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <LineChart data={data.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name.includes("Size") || name.includes("Opportunity")
                      ? `$${(value / 1000000).toFixed(1)}M`
                      : `${value}%`,
                    name,
                  ]}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="marketSize"
                  stroke="#8884d8"
                  name="Market Size"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="opportunity"
                  stroke="#82ca9d"
                  name="Opportunity Size"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="penetration"
                  stroke="#ffc658"
                  name="Market Penetration %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Segment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.customerSegments.map((segment) => (
          <Card key={segment.segment}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{segment.segment}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium">
                    ${(segment.revenue / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customers</span>
                  <span className="font-medium">{segment.customers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Growth</span>
                  <span className="font-medium">{segment.growth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Satisfaction</span>
                  <span className="font-medium">{segment.satisfaction}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
