import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricCardProps } from "@/types/analytics";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  colorClass,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center">
          <div className={`h-8 w-8 mr-2 ${colorClass}`}>{icon}</div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
