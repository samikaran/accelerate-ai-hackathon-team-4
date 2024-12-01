"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DollarSign, Users, TrendingUp, ShoppingCart } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Utility Functions
const calculateAverage = (array: any[], key: string): number => {
  if (!array.length) return 0;
  const sum = array.reduce(
    (acc, curr) => acc + (parseFloat(curr[key]) || 0),
    0
  );
  return sum / array.length;
};

const getMetrics = (data: any) => {
  // Calculate average purchase amount using total_purchase_amount from customerData
  const avgPurchase =
    data.customerData.reduce(
      (acc: number, curr: any) =>
        acc + (parseFloat(curr.total_purchase_amount) || 0),
      0
    ) / data.customerData.length;

  const totalCustomers = data.customerData.length;
  const avgRating =
    data.customerData.reduce(
      (acc: number, curr: any) =>
        acc + (parseFloat(curr.average_review_rating) || 0),
      0
    ) / totalCustomers;
  const totalOrders = data.customerData.reduce(
    (acc: number, curr: any) => acc + (parseInt(curr.total_purchases) || 0),
    0
  );

  return [
    {
      title: "Average Purchase",
      value: `$${avgPurchase.toFixed(2)}`,
      icon: <DollarSign />,
      colorClass: "text-blue-500",
    },
    {
      title: "Total Customers",
      value: totalCustomers.toString(),
      icon: <Users />,
      colorClass: "text-green-500",
    },
    {
      title: "Average Rating",
      value: avgRating.toFixed(1),
      icon: <TrendingUp />,
      colorClass: "text-purple-500",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: <ShoppingCart />,
      colorClass: "text-orange-500",
    },
  ];
};

const getCategoryAnalysis = (data: any) => {
  const analysis = data.productData.reduce((acc: any, curr: any) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {
        category: curr.category,
        count: 0,
        totalAmount: 0,
        totalRating: 0,
      };
    }
    acc[curr.category].count += 1;
    acc[curr.category].totalAmount +=
      parseFloat(curr.average_purchase_amount) || 0;
    acc[curr.category].totalRating +=
      parseFloat(curr.average_review_rating) || 0;
    return acc;
  }, {});

  return Object.entries(analysis).map(([category, data]: [string, any]) => ({
    category,
    count: data.count,
    avgAmount: (data.totalAmount / data.count).toFixed(2),
    avgRating: (data.totalRating / data.count).toFixed(1),
  }));
};

const getGeographicalDistribution = (customers: any[]) => {
  const distribution = customers.reduce((acc: any, curr: any) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribution)
    .map(([state, count]) => ({
      state,
      customers: count,
    }))
    .sort((a: any, b: any) => b.customers - a.customers)
    .slice(0, 10);
};

