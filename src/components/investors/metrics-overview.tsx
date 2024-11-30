import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Target, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  trendColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon,
  trendColor,
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-sm ${trendColor}`}>{trend}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const MetricsOverview: React.FC = () => {
  const metrics = [
    {
      title: "ARR",
      value: "$2.4M",
      trend: "+45% vs last year",
      icon: <DollarSign size={24} />,
      trendColor: "text-green-500",
    },
    {
      title: "Total Customers",
      value: "245",
      trend: "+12% MoM",
      icon: <Users size={24} />,
      trendColor: "text-green-500",
    },
    {
      title: "Gross Margin",
      value: "75%",
      trend: "+5% vs last quarter",
      icon: <Target size={24} />,
      trendColor: "text-green-500",
    },
    {
      title: "CAC Payback",
      value: "8 months",
      trend: "-2 months vs target",
      icon: <TrendingUp size={24} />,
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsOverview;
