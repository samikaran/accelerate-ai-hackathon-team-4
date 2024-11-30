"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
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
import { MessageCircle, TrendingUp, Star, ThumbsUp } from "lucide-react";
// import MetricCard from "./metric-card";

const mockFeedback = [
  {
    id: "1",
    text: "Great user interface, very intuitive!",
    sentiment: "positive",
    source: "app_review",
    createdAt: new Date("2024-01-20"),
    rating: 5,
  },
  {
    id: "2",
    text: "Loading times could be improved",
    sentiment: "negative",
    source: "support_ticket",
    createdAt: new Date("2024-01-20"),
    rating: 2,
  },
  {
    id: "3",
    text: "The new feature is okay, but needs some work",
    sentiment: "neutral",
    source: "survey",
    createdAt: new Date("2024-01-19"),
    rating: 3,
  },
  {
    id: "4",
    text: "Excellent customer support!",
    sentiment: "positive",
    source: "email",
    createdAt: new Date("2024-01-19"),
    rating: 5,
  },
  {
    id: "5",
    text: "Missing some key features",
    sentiment: "negative",
    source: "app_review",
    createdAt: new Date("2024-01-18"),
    rating: 2,
  },
];

const SENTIMENT_COLORS = {
  positive: "#4CAF50",
  neutral: "#FFC107",
  negative: "#F44336",
};

const summaryMetrics = [
  {
    title: "Total Feedback",
    value: "256",
    change: "+12%",
    icon: MessageCircle,
    colorClass: "text-blue-500",
  },
  {
    title: "Average Rating",
    value: "4.2",
    change: "+0.3",
    icon: Star,
    colorClass: "text-green-500",
  },
  {
    title: "Satisfaction Score",
    value: "85%",
    change: "+5%",
    icon: ThumbsUp,
    colorClass: "text-purple-500",
  },
  {
    title: "Response Rate",
    value: "92%",
    change: "+3%",
    icon: TrendingUp,
    colorClass: "text-red-500",
  },
];

// Predefined trend data to ensure we have values for the chart
const predefinedTrendData = [
  { date: "Mon", positive: 5, negative: 2, neutral: 1 },
  { date: "Tue", positive: 4, negative: 1, neutral: 2 },
  { date: "Wed", positive: 6, negative: 2, neutral: 1 },
  { date: "Thu", positive: 3, negative: 3, neutral: 2 },
  { date: "Fri", positive: 5, negative: 1, neutral: 1 },
  { date: "Sat", positive: 4, negative: 2, neutral: 2 },
  { date: "Sun", positive: 7, negative: 1, neutral: 1 },
];

export default function FeedbackAnalysis() {
  const [feedback] = useState(mockFeedback);
  const [trendData] = useState(predefinedTrendData);

  // Calculate sentiment distribution
  const sentimentData = Object.entries(
    feedback.reduce((acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {summaryMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))} */}
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="mt-2">
                  <span className="text-green-500 text-sm">
                    {metric.change} vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          SENTIMENT_COLORS[
                            entry.name as keyof typeof SENTIMENT_COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke={SENTIMENT_COLORS.positive}
                    name="Positive"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="neutral"
                    stroke={SENTIMENT_COLORS.neutral}
                    name="Neutral"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="negative"
                    stroke={SENTIMENT_COLORS.negative}
                    name="Negative"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <p className="text-gray-700">{item.text}</p>
                  <Badge
                    className={`${
                      item.sentiment === "positive"
                        ? "bg-green-100 text-green-800"
                        : item.sentiment === "negative"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.sentiment}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className={`${
                      item.source === "app_review"
                        ? "bg-blue-100 text-blue-800"
                        : item.source === "support_ticket"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.source.replace("_", " ")}
                  </Badge>
                  <span>{item.createdAt.toLocaleDateString()}</span>
                  {item.rating && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {item.rating}/5
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
