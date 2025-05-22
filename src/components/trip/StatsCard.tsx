
import React from "react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  footer?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  footer
}) => {
  return (
    <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 shadow-md">
      <div className="text-sm font-medium text-white/90 mb-2 bg-blue-700/50 p-2 rounded">{title}</div>
      <div className="text-2xl font-bold text-white my-2">{value}</div>
      {footer && (
        <div className="mt-2 bg-blue-700/30 p-2 rounded-sm text-white/90">{footer}</div>
      )}
    </Card>
  );
};
