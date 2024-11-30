import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
  target: number;
}

const RevenueChart: React.FC = () => {
  const revenueData: RevenueData[] = [
    { month: "Jan", revenue: 120000, target: 100000 },
    { month: "Feb", revenue: 150000, target: 120000 },
    { month: "Mar", revenue: 180000, target: 140000 },
    { month: "Apr", revenue: 170000, target: 160000 },
    { month: "May", revenue: 220000, target: 180000 },
    { month: "Jun", revenue: 250000, target: 200000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2196F3"
                name="Actual Revenue"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#4CAF50"
                name="Target"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
