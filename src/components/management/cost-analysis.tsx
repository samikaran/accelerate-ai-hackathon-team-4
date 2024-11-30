import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, Users, TrendingUp } from "lucide-react";
import MetricCard from "./metric-card";

interface CostMetric {
  category: string;
  percentage: number;
  cost: number;
}

const CostAnalysis: React.FC = () => {
  // Metrics data for overview cards
  const metrics = [
    {
      title: "Average CAC",
      value: "$120",
      icon: <DollarSign />,
      colorClass: "text-blue-500",
    },
    {
      title: "New Customers",
      value: "256",
      icon: <Users />,
      colorClass: "text-green-500",
    },
    {
      title: "Monthly Growth",
      value: "+12%",
      icon: <TrendingUp />,
      colorClass: "text-purple-500",
    },
  ];

  // Data for bar chart
  const costData: CostMetric[] = [
    { category: "Media", percentage: 63, cost: 63000 },
    { category: "Traffic", percentage: 51, cost: 51000 },
    { category: "SEO", percentage: 50, cost: 50000 },
    { category: "Branding", percentage: 28, cost: 28000 },
    { category: "Social", percentage: 18, cost: 18000 },
    { category: "Email", percentage: 17, cost: 17000 },
    { category: "Marketing", percentage: 16, cost: 16000 },
    { category: "Software", percentage: 15, cost: 15000 },
    { category: "Programs", percentage: 5, cost: 5000 },
    { category: "Others", percentage: 2, cost: 2000 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Cost Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Distribution Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              {/* <BarChart
                data={costData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis
                  dataKey="category"
                  type="category"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="percentage"
                  fill="#4444ff"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart> */}
              <BarChart
                data={costData}
                layout="horizontal" // Changed from vertical to horizontal
                margin={{ top: 5, right: 30, left: 60, bottom: 25 }} // Adjusted margins
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis type="number" domain={[0, 100]} unit="%" />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="percentage"
                  fill="#4444ff"
                  radius={[4, 4, 0, 0]} // Modified radius for horizontal bars
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costData.map((item) => (
              <div
                key={item.category}
                className="flex justify-between items-center"
              >
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-gray-600">
                      ${item.cost.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <span className="font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysis;