const getColorPreferences = (customers: any[]) => {
  const preferences = customers.reduce((acc: any, curr: any) => {
    acc[curr.preferred_color] = (acc[curr.preferred_color] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(preferences)
    .map(([color, count]) => ({
      color,
      count,
    }))
    .sort((a: any, b: any) => b.count - a.count);
};

const getSizeDistribution = (customers: any[]) => {
  const sizes = customers.reduce((acc: any, curr: any) => {
    acc[curr.preferred_size] = (acc[curr.preferred_size] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(sizes).map(([name, value]) => ({
    name,
    value,
  }));
};

const getPaymentMethodDistribution = (customers: any[]) => {
  const methods = customers.reduce((acc: any, curr: any) => {
    acc[curr.preferred_payment_method] =
      (acc[curr.preferred_payment_method] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(methods).map(([name, value]) => ({
    name,
    value,
  }));
};

const getDemographics = (customers: any[]) => {
  const ages = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "55+": 0,
  };

  customers.forEach((customer) => {
    const age = customer.age;
    if (age <= 25) ages["18-25"]++;
    else if (age <= 35) ages["26-35"]++;
    else if (age <= 45) ages["36-45"]++;
    else if (age <= 55) ages["46-55"]++;
    else ages["55+"]++;
  });

  return Object.entries(ages).map(([range, count]) => ({
    range,
    count,
  }));
};

const getShippingPreferences = (customers: any[]) => {
  const preferences = customers.reduce((acc: any, curr: any) => {
    acc[curr.preferred_shipping] = (acc[curr.preferred_shipping] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(preferences).map(([name, value]) => ({
    name,
    value,
  }));
};

const getGenderDistribution = (customers: any[]) => {
  const distribution = customers.reduce((acc: any, curr: any) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));
};

const CostAnalytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredData = () => {
    if (!data) return null;

    if (selectedCluster === "all") {
      return {
        customerData: [
          ...data.clusters.cluster0,
          ...data.clusters.cluster1,
          ...data.clusters.cluster2,
          ...data.clusters.cluster3,
          ...data.clusters.cluster4,
        ],
        productData: data.productData,
        transactionData: data.transactionData,
      };
    }

    return {
      customerData: data.clusters[selectedCluster],
      productData: data.productData,
      transactionData: data.transactionData,
    };
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No data available
      </div>
    );

  const filteredData = getFilteredData();
  if (!filteredData) return null;

  return (
    <div className="space-y-6 p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Analytics Dashboard</h1>
        <div className="w-[200px]">
          <Select value={selectedCluster} onValueChange={setSelectedCluster}>
            <SelectTrigger>
              <SelectValue placeholder="Select Cluster" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Audience</SelectItem>
              <SelectItem value="cluster1">Audience Group 1</SelectItem>
              <SelectItem value="cluster2">Audience Group 2</SelectItem>
              <SelectItem value="cluster3">Audience Group 3</SelectItem>
              <SelectItem value="cluster4">Audience Group 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {getMetrics(filteredData).map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={metric.colorClass}>{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
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
              <BarChart data={getCategoryAnalysis(filteredData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  fill="#8884d8"
                  name="Number of Items"
                />
                <Bar
                  yAxisId="right"
                  dataKey="avgAmount"
                  fill="#82ca9d"
                  name="Average Amount ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Geographical Distribution and Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographical Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <BarChart
                  data={getGeographicalDistribution(filteredData.customerData)}
                >
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

        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <BarChart data={getDemographics(filteredData.customerData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    name="Number of Customers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color and Size Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <BarChart data={getColorPreferences(filteredData.customerData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="color" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    name="Number of Customers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Size Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={getSizeDistribution(filteredData.customerData)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getSizeDistribution(filteredData.customerData).map(
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

      {/* Payment and Shipping Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={getPaymentMethodDistribution(
                      filteredData.customerData
                    )}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getPaymentMethodDistribution(
                      filteredData.customerData
                    ).map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Shipping Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={getShippingPreferences(filteredData.customerData)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {getShippingPreferences(filteredData.customerData).map(
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
                  data={getGenderDistribution(filteredData.customerData)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {getGenderDistribution(filteredData.customerData).map(
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Most Popular Payment Method</p>
                <p className="text-sm text-gray-600">
                  {
                    Object.entries(
                      filteredData.customerData.reduce(
                        (acc: any, curr: any) => {
                          acc[curr.preferred_payment_method] =
                            (acc[curr.preferred_payment_method] || 0) + 1;
                          return acc;
                        },
                        {}
                      )
                    ).sort(([, a]: any, [, b]: any) => b - a)[0][0]
                  }
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Preferred Shipping Method</p>
                <p className="text-sm text-gray-600">
                  {
                    Object.entries(
                      filteredData.customerData.reduce(
                        (acc: any, curr: any) => {
                          acc[curr.preferred_shipping] =
                            (acc[curr.preferred_shipping] || 0) + 1;
                          return acc;
                        },
                        {}
                      )
                    ).sort(([, a]: any, [, b]: any) => b - a)[0][0]
                  }
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Most Common Size</p>
                <p className="text-sm text-gray-600">
                  {
                    Object.entries(
                      filteredData.customerData.reduce(
                        (acc: any, curr: any) => {
                          acc[curr.preferred_size] =
                            (acc[curr.preferred_size] || 0) + 1;
                          return acc;
                        },
                        {}
                      )
                    ).sort(([, a]: any, [, b]: any) => b - a)[0][0]
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Base Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Total Customers</p>
                <p className="text-sm text-gray-600">
                  {filteredData.customerData.length}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Average Age</p>
                <p className="text-sm text-gray-600">
                  {(
                    filteredData.customerData.reduce(
                      (acc: number, curr: any) => acc + curr.age,
                      0
                    ) / filteredData.customerData.length
                  ).toFixed(1)}{" "}
                  years
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Subscription Rate</p>
                <p className="text-sm text-gray-600">
                  {(
                    (filteredData.customerData.filter(
                      (c: any) => c.is_subscriber
                    ).length /
                      filteredData.customerData.length) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalytics;
