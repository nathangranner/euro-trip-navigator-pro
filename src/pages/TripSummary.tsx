
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer as Chart,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { europeTrip, TripDay } from "@/data/tripData";
import { Expense } from "@/components/ExpenseTracker";
import { Purchase } from "@/components/PurchaseTracker";
import { loadStoredData } from "@/utils/storageUtils";
import { MessageCircle, Map, MapPin, Calendar, Compass } from "lucide-react";

// Helper function to format currency
const formatCurrency = (amount: number, currency: string) => {
  const symbol = 
    currency === 'EUR' ? '€' : 
    currency === 'USD' ? '$' : 
    currency === 'GBP' ? '£' : 
    'CHF ';
  
  return `${symbol}${amount.toFixed(2)}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const TripSummary: React.FC = () => {
  const navigate = useNavigate();
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [expensesByDay, setExpensesByDay] = useState<Record<string, Expense[]>>({});
  const [purchasesByDay, setPurchasesByDay] = useState<Record<string, Purchase[]>>({});
  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const storedData = loadStoredData();
    
    if (storedData.tripDays && storedData.tripDays.length > 0) {
      setTripDays(storedData.tripDays);
    } else {
      setTripDays(europeTrip.days);
    }
    
    if (storedData.expenses) {
      setExpensesByDay(storedData.expenses);
    }
    
    if (storedData.purchases) {
      setPurchasesByDay(storedData.purchases);
    }
  }, []);

  // Calculate total expenses by currency
  const calculateTotalExpensesByCurrency = () => {
    const totals: Record<string, number> = {
      EUR: 0,
      USD: 0,
      GBP: 0,
      CHF: 0,
    };

    Object.values(expensesByDay).forEach(dayExpenses => {
      dayExpenses.forEach(expense => {
        totals[expense.currency] = (totals[expense.currency] || 0) + expense.amount;
      });
    });

    return totals;
  };

  // Calculate total purchases for customs by currency
  const calculateTotalPurchasesByCurrency = () => {
    const totals: Record<string, number> = {
      EUR: 0,
      USD: 0,
      GBP: 0,
      CHF: 0,
    };

    Object.values(purchasesByDay).forEach(dayPurchases => {
      dayPurchases.filter(p => p.forCustoms).forEach(purchase => {
        totals[purchase.currency] = (totals[purchase.currency] || 0) + purchase.price;
      });
    });

    return totals;
  };

  // Calculate expenses by category
  const calculateExpensesByCategory = () => {
    const categories: Record<string, number> = {};

    Object.values(expensesByDay).forEach(dayExpenses => {
      dayExpenses.forEach(expense => {
        if (!categories[expense.category]) {
          categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
      });
    });

    return categories;
  };
  
  // Calculate completion statistics
  const calculateCompletionStats = () => {
    let completed = 0;
    let total = 0;
    
    tripDays.forEach(day => {
      if (day.activities) { // Add this check to ensure activities exists
        day.activities.forEach(activity => {
          total++;
          if (activity.completed) {
            completed++;
          }
        });
      }
    });
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };
  
  const totalExpenses = calculateTotalExpensesByCurrency();
  const totalPurchases = calculateTotalPurchasesByCurrency();
  const expensesByCategory = calculateExpensesByCategory();
  const completionStats = calculateCompletionStats();

  // Prepare expense chart data
  const expenseChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  // Chart configuration for categories
  const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
  
  const chartConfig = expenseChartData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
    return acc;
  }, {});

  // Group trip days by city
  const getCitiesList = () => {
    const cities: Record<string, TripDay[]> = {};
    tripDays.forEach(day => {
      const cityName = day.city.split(',')[0].trim();
      if (!cities[cityName]) {
        cities[cityName] = [];
      }
      cities[cityName].push(day);
    });
    return cities;
  };

  const cities = getCitiesList();
  
  // Handle view accommodation on map
  const handleViewMap = (day: TripDay) => {
    if (day.accommodation && day.accommodation.address) {
      // Open Google Maps with the address
      const address = encodeURIComponent(day.accommodation.address);
      window.open(`https://www.google.com/maps?q=${address}`, '_blank');
    }
  };

  // Navigate to dashboard for location editing
  const handleEditLocation = (dayIndex: number) => {
    navigate(`/planner?day=${dayIndex}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trip Summary</h1>
        <div className="flex space-x-2">
          <Button onClick={() => navigate("/planner")} className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Trip Planner
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-gray-500">Trip Duration</div>
          <div className="text-2xl font-bold">{tripDays.length} Days</div>
          <div className="text-sm text-gray-500 mt-2">
            {formatDate(europeTrip.startDate)} - {formatDate(europeTrip.endDate)}
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-gray-500">Activities Completed</div>
          <div className="text-2xl font-bold">{completionStats.completed} / {completionStats.total}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${completionStats.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">{completionStats.percentage}% Complete</div>
        </Card>
        
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Expenses</div>
          <div className="text-2xl font-bold">
            {totalExpenses.EUR > 0 && <div>€{totalExpenses.EUR.toFixed(2)}</div>}
            {totalExpenses.USD > 0 && <div>${totalExpenses.USD.toFixed(2)}</div>}
            {totalExpenses.GBP > 0 && <div>£{totalExpenses.GBP.toFixed(2)}</div>}
            {totalExpenses.CHF > 0 && <div>CHF {totalExpenses.CHF.toFixed(2)}</div>}
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-sm text-gray-500">Customs Declarations</div>
          <div className="text-2xl font-bold">
            {totalPurchases.EUR > 0 && <div>€{totalPurchases.EUR.toFixed(2)}</div>}
            {totalPurchases.USD > 0 && <div>${totalPurchases.USD.toFixed(2)}</div>}
            {totalPurchases.GBP > 0 && <div>£{totalPurchases.GBP.toFixed(2)}</div>}
            {totalPurchases.CHF > 0 && <div>CHF {totalPurchases.CHF.toFixed(2)}</div>}
          </div>
        </Card>
      </div>

      <Tabs 
        defaultValue="itinerary" 
        className="mb-8"
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="itinerary">Day by Day</TabsTrigger>
          <TabsTrigger value="cityview">City View</TabsTrigger>
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        </TabsList>
        
        {/* Itinerary Tab - Day by Day */}
        <TabsContent value="itinerary" className="space-y-4">
          {tripDays.map((day, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  Day {day.dayNumber}: {day.city}
                </h3>
                <div className="flex space-x-2">
                  {day.accommodation && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewMap(day)}
                      className="flex items-center gap-1"
                    >
                      <Map className="h-4 w-4" />
                      View Map
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/planner?day=${index}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{formatDate(day.date)}</p>
              <p className="mt-2">{day.title}</p>
              
              {/* Only render activities section if day.activities exists */}
              {day.activities && day.activities.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {day.activities.slice(0, 4).map((activity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-lg">{activity.icon}</span>
                      <span className={activity.completed ? "line-through text-gray-500" : ""}>
                        {activity.time}: {activity.activity}
                      </span>
                    </div>
                  ))}
                  {day.activities.length > 4 && (
                    <div className="col-span-2 text-center text-sm text-gray-500 mt-2">
                      + {day.activities.length - 4} more activities
                    </div>
                  )}
                </div>
              )}

              {/* Show accommodation info if available */}
              {day.accommodation && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-red-500 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">{day.accommodation.name}</p>
                      {day.accommodation.address && (
                        <p className="text-sm text-gray-600">{day.accommodation.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* City View Tab */}
        <TabsContent value="cityview">
          {selectedCity ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{selectedCity}</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedCity(null)}
                >
                  Back to All Cities
                </Button>
              </div>
              <div className="space-y-4">
                {cities[selectedCity].map((day, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">
                        Day {day.dayNumber} - {formatDate(day.date)}
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/planner?day=${tripDays.findIndex(d => d.dayNumber === day.dayNumber)}`)}
                      >
                        View Details
                      </Button>
                    </div>
                    <p className="mt-2">{day.title}</p>
                    
                    {day.accommodation && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-red-500 mt-1 mr-2" />
                          <div>
                            <p className="font-medium">{day.accommodation.name}</p>
                            {day.accommodation.address && (
                              <p className="text-sm text-gray-600">{day.accommodation.address}</p>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewMap(day)}
                              className="flex items-center gap-1 mt-1 p-0"
                            >
                              <Map className="h-4 w-4" />
                              View on Map
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(cities).map(([cityName, days]) => (
                <Card 
                  key={cityName} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCity(cityName)}
                >
                  <h3 className="text-xl font-semibold">{cityName}</h3>
                  <p className="text-sm text-gray-500">{days.length} days</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(days[0].date)} - {formatDate(days[days.length - 1].date)}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Accommodations Tab */}
        <TabsContent value="accommodations" className="space-y-6">
          {tripDays
            .filter(day => day.accommodation)
            .map((day, index) => (
              <Card key={index} className="p-6 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {day.accommodation?.image && (
                    <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                      <img 
                        src={day.accommodation.image} 
                        alt={day.accommodation.name} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{day.accommodation?.name}</h3>
                        <p className="text-gray-500">{day.city} - Day {day.dayNumber}</p>
                        <p className="text-gray-500 text-sm">{formatDate(day.date)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLocation(tripDays.findIndex(d => d.dayNumber === day.dayNumber))}
                        >
                          Edit Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewMap(day)}
                          className="flex items-center gap-2"
                        >
                          <Map className="h-4 w-4" />
                          View Map
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-50 rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {day.accommodation?.address && (
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p>{day.accommodation.address}</p>
                          </div>
                        )}
                        {day.accommodation?.contactPhone && (
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p>{day.accommodation.contactPhone}</p>
                          </div>
                        )}
                        {day.accommodation?.confirmationNumber && (
                          <div>
                            <p className="text-sm text-gray-500">Confirmation</p>
                            <p className="font-mono">{day.accommodation.confirmationNumber}</p>
                          </div>
                        )}
                        {day.accommodation?.confirmationCode && (
                          <div>
                            <p className="text-sm text-gray-500">Confirmation Code</p>
                            <p className="font-mono">{day.accommodation.confirmationCode}</p>
                          </div>
                        )}
                        {day.accommodation?.checkin && (
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p>{day.accommodation.checkin}</p>
                          </div>
                        )}
                        {day.accommodation?.checkout && (
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p>{day.accommodation.checkout}</p>
                          </div>
                        )}
                        {day.accommodation?.wifi && (
                          <div>
                            <p className="text-sm text-gray-500">WiFi</p>
                            <p>{day.accommodation.wifi}</p>
                          </div>
                        )}
                        {day.accommodation?.parking && (
                          <div>
                            <p className="text-sm text-gray-500">Parking</p>
                            <p>{day.accommodation.parking}</p>
                          </div>
                        )}
                        {day.accommodation?.totalPrice && (
                          <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-green-600 font-medium">{day.accommodation.totalPrice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          {!tripDays.some(day => day.accommodation) && (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No accommodation information recorded yet.</p>
              <Button 
                onClick={() => navigate("/planner")} 
                className="mt-4"
              >
                Add Accommodation Details
              </Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="expenses">
          {expenseChartData.length > 0 ? (
            <div>
              <Card className="p-4 mb-4">
                <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
                <div className="h-80">
                  <Chart config={chartConfig}>
                    <PieChart>
                      <Pie
                        data={expenseChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => entry.name}
                      >
                        {expenseChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                      />
                    </PieChart>
                  </Chart>
                </div>
              </Card>
              
              <div className="space-y-4">
                {Object.entries(expensesByDay).map(([dayId, expenses]) => {
                  if (expenses.length === 0) return null;
                  const dayNumber = parseInt(dayId.split('-')[1]);
                  const day = tripDays.find(d => d.dayNumber === dayNumber);
                  
                  return (
                    <Card key={dayId} className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Day {dayNumber}: {day?.city}
                      </h3>
                      <div className="space-y-2">
                        {expenses.map((expense, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{expense.description}</span>
                              <span className="text-gray-500 text-sm ml-2">({expense.category})</span>
                            </div>
                            <div className="font-medium">
                              {formatCurrency(expense.amount, expense.currency)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">No expenses recorded yet.</p>
            </Card>
          )}
        </TabsContent>
        
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
      </Tabs>
      
      {/* Travel Buddy Section - replaced with link to dedicated page */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" /> AI Travel Buddy
          </h2>
          <Button 
            variant="outline"
            onClick={() => navigate("/travel-buddy")}
            className="flex items-center gap-2"
          >
            Visit Travel Buddy
          </Button>
        </div>
        
        <Card className="p-6">
          <p className="text-gray-600 mb-4">
            Your AI travel companion can help with recommendations, language assistance, 
            and trip adaptations during your European adventure.
          </p>
          <Button onClick={() => navigate("/travel-buddy")}>
            Explore Travel Buddy Features
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TripSummary;
