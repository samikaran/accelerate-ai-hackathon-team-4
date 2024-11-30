import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

interface FinancialData {
  month: string;
  mrr: number;
  expenses: number;
  cashflow: number;
  burnRate: number;
}

interface BurndownData {
  month: string;
  runway: number;
  cashBalance: number;
}

const FinancialMetrics1: React.FC = () => {
  const financialData: FinancialData[] = [
    {
      month: "Jan",
      mrr: 200000,
      expenses: 150000,
      cashflow: 50000,
      burnRate: 150000,
    },
    {
      month: "Feb",
      mrr: 220000,
      expenses: 160000,
      cashflow: 60000,
      burnRate: 160000,
    },
    {
      month: "Mar",
      mrr: 240000,
      expenses: 170000,
      cashflow: 70000,
      burnRate: 170000,
    },
    {
      month: "Apr",
      mrr: 260000,
      expenses: 180000,
      cashflow: 80000,
      burnRate: 180000,
    },
    {
      month: "May",
      mrr: 280000,
      expenses: 190000,
      cashflow: 90000,
      burnRate: 190000,
    },
    {
      month: "Jun",
      mrr: 300000,
      expenses: 200000,
      cashflow: 100000,
      burnRate: 200000,
    },
  ];

  const burndownData: BurndownData[] = [
    { month: "Jul", runway: 18, cashBalance: 3600000 },
    { month: "Aug", runway: 16, cashBalance: 3200000 },
    { month: "Sep", runway: 14, cashBalance: 2800000 },
    { month: "Oct", runway: 12, cashBalance: 2400000 },
    { month: "Nov", runway: 10, cashBalance: 2000000 },
    { month: "Dec", runway: 8, cashBalance: 1600000 },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">LTV/CAC Ratio</p>
              <p className="text-2xl font-bold">3.5x</p>
              <p className="text-sm text-green-500">Above target of 3x</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Gross Margin</p>
              <p className="text-2xl font-bold">72%</p>
              <p className="text-sm text-green-500">+5% vs last quarter</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Cash Runway</p>
              <p className="text-2xl font-bold">18 months</p>
              <p className="text-sm text-blue-500">Based on current burn</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Unit Economics</p>
              <p className="text-2xl font-bold">$1.2k</p>
              <p className="text-sm text-green-500">+15% vs last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MRR and Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#2196F3"
                  name="MRR"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#F44336"
                  name="Expenses"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cashflow"
                  stroke="#4CAF50"
                  name="Cash Flow"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Burn Rate and Runway */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Runway Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={burndownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="cashBalance"
                  fill="#2196F3"
                  name="Cash Balance ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="runway"
                  stroke="#FF9800"
                  name="Runway (months)"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialMetrics1;
