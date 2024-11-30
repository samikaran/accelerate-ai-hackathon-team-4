import React from "react";
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
} from "recharts";

interface CustomerData {
  month: string;
  enterprise: number;
  midMarket: number;
  smallBusiness: number;
}

const CustomerSegments: React.FC = () => {
  const customerData: CustomerData[] = [
    { month: "Jan", enterprise: 20, midMarket: 45, smallBusiness: 80 },
    { month: "Feb", enterprise: 25, midMarket: 50, smallBusiness: 90 },
    { month: "Mar", enterprise: 30, midMarket: 55, smallBusiness: 100 },
    { month: "Apr", enterprise: 35, midMarket: 60, smallBusiness: 110 },
    { month: "May", enterprise: 40, midMarket: 65, smallBusiness: 120 },
    { month: "Jun", enterprise: 45, midMarket: 70, smallBusiness: 130 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segment Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="enterprise"
                fill="#2196F3"
                name="Enterprise"
                stackId="a"
              />
              <Bar
                dataKey="midMarket"
                fill="#4CAF50"
                name="Mid-Market"
                stackId="a"
              />
              <Bar
                dataKey="smallBusiness"
                fill="#FFC107"
                name="Small Business"
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegments;
