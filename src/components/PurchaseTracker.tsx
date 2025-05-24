
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Save, Map } from "lucide-react";
import { toast } from "sonner";

export type Purchase = {
  id: string;
  item: string;
  price: number;
  currency: string;
  country: string;
  forCustoms: boolean;
  date: string;
};

interface PurchaseTrackerProps {
  dayId: string;
  date: string;
  countryName: string;
  initialPurchases?: Purchase[];
  onSave: (purchases: Purchase[]) => void;
}

export const PurchaseTracker: React.FC<PurchaseTrackerProps> = ({ 
  dayId, 
  date, 
  countryName,
  initialPurchases = [],
  onSave 
}) => {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [newPurchase, setNewPurchase] = useState<Omit<Purchase, "id">>({
    item: "",
    price: 0,
    currency: "EUR",
    country: countryName,
    forCustoms: true,
    date: date,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPurchase = () => {
    if (newPurchase.price <= 0 || !newPurchase.item) {
      toast.error("Please enter an item name and price");
      return;
    }

    const purchase: Purchase = {
      ...newPurchase,
      id: `purchase-${dayId}-${Date.now()}`,
    };

    const updatedPurchases = [...purchases, purchase];
    setPurchases(updatedPurchases);
    onSave(updatedPurchases);
    
    // Reset form
    setNewPurchase({
      item: "",
      price: 0,
      currency: "EUR",
      country: countryName,
      forCustoms: true,
      date: date,
    });
    
    setShowAddForm(false);
    toast.success("Purchase added successfully");
  };

  const handleDeletePurchase = (id: string) => {
    const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
    setPurchases(updatedPurchases);
    onSave(updatedPurchases);
    toast.success("Purchase deleted");
  };

  // Calculate customs total (sum of all purchases marked for customs)
  const calculateCustomsTotal = () => {
    const customsItems = purchases.filter(purchase => purchase.forCustoms);
    const eurTotal = customsItems.filter(item => item.currency === "EUR").reduce((total, item) => total + item.price, 0);
    const usdTotal = customsItems.filter(item => item.currency === "USD").reduce((total, item) => total + item.price, 0);
    const gbpTotal = customsItems.filter(item => item.currency === "GBP").reduce((total, item) => total + item.price, 0);
    const chfTotal = customsItems.filter(item => item.currency === "CHF").reduce((total, item) => total + item.price, 0);
    
    return { eurTotal, usdTotal, gbpTotal, chfTotal };
  };

  const currencyOptions = [
    { value: "EUR", label: "€ (EUR)" },
    { value: "USD", label: "$ (USD)" },
    { value: "GBP", label: "£ (GBP)" },
    { value: "CHF", label: "CHF" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center">
          <Map className="h-5 w-5 mr-2" /> Purchases for Customs
        </h3>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          variant={showAddForm ? "outline" : "default"}
        >
          {showAddForm ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          {showAddForm ? "Cancel" : "Add Purchase"}
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item">Item Description</Label>
              <Input
                id="item"
                value={newPurchase.item}
                onChange={(e) => setNewPurchase({ ...newPurchase, item: e.target.value })}
                placeholder="e.g. Leather jacket"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newPurchase.price === 0 ? "" : newPurchase.price}
                  onChange={(e) => setNewPurchase({ ...newPurchase, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseCurrency">Currency</Label>
                <Select
                  value={newPurchase.currency}
                  onValueChange={(value) => setNewPurchase({ ...newPurchase, currency: value })}
                >
                  <SelectTrigger id="purchaseCurrency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country of Purchase</Label>
              <Input
                id="country"
                value={newPurchase.country}
                onChange={(e) => setNewPurchase({ ...newPurchase, country: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="forCustoms"
                checked={newPurchase.forCustoms}
                onChange={(e) => setNewPurchase({ ...newPurchase, forCustoms: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
              <Label htmlFor="forCustoms" className="text-sm font-normal">
                Count for customs declaration
              </Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={handleAddPurchase} className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Purchase
              </Button>
            </div>
          </div>
        </Card>
      )}

      {purchases.length > 0 ? (
        <>
          <div className="space-y-4">
            <div className="grid gap-2">
              {purchases.map((purchase) => (
                <Card key={purchase.id} className="p-3 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-medium">{purchase.item}</div>
                    <div className="text-sm text-muted-foreground">
                      {purchase.country} • {purchase.forCustoms ? "For customs" : "Not for customs"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">
                      {purchase.currency === "EUR" && "€"}
                      {purchase.currency === "USD" && "$"}
                      {purchase.currency === "GBP" && "£"}
                      {purchase.currency === "CHF" && "CHF "}
                      {purchase.price.toFixed(2)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDeletePurchase(purchase.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="font-semibold">Customs Totals:</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {Object.entries(calculateCustomsTotal()).map(([key, value]) => {
                if (value > 0) {
                  const currencySymbol = key === "eurTotal" ? "€" : key === "usdTotal" ? "$" : key === "gbpTotal" ? "£" : "CHF ";
                  const currencyName = key === "eurTotal" ? "EUR" : key === "usdTotal" ? "USD" : key === "gbpTotal" ? "GBP" : "CHF";
                  return (
                    <div key={key} className="flex justify-between">
                      <span>{currencyName}:</span>
                      <span className="font-medium">{currencySymbol}{value.toFixed(2)}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          <p>No purchases recorded for customs.</p>
          <Button className="mt-2" size="sm" onClick={() => setShowAddForm(true)}>Add your first item</Button>
        </Card>
      )}
    </div>
  );
};
