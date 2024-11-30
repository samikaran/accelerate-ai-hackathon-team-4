"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
} from "lucide-react";

interface MetricCard {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: any;
  formatter: (value: number) => string;
}

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

const mockMetrics: MetricCard[] = [
  {
    title: "Monthly Revenue",
    value: 125000,
    change: 15.8,
    trend: "up",
    icon: DollarSign,
    formatter: (value) => `$${value.toLocaleString()}`,
  },
  {
    title: "Customer LTV",
    value: 2800,
    change: 8.2,
    trend: "up",
    icon: Users,
    formatter: (value) => `$${value.toLocaleString()}`,
  },
  {
    title: "Burn Rate",
    value: 45000,
    change: -5.3,
    trend: "down",
    icon: CreditCard,
    formatter: (value) => `$${value.toLocaleString()}/mo`,
  },
  {
    title: "Growth Rate",
    value: 28.5,
    change: 3.2,
    trend: "up",
    icon: TrendingUp,
    formatter: (value) => `${value}%`,
  },
];

const mockFinancialData: FinancialData[] = [
  { month: "Jan", revenue: 95000, expenses: 65000, profit: 30000 },
  { month: "Feb", revenue: 105000, expenses: 68000, profit: 37000 },
  { month: "Mar", revenue: 112000, expenses: 70000, profit: 42000 },
  { month: "Apr", revenue: 118000, expenses: 72000, profit: 46000 },
  { month: "May", revenue: 125000, expenses: 75000, profit: 50000 },
  { month: "Jun", revenue: 130000, expenses: 76000, profit: 54000 },
];

export default function FinancialMetrics() {
  const [metrics] = useState(mockMetrics);
  const [financialData] = useState(mockFinancialData);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
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
                        {metric.formatter(metric.value)}
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

      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  name="Revenue"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#82ca9d"
                  name="Expenses"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Profit Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Profit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="profit" fill="#8884d8" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Revenue (YTD)</span>
                <span className="font-bold">
                  $
                  {financialData
                    .reduce((acc, curr) => acc + curr.revenue, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Monthly</span>
                <span className="font-bold">
                  $
                  {Math.round(
                    financialData.reduce((acc, curr) => acc + curr.revenue, 0) /
                      financialData.length
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Expenses (YTD)</span>
                <span className="font-bold">
                  $
                  {financialData
                    .reduce((acc, curr) => acc + curr.expenses, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Monthly</span>
                <span className="font-bold">
                  $
                  {Math.round(
                    financialData.reduce(
                      (acc, curr) => acc + curr.expenses,
                      0
                    ) / financialData.length
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Profit (YTD)</span>
                <span className="font-bold">
                  $
                  {financialData
                    .reduce((acc, curr) => acc + curr.profit, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Monthly</span>
                <span className="font-bold">
                  $
                  {Math.round(
                    financialData.reduce((acc, curr) => acc + curr.profit, 0) /
                      financialData.length
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
