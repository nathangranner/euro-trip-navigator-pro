
import React from "react";
import { Card } from "@/components/ui/card";
import { InsuranceCard } from "@/components/trip/InsuranceCard";
import { travelInsurance, emergencyCard } from "@/data/insuranceData";

export const InsuranceInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light text-white tracking-wider mb-4">Travel Insurance</h2>
      
      <InsuranceCard 
        name={emergencyCard.name}
        policyNumbers={emergencyCard.policyNumbers}
        planName={emergencyCard.planName}
        travelDates={emergencyCard.travelDates}
        emergencyUSA={emergencyCard.emergencyUSA}
        emergencyIntl={emergencyCard.emergencyIntl}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Provider Info */}
        <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
          <h3 className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">Provider Details</h3>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Provider:</span>
              <span className="text-white text-sm">{travelInsurance.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Effective:</span>
              <span className="text-white text-sm">{travelInsurance.effectiveDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Travel Period:</span>
              <span className="text-white text-sm">{travelInsurance.travelDates.departure} to {travelInsurance.travelDates.return}</span>
            </div>
          </div>
        </Card>
        
        {/* Payment Info */}
        <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
          <h3 className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">Payment Details</h3>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Transaction:</span>
              <span className="text-white text-sm">{travelInsurance.payment.transactionNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Confirmation:</span>
              <span className="text-white text-sm">{travelInsurance.payment.confirmationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Total Paid:</span>
              <span className="text-white text-sm">{travelInsurance.payment.totalPaid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Date:</span>
              <span className="text-white text-sm">{travelInsurance.payment.paymentDate}</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Coverage */}
      <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
        <h3 className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">Coverage (Maximum Benefits)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mt-3">
          {Object.entries(travelInsurance.coverage).map(([key, value]) => (
            <div className="flex justify-between" key={key}>
              <span className="text-white/80 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
              <span className="text-white text-sm">{value}</span>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Notes and Claims */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Important Notes */}
        <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
          <h3 className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">Important Notes</h3>
          <ul className="list-disc pl-4 mt-3 space-y-1">
            {travelInsurance.notes.map((note, index) => (
              <li key={index} className="text-white text-sm">{note}</li>
            ))}
          </ul>
        </Card>
        
        {/* Claims */}
        <Card className="p-4 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-lg border border-blue-300/20 font-futura">
          <h3 className="text-sm font-light tracking-wide text-white/90 p-2 rounded backdrop-blur-sm bg-white/10">Claims Information</h3>
          <div className="space-y-2 mt-3">
            <div>
              <span className="text-white/80 text-sm block">Phone:</span>
              <span className="text-white text-sm">{travelInsurance.claims.phone}</span>
            </div>
            <div>
              <span className="text-white/80 text-sm block">Address:</span>
              <span className="text-white text-sm">{travelInsurance.claims.address}</span>
            </div>
            <div>
              <span className="text-white/80 text-sm block">Time Limit:</span>
              <span className="text-white text-sm">{travelInsurance.claims.timeLimit}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
