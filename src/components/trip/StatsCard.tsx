
import React from "react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  footer?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, footer }) => {
  return (
    <Card className="p-4 flex flex-col justify-between">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {footer && <div className="mt-2">{footer}</div>}
    </Card>
  );
};
