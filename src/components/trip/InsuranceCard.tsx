
import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, Phone, Calendar } from "lucide-react";

interface InsuranceCardProps {
  name: string;
  policyNumbers: string;
  planName: string;
  travelDates: string;
  emergencyUSA: string;
  emergencyIntl: string;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({
  name,
  policyNumbers,
  planName,
  travelDates,
  emergencyUSA,
  emergencyIntl
}) => {
  return (
    <Card className="p-4 flex flex-col justify-between bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
      <div className="flex items-center justify-between">
        <div className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">
          <Shield className="inline-block mr-1 h-4 w-4" />
          {planName}
        </div>
        <div className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">
          <Calendar className="inline-block mr-1 h-4 w-4" />
          {travelDates}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-xl font-light tracking-wider text-white">{name}</div>
        <div className="text-sm text-white/80 mt-1 font-light">Policy: {policyNumbers}</div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center p-2 rounded-sm bg-white/10 backdrop-blur-sm">
          <Phone className="h-4 w-4 mr-2 text-white/90" />
          <div>
            <div className="text-white/90 text-sm">USA: {emergencyUSA}</div>
            <div className="text-white/90 text-sm">Int'l: {emergencyIntl}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
