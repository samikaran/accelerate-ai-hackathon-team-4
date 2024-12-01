"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { DollarSign, Users, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  colorClass,
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={colorClass}>{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const getGeographicalDistribution = (customers: any[]) => {
  const distribution = customers.reduce((acc: any, customer: any) => {
    acc[customer.location] = (acc[customer.location] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribution)
    .map(([state, count]) => ({
      state,
      customers: count,
    }))
    .sort((a: any, b: any) => b.customers - a.customers)
    .slice(0, 10); // Top 10 states
};

const getColorPreferences = (customers: any[]) => {
  const preferences = customers.reduce((acc: any, customer: any) => {
    acc[customer.preferred_color] = (acc[customer.preferred_color] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(preferences)
    .map(([color, count]) => ({
      color,
      customers: count,
    }))
    .sort((a: any, b: any) => b.customers - a.customers);
};

const getSizeDistribution = (customers: any[]) => {
  const distribution = customers.reduce((acc: any, customer: any) => {
    acc[customer.preferred_size] = (acc[customer.preferred_size] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribution).map(([size, value]) => ({
    size,
    value,
  }));
};

const getShippingPreferences = (customers: any[]) => {
  const preferences = customers.reduce((acc: any, customer: any) => {
    acc[customer.preferred_shipping] =
      (acc[customer.preferred_shipping] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(preferences).map(([name, value]) => ({
    name,
    value,
  }));
};

const getAgeDistribution = (customers: any[]) => {
  const ranges = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "56+": 0,
  };

  customers.forEach((customer) => {
    const age = customer.age;
    if (age <= 25) ranges["18-25"]++;
    else if (age <= 35) ranges["26-35"]++;
    else if (age <= 45) ranges["36-45"]++;
    else if (age <= 55) ranges["46-55"]++;
    else ranges["56+"]++;
  });

  return Object.entries(ranges).map(([range, customers]) => ({
    range,
    customers,
  }));
};

const getGenderDistribution = (customers: any[]) => {
  const distribution = customers.reduce((acc: any, customer: any) => {
    acc[customer.gender] = (acc[customer.gender] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));
};

const CostAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("Fetched Data:", result);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Calculate metrics
  const calculateAveragePurchase = () => {
    try {
      const amounts = data.transactionData
        .map((t: any) =>
          parseFloat(t.purchase_amount || t["purchase_amount_(usd)"])
        )
        .filter((amount: number) => !isNaN(amount));

      return (
        amounts.reduce((a: number, b: number) => a + b, 0) / amounts.length
      ).toFixed(2);
    } catch (err) {
      console.error("Error calculating average purchase:", err);
      return "0.00";
    }
  };

  const metrics = [
    {
      title: "Average Purchase",
      value: `$${calculateAveragePurchase()}`,
      icon: <DollarSign />,
      colorClass: "text-blue-500",
    },
    {
      title: "Total Customers",
      value: data.customerData.length.toString(),
      icon: <Users />,
      colorClass: "text-green-500",
    },
    {
      title: "Avg Rating",
      value: (
        data.transactionData.reduce(
          (acc: number, curr: any) => acc + parseFloat(curr.review_rating),
          0
        ) / data.transactionData.length
      ).toFixed(1),
      icon: <TrendingUp />,
      colorClass: "text-purple-500",
    },
  ];

  // Prepare visualization data
  const categoryData = Object.entries(
    data.productData.reduce((acc: any, curr: any) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { count: 0, totalAmount: 0 };
      }
      acc[curr.category].count += 1;
      acc[curr.category].totalAmount += parseFloat(
        curr.average_purchase_amount
      );
      return acc;
    }, {})
  ).map(([category, values]: [string, any]) => ({
    category,
    averageAmount: values.totalAmount / values.count,
    count: values.count,
  }));

  const paymentData = Object.entries(
    data.transactionData.reduce((acc: any, curr: any) => {
      acc[curr.payment_method] = (acc[curr.payment_method] || 0) + 1;
      return acc;
    }, {})
  ).map(([method, count]: [string, number]) => ({
    name: method,
    value: count,
  }));

  return (
    <div className="space-y-6 p-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Category Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="averageAmount"
                  name="Average Amount ($)"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="right"
                  dataKey="count"
                  name="Number of Items"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {paymentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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

      {/* Purchase Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Trends by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <LineChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageAmount"
                  stroke="#8884d8"
                  name="Average Amount ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Geographical Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Geographical Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={getGeographicalDistribution(data.customerData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="customers"
                  fill="#8884d8"
                  name="Number of Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Color Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Colors Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={getColorPreferences(data.customerData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="color" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="customers"
                  fill="#8884d8"
                  name="Number of Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Size Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Size Preferences Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={getSizeDistribution(data.customerData)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {getSizeDistribution(data.customerData).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={getShippingPreferences(data.customerData)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {getShippingPreferences(data.customerData).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Age Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <BarChart data={getAgeDistribution(data.customerData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="customers"
                  fill="#8884d8"
                  name="Number of Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={getGenderDistribution(data.customerData)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {getGenderDistribution(data.customerData).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalytics;
