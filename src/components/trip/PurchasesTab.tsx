
import React from "react";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TripDay } from "@/data/tripData";
import { Purchase } from "@/components/PurchaseTracker";
import { formatCurrency } from "./CurrencyFormatter";

interface PurchasesTabProps {
  purchasesByDay: Record<string, Purchase[]>;
  tripDays: TripDay[];
}

export const PurchasesTab: React.FC<PurchasesTabProps> = ({ purchasesByDay, tripDays }) => {
  return (
    <TabsContent value="purchases">
      {Object.values(purchasesByDay).some(purchases => purchases.length > 0) ? (
        <div className="space-y-4">
          {Object.entries(purchasesByDay).map(([dayId, purchases]) => {
            if (purchases.length === 0) return null;
            const dayNumber = parseInt(dayId.split('-')[1]);
            const day = tripDays.find(d => d.dayNumber === dayNumber);
            
            return (
              <Card key={dayId} className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Day {dayNumber}: {day?.city}
                </h3>
                <div className="space-y-2">
                  {purchases.map((purchase, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{purchase.item}</span>
                        {purchase.forCustoms && (
                          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                            Customs
                          </span>
                        )}
                      </div>
                      <div className="font-medium">
                        {formatCurrency(purchase.price, purchase.currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No purchases recorded yet.</p>
        </Card>
      )}
    </TabsContent>
  );
};
