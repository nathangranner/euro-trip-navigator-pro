
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, X, Car, Clock, MapPin, Calendar, Edit, Euro, Map, Save, Upload, Download, Printer, FileText, MessageCircle } from 'lucide-react';
import { europeTrip, TripDay, Activity } from '@/data/tripData';
import { EditDayModal } from './EditDayModal';
import { ExpenseTracker, Expense } from './ExpenseTracker';
import { PurchaseTracker, Purchase } from './PurchaseTracker';
import { EditActivityModal } from './EditActivityModal';
import { TravelBuddySelector } from './TravelBuddySelector';
import { loadStoredData, saveTripDays, saveExpensesForDay, savePurchasesForDay, loadExpenses, loadPurchases, exportTripData, importTripData } from '@/utils/storageUtils';

export const EuropeTripPlanner: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [editDayModalOpen, setEditDayModalOpen] = useState(false);
  const [showExpenseSection, setShowExpenseSection] = useState(false);
  const [showPurchaseSection, setShowPurchaseSection] = useState(false);
  const [editActivityModalOpen, setEditActivityModalOpen] = useState(false);
  const [currentEditActivity, setCurrentEditActivity] = useState<Activity | null>(null);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');
  const [newActivity, setNewActivity] = useState({
    time: '',
    activity: '',
    type: 'activity',
    icon: '📌',
    note: ''
  });
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [expensesByDay, setExpensesByDay] = useState<Record<string, Expense[]>>({});
  const [purchasesByDay, setPurchasesByDay] = useState<Record<string, Purchase[]>>({});

  // Load data on component mount
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

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Main functions
  const currentDayData = tripDays[currentDay];
  const dayId = currentDayData ? `day-${currentDayData.dayNumber}` : '';
  const currentDayExpenses = expensesByDay[dayId] || [];
  const currentDayPurchases = purchasesByDay[dayId] || [];

  // Fix the navigation functions to prevent skipping days
  const nextDay = () => {
    if (currentDay < tripDays.length - 1) {
      const nextDayIndex = currentDay + 1;
      setCurrentDay(nextDayIndex);
      setExpandedActivity(null);
      toast.info(`Switched to ${tripDays[nextDayIndex].city} - ${tripDays[nextDayIndex].title}`);
    }
  };
  const prevDay = () => {
    if (currentDay > 0) {
      const prevDayIndex = currentDay - 1;
      setCurrentDay(prevDayIndex);
      setExpandedActivity(null);
      toast.info(`Switched to ${tripDays[prevDayIndex].city} - ${tripDays[prevDayIndex].title}`);
    }
  };

  // Add a function to go directly to a specific day
  const goToDay = (dayIndex: number) => {
    if (dayIndex >= 0 && dayIndex < tripDays.length) {
      setCurrentDay(dayIndex);
      setExpandedActivity(null);
      toast.info(`Switched to ${tripDays[dayIndex].city} - ${tripDays[dayIndex].title}`);
    }
  };
  const toggleActivity = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index);
  };
  const handleEditActivity = (activity: Activity) => {
    setCurrentEditActivity(activity);
    setEditActivityModalOpen(true);
  };
  const handleUpdateActivity = (updatedActivity: Activity) => {
    const updatedActivities = currentDayData.activities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity);
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = {
      ...currentDayData,
      activities: updatedActivities
    };
    setTripDays(updatedTripDays);
    saveTripDays(updatedTripDays);
    toast.success(`Updated: ${updatedActivity.activity}`);
  };
  const handleActivityToggle = (id: string) => {
    const updatedActivities = currentDayData.activities.map(activity => {
      if (activity.id === id) {
        const completed = !activity.completed;
        // Show toast notification when activity is completed/uncompleted
        if (completed) {
          toast.success(`Completed: ${activity.activity}`);
        } else {
          toast.info(`Unmarked: ${activity.activity}`);
        }
        return {
          ...activity,
          completed
        };
      }
      return activity;
    });
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = {
      ...currentDayData,
      activities: updatedActivities
    };
    setTripDays(updatedTripDays);
    saveTripDays(updatedTripDays);
  };
  const handleAddActivity = () => {
    if (!newActivity.activity || !newActivity.time) {
      toast.error('Please provide both time and activity name');
      return;
    }

    // Create a new activity object
    const activity = {
      id: `${currentDay}-${Date.now()}`,
      ...newActivity,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      completed: false
    } as Activity;

    // Update the current day's activities
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = {
      ...currentDayData,
      activities: [...currentDayData.activities, activity]
    };

    // Update state
    setTripDays(updatedTripDays);
    saveTripDays(updatedTripDays);
    toast.success(`Added: ${newActivity.activity}`);

    // Reset form
    setNewActivity({
      time: '',
      activity: '',
      type: 'activity',
      icon: '📌',
      note: ''
    });
    setShowAddActivity(false);
  };
  const handleSaveExpenses = (expenses: Expense[]) => {
    setExpensesByDay(prev => ({
      ...prev,
      [dayId]: expenses
    }));
    saveExpensesForDay(dayId, expenses);
  };
  const handleSavePurchases = (purchases: Purchase[]) => {
    setPurchasesByDay(prev => ({
      ...prev,
      [dayId]: purchases
    }));
    savePurchasesForDay(dayId, purchases);
  };
  const handleUpdateDay = (updatedDay: TripDay) => {
    const updatedTripDays = [...tripDays];
    updatedTripDays[currentDay] = updatedDay;
    setTripDays(updatedTripDays);
    saveTripDays(updatedTripDays);
    toast.success(`Updated day information for ${updatedDay.city}`);
  };
  const handleExport = () => {
    const data = exportTripData();
    setExportData(data);
    toast.success("Data prepared for export");
  };
  const handleImport = () => {
    if (!importData.trim()) {
      toast.error("Please paste in export data");
      return;
    }
    try {
      const success = importTripData(importData);
      if (success) {
        // Reload data after import
        const storedData = loadStoredData();
        if (storedData.tripDays) {
          setTripDays(storedData.tripDays);
        }
        if (storedData.expenses) {
          setExpensesByDay(storedData.expenses);
        }
        if (storedData.purchases) {
          setPurchasesByDay(storedData.purchases);
        }
        toast.success("Data imported successfully");
        setImportExportOpen(false);
      } else {
        toast.error("Failed to import data");
      }
    } catch (error) {
      toast.error("Invalid import data format");
    }
  };
  const handlePrintView = () => {
    // Open a new window with just the purchases data formatted for customs
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups for this site.");
      return;
    }

    // Combine all purchases for customs
    const allPurchases: Purchase[] = [];
    Object.values(purchasesByDay).forEach(dayPurchases => {
      allPurchases.push(...dayPurchases.filter(p => p.forCustoms));
    });

    // Group by country
    const purchasesByCountry: Record<string, Purchase[]> = {};
    allPurchases.forEach(purchase => {
      if (!purchasesByCountry[purchase.country]) {
        purchasesByCountry[purchase.country] = [];
      }
      purchasesByCountry[purchase.country].push(purchase);
    });

    // Calculate totals by currency
    const calculateTotal = (purchases: Purchase[], currency: string): number => {
      return purchases.filter(p => p.currency === currency).reduce((total, p) => total + p.price, 0);
    };

    // Format the content
    let content = `
      <html>
        <head>
          <title>Customs Declaration - Purchases</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { text-align: center; margin-bottom: 30px; }
            .country { margin-top: 30px; }
            .country-name { font-size: 24px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            .totals { margin-top: 30px; font-weight: bold; }
            .grand-total { font-size: 18px; margin-top: 40px; border-top: 2px solid #333; padding-top: 10px; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Customs Declaration - Purchases</h1>
          <p>Trip Period: ${formatDate(europeTrip.startDate)} to ${formatDate(europeTrip.endDate)}</p>
          <button onclick="window.print();" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; margin: 20px 0;">Print this page</button>
    `;

    // Add each country's purchases
    Object.entries(purchasesByCountry).forEach(([country, purchases]) => {
      content += `
        <div class="country">
          <div class="country-name">${country}</div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Currency</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
      `;
      purchases.forEach(purchase => {
        const purchaseDate = purchase.date ? formatDate(purchase.date) : 'N/A';
        const currencySymbol = purchase.currency === 'EUR' ? '€' : purchase.currency === 'USD' ? '$' : purchase.currency === 'GBP' ? '£' : 'CHF ';
        content += `
          <tr>
            <td>${purchase.item}</td>
            <td>${currencySymbol}${purchase.price.toFixed(2)}</td>
            <td>${purchase.currency}</td>
            <td>${purchaseDate}</td>
          </tr>
        `;
      });

      // Country totals by currency
      content += `
            </tbody>
          </table>
          <div class="totals">
      `;
      ['EUR', 'USD', 'GBP', 'CHF'].forEach(currency => {
        const total = calculateTotal(purchases, currency);
        if (total > 0) {
          const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : 'CHF ';
          content += `<div>${country} Total (${currency}): ${currencySymbol}${total.toFixed(2)}</div>`;
        }
      });
      content += `</div></div>`;
    });

    // Grand totals
    content += `
      <div class="grand-total">
        <div>Grand Totals:</div>
    `;
    ['EUR', 'USD', 'GBP', 'CHF'].forEach(currency => {
      const total = calculateTotal(allPurchases, currency);
      if (total > 0) {
        const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : 'CHF ';
        content += `<div>Total ${currency}: ${currencySymbol}${total.toFixed(2)}</div>`;
      }
    });
    content += `
        </div>
      </body>
    </html>
    `;
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  };

  // Activity type icons
  const getActivityIcon = (type: string) => {
    const icons: {
      [key: string]: string;
    } = {
      activity: '📌',
      meal: '🍽️',
      logistics: '📋',
      travel: '🚗',
      sightseeing: '👁️',
      accommodation: '🏨',
      transport: '🚆',
      entertainment: '🎭',
      photos: '📸',
      shopping: '🛍️',
      rest: '😴',
      audition: '🎭',
      preparation: '🔄',
      arrival: '🏡'
    };
    return icons[type] || '📌';
  };

  // Add a new state for the travel buddy section
  const [showTravelBuddySection, setShowTravelBuddySection] = useState(true);
  
  if (!currentDayData) {
    return <div className="flex justify-center items-center min-h-screen">Loading trip data...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="hero-header bg-gradient-to-br text-white relative overflow-hidden shadow-md" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentDayData.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '250px'
      }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{currentDayData.city}</h1>
              <p className="text-xl opacity-90">{currentDayData.title}</p>
              <p className="text-sm opacity-75">{formatDate(currentDayData.date)}</p>
            </div>
            {currentDayData.weather && (
              <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl">{currentDayData.weather.icon}</div>
                <div className="text-lg font-semibold">{currentDayData.weather.temp}</div>
                <div className="text-sm">{currentDayData.weather.condition}</div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white" onClick={() => setEditDayModalOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Day Info
            </Button>
          </div>
          
          {currentDayData.specialEvent && (
            <div className="mt-4 bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 animate-pulse-gentle">
              <p className="text-lg font-semibold">✨ Special Day! ✨</p>
            </div>
          )}
          
          {currentDayData.encouragement && (
            <div className="mt-4 bg-pink-500/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-lg italic">{currentDayData.encouragement}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar - Modified with day selector */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Button onClick={prevDay} disabled={currentDay === 0} variant={currentDay === 0 ? "outline" : "default"} className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <div className="text-center flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Day {currentDayData.dayNumber} of {tripDays.length}</div>
              <div className="w-32 md:w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{
                  width: `${currentDayData.dayNumber / tripDays.length * 100}%`
                }}></div>
              </div>
              
              {/* Add day selector dropdown */}
              <Select value={currentDay.toString()} onValueChange={value => goToDay(parseInt(value))}>
                <SelectTrigger className="w-[180px] mt-2 h-8 text-xs">
                  <SelectValue placeholder="Jump to day..." />
                </SelectTrigger>
                <SelectContent>
                  {tripDays.map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      Day {day.dayNumber}: {day.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={nextDay} disabled={currentDay === tripDays.length - 1} variant={currentDay === tripDays.length - 1 ? "outline" : "default"} className="flex items-center gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Data Management Bar */}
      <div className="bg-blue-50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-2">
            <Link to="/summary">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> Trip Summary
              </Button>
            </Link>
            <Dialog open={importExportOpen} onOpenChange={setImportExportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Save className="h-4 w-4" /> Export/Import
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Export/Import Trip Data</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Button onClick={handleExport} className="flex items-center gap-2 mb-2">
                      <Download className="h-4 w-4" /> Export Data
                    </Button>
                    {exportData && <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-2">Copy this data and save it somewhere safe:</p>
                        <Textarea value={exportData} rows={5} readOnly onClick={e => (e.target as HTMLTextAreaElement).select()} className="font-mono text-xs" />
                      </div>}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Import Data</h3>
                    <p className="text-sm text-muted-foreground mb-2">Paste previously exported data:</p>
                    <Textarea value={importData} onChange={e => setImportData(e.target.value)} rows={5} className="font-mono text-xs mb-2" placeholder='Paste exported JSON data here...' />
                    <Button onClick={handleImport} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" /> Import Data
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={handlePrintView} className="flex items-center gap-1">
              <Printer className="h-4 w-4" /> Customs Print
            </Button>
          </div>
        </div>
      </div>

      {/* Travel Buddy Section */}
      <div className="container mx-auto px-4 py-4 mb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowTravelBuddySection(!showTravelBuddySection)}>
          <h2 className="text-2xl font-semibold flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" /> AI Travel Buddy
          </h2>
          <Button variant="ghost" size="sm">
            {showTravelBuddySection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showTravelBuddySection && <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <TravelBuddySelector />
          </div>}
      </div>

      {/* Warnings */}
      {currentDayData.warnings && currentDayData.warnings.length > 0 && <div className="container mx-auto px-4 py-4">
          {currentDayData.warnings.map((warning, index) => <div key={index} className={`mb-4 p-4 rounded-lg flex items-center bg-white shadow-md ${warning.type === 'critical' ? 'border-l-4 border-red-500' : warning.type === 'safe' ? 'border-l-4 border-green-500' : 'border-l-4 border-orange-500'}`}>
              {warning.image && <img src={warning.image} alt="Warning" className="w-20 h-16 rounded mr-4 object-cover" />}
              <div className="flex-1">
                <div className={`font-semibold ${warning.type === 'critical' ? 'text-red-600' : warning.type === 'safe' ? 'text-green-600' : 'text-orange-600'}`}>
                  {warning.message}
                </div>
                {warning.fine && <div className="text-sm text-red-500">Fine: {warning.fine}</div>}
                {warning.times && <div className="text-sm text-gray-600">{warning.times}</div>}
              </div>
            </div>)}
        </div>}

      {/* Route Information */}
      {currentDayData.route && <div className="container mx-auto px-4 py-4">
          <Card className="p-4 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold mb-2">🗺️ Today's Route</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-medium">{currentDayData.route.start}</span>
              <span className="text-gray-500">→</span>
              <span className="font-medium">{currentDayData.route.end}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-2">
                {currentDayData.route.distance}
              </span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                {currentDayData.route.duration}
              </span>
            </div>
            {currentDayData.route.stops && currentDayData.route.stops.length > 0 && <div className="mt-2">
                <p className="text-sm text-gray-600">Stops: {currentDayData.route.stops.join(' • ')}</p>
              </div>}
          </Card>
        </div>}
      
      {/* Parking Tips */}
      {currentDayData.parkingTips && currentDayData.parkingTips.length > 0 && <div className="container mx-auto px-4">
          <Card className="p-4 mb-4 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="text-lg font-semibold mb-2">🅿️ Parking Tips</h3>
            <div className="space-y-2">
              {currentDayData.parkingTips.map((tip, index) => <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{tip.name}</span>
                  <span className={`px-2 py-1 rounded text-sm ${tip.price.includes('FREE') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {tip.price}
                  </span>
                </div>)}
            </div>
          </Card>
        </div>}

      {/* Activities */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">📅 Today's Activities</h2>
          <Button onClick={() => setShowAddActivity(!showAddActivity)} className="flex items-center gap-2">
            {showAddActivity ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddActivity ? 'Cancel' : 'Add Activity'}
          </Button>
        </div>

        {/* Add Activity Form */}
        {showAddActivity && <Card className="p-4 mb-6">
            <h3 className="font-semibold mb-3">Add New Activity</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <Input type="time" value={newActivity.time} onChange={e => setNewActivity({
                    ...newActivity,
                    time: e.target.value
                  })} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <Select value={newActivity.type} onValueChange={value => {
                    setNewActivity({
                      ...newActivity,
                      type: value,
                      icon: getActivityIcon(value)
                    });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="meal">Meal</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="sightseeing">Sightseeing</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="rest">Rest</SelectItem>
                      <SelectItem value="preparation">Preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                <Input type="text" value={newActivity.activity} onChange={e => setNewActivity({
                  ...newActivity,
                  activity: e.target.value
                })} placeholder="What are you doing?" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <Textarea value={newActivity.note} onChange={e => setNewActivity({
                  ...newActivity,
                  note: e.target.value
                })} placeholder="Any additional details..." className="w-full" rows={2} />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleAddActivity} className="bg-green-500 hover:bg-green-600">
                  Add Activity
                </Button>
              </div>
            </div>
          </Card>}

        <div className="space-y-4">
          {currentDayData.activities && currentDayData.activities.length > 0 ? currentDayData.activities.sort((a, b) => a.time.localeCompare(b.time)).map((activity, index) => <Card key={activity.id} className={`overflow-hidden transition-all duration-200 ${activity.completed ? 'bg-gray-50' : ''} ${expandedActivity === index ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className="flex items-center p-4">
                    <Checkbox checked={activity.completed} onCheckedChange={() => handleActivityToggle(activity.id)} className="mr-3 h-5 w-5" />
                    
                    <div className="flex flex-1 items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleActivity(index)}>
                      <div className="flex-shrink-0 mr-4">
                        <span className="text-2xl">{activity.icon}</span>
                      </div>
                      
                      <div className="hidden sm:block">
                        {activity.image && <img src={activity.image} alt={activity.activity} className="w-16 h-16 rounded-lg object-cover mr-4" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className={activity.completed ? 'line-through text-gray-500' : ''}>
                            <h3 className="font-semibold text-lg">{activity.activity}</h3>
                            <p className="text-blue-600 font-medium">{activity.time}</p>
                            {activity.duration && <p className="text-sm text-gray-500">⏱️ {activity.duration}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {activity.mustTry && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">MUST TRY!</span>}
                            {activity.booked && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">BOOKED</span>}
                            {activity.importance && <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">{activity.importance}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                          e.stopPropagation();
                          handleEditActivity(activity);
                        }}>
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        
                        <div className="flex-shrink-0">
                          {expandedActivity === index ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                        </div>
                      </div>
                    </div>
                  
                  {expandedActivity === index && <div className="bg-gray-50 p-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {activity.note && <p className="text-gray-700"><strong>📝 Note:</strong> {activity.note}</p>}
                          {activity.tip && <p className="text-blue-700"><strong>💡 Tip:</strong> {activity.tip}</p>}
                          {activity.culturalNote && <p className="text-purple-700"><strong>🎭 Culture:</strong> {activity.culturalNote}</p>}
                          {activity.location && <p className="text-green-700"><strong>📍 Location:</strong> {activity.location}</p>}
                          {activity.contact && <p className="text-blue-700"><strong>📞 Contact:</strong> {activity.contact}</p>}
                          {activity.contactInfo && <p className="text-blue-700"><strong>📞 Contact:</strong> {activity.contactInfo}</p>}
                          {activity.carDetails && <p className="text-indigo-700"><strong>🔢 Details:</strong> {activity.carDetails}</p>}
                          {activity.warning && <p className="text-red-700"><strong>⚠️ Warning:</strong> {activity.warning}</p>}
                          {activity.sentiment && <p className="text-green-700"><strong>💭 Note:</strong> {activity.sentiment}</p>}
                          
                          {activity.checklist && <div className="mt-2">
                              <strong>Checklist:</strong>
                              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                                {activity.checklist.map((item, i) => <li key={i}>{item}</li>)}
                              </ul>
                            </div>}
                          {activity.suggestions && <div className="mt-2">
                              <strong>🍽️ Try:</strong> {activity.suggestions.join(', ')}
                            </div>}
                          {activity.sites && <div className="mt-2">
                              <strong>🏛️ Sites:</strong> {activity.sites.join(', ')}
                            </div>}
                          {activity.highlights && <div className="mt-2">
                              <strong>✨ Highlights:</strong> {activity.highlights.join(', ')}
                            </div>}
                          {activity.areas && <div className="mt-2">
                              <strong>📍 Areas:</strong> {activity.areas.join(', ')}
                            </div>}
                        </div>
                        <div className="text-center">
                          {activity.image && <img src={activity.image} alt={activity.activity} className="w-full h-32 rounded-lg object-cover mb-2" />}
                          {activity.playlist && <div className="bg-green-100 rounded p-2">
                              <span className="text-sm">🎵 {activity.playlist}</span>
                            </div>}
                          {activity.flightInfo && <div className="bg-blue-100 rounded p-2">
                              <span className="text-sm">✈️ {activity.flightInfo}</span>
                            </div>}
                          {activity.distance && <div className="bg-indigo-100 rounded p-2">
                              <span className="text-sm">🛣️ {activity.distance}</span>
                            </div>}
                        </div>
                      </div>
                    </div>}
                </Card>) : <Card className="p-8 text-center">
              <p className="text-gray-500">No activities planned for today yet.</p>
              <Button onClick={() => setShowAddActivity(true)} className="mt-4">
                Add Your First Activity
              </Button>
            </Card>}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowExpenseSection(!showExpenseSection)}>
          <h2 className="text-2xl font-semibold flex items-center">
            <Euro className="h-6 w-6 mr-2" /> Expense Tracking
          </h2>
          <Button variant="ghost" size="sm">
            {showExpenseSection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showExpenseSection && <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <ExpenseTracker dayId={currentDayData.dayNumber} date={currentDayData.date} initialExpenses={currentDayExpenses} onSave={handleSaveExpenses} />
          </div>}
      </div>

      {/* Purchases for Customs Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowPurchaseSection(!showPurchaseSection)}>
          <h2 className="text-2xl font-semibold flex items-center">
            <Map className="h-6 w-6 mr-2" /> Purchases for Customs
          </h2>
          <Button variant="ghost" size="sm">
            {showPurchaseSection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showPurchaseSection && <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <PurchaseTracker dayId={currentDayData.dayNumber} date={currentDayData.date} countryName={currentDayData.city.split(",")[1]?.trim() || currentDayData.city} initialPurchases={currentDayPurchases} onSave={handleSavePurchases} />
          </div>}
      </div>

      {/* Accommodation Info */}
      {currentDayData.accommodation && <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3">🏨 Tonight's Stay</h3>
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row items-center">
              {currentDayData.accommodation.image && <img src={currentDayData.accommodation.image} alt={currentDayData.accommodation.name} className="w-full sm:w-24 h-48 sm:h-20 rounded mr-0 sm:mr-4 mb-4 sm:mb-0 object-cover" />}
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{currentDayData.accommodation.name}</h4>
                {currentDayData.accommodation.address && <p className="text-gray-600 text-sm mb-1">{currentDayData.accommodation.address}</p>}
                {currentDayData.accommodation.contactPhone && <p className="text-blue-600 mb-1">📞 {currentDayData.accommodation.contactPhone}</p>}
                {currentDayData.accommodation.confirmationNumber && <p className="text-green-600 font-mono mb-1">🔢 Confirmation: {currentDayData.accommodation.confirmationNumber}</p>}
                {currentDayData.accommodation.confirmationCode && <p className="text-green-600 font-mono mb-1">🔢 Confirmation: {currentDayData.accommodation.confirmationCode}</p>}
                {currentDayData.accommodation.checkin && <p className="text-purple-600 mb-1">⏰ Check-in: {currentDayData.accommodation.checkin}</p>}
                {currentDayData.accommodation.checkout && <p className="text-purple-600 mb-1">⏰ Check-out: {currentDayData.accommodation.checkout}</p>}
                {currentDayData.accommodation.wifi && <p className="text-purple-600 mb-1">📶 WiFi: {currentDayData.accommodation.wifi}</p>}
                {currentDayData.accommodation.parking && <p className="text-orange-600 mb-1">🅿️ {currentDayData.accommodation.parking}</p>}
                {currentDayData.accommodation.totalPrice && <p className="text-green-600 mb-1">💰 {currentDayData.accommodation.totalPrice}</p>}
              </div>
            </div>
          </Card>
        </div>}

      {/* Car Rental Details Banner for Day 1 */}
      {currentDay === 0 && <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-5 w-5" /> Rental Car Details
          </h3>
          <Card className="p-4 border-t-4 border-blue-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Your Vehicle</h4>
                  <div className="text-gray-700">
                    <p><strong>Car:</strong> Volkswagen Jetta (or similar)</p>
                    <p><strong>Transmission:</strong> Automatic</p>
                    <p><strong>Mileage:</strong> Unlimited</p>
                    <p><strong>Total:</strong> $110.89 (Prepaid with Visa *4592)</p>
                    <p className="text-xs mt-2 text-green-600">Amazon.com Gift Card upon rental completion</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Pick-Up Location
                    </h4>
                    <p className="text-gray-700">Santa Maria Public Airport (SMX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 805-922-3113</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Return Location
                    </h4>
                    <p className="text-gray-700">Los Angeles International Airport (LAX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 310-642-4500</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Pick-Up: 10:00 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Return: 2:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Thursday, Jun 05, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>}

      {/* Return Trip Car Rental Details for June 26 */}
      {currentDayData.date === '2025-06-26' && <div className="container mx-auto px-4 pb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Car className="h-5 w-5" /> Return Trip Rental Car Details
          </h3>
          <Card className="p-4 border-t-4 border-purple-500">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Your Vehicle</h4>
                  <div className="text-gray-700">
                    <p><strong>Car:</strong> Toyota Corolla (or similar)</p>
                    <p><strong>Transmission:</strong> Automatic</p>
                    <p><strong>Mileage:</strong> Unlimited</p>
                    <p><strong>Total:</strong> $89.98 (Confirmation #23786281US1)</p>
                    <p className="text-xs mt-2 text-green-600">Amazon.com Gift Card upon rental completion</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Pick-Up Location
                    </h4>
                    <p className="text-gray-700">Los Angeles International Airport (LAX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 310-642-4500</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4" /> Return Location
                    </h4>
                    <p className="text-gray-700">Santa Maria Public Airport (SMX)</p>
                    <p className="text-gray-700 text-sm">Budget Fastbreak Counter</p>
                    <p className="text-gray-700 text-sm">Phone: (1) 805-922-3113</p>
                    <p className="text-gray-700 text-sm text-amber-600">After-hours key-drop box available</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Pick-Up: 1:30 AM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Return: 11:30 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-700">Thursday, Jun 26, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>}

      {/* Edit Day Modal */}
      <EditDayModal isOpen={editDayModalOpen} onClose={() => setEditDayModalOpen(false)} day={currentDayData} onSave={handleUpdateDay} />

      {/* Edit Activity Modal */}
      {currentEditActivity && <EditActivityModal isOpen={editActivityModalOpen} onClose={() => setEditActivityModalOpen(false)} activity={currentEditActivity} onSave={handleUpdateActivity} />}

      {/* Quick Add Activity Button */}
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setShowAddActivity(!showAddActivity)} size="lg" className="rounded-full w-14 h-14 shadow-lg hover:scale-105 p-0">
          {showAddActivity ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
};
