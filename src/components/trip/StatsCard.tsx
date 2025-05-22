
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
  return <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-blue-700 to-blue-900 shadow-md font-futura">
      <div className="text-sm font-light tracking-wide text-white/90 mb-2 p-2 rounded bg-amber-500">{title}</div>
      <div className="text-2xl font-light tracking-wider text-white my-2">{value}</div>
      {footer && <div className="mt-2 bg-blue-800/30 p-2 rounded-sm text-white/90">{footer}</div>}
    </Card>;
};
