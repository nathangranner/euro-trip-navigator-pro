import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const TripTabs: React.FC = () => {
  return <div className="mb-4 sm:mb-6 bg-amber-600 p-1 rounded-2xl">
      <TabsList className="w-full bg-transparent p-0 h-auto grid-cols-none flex overflow-x-auto scrollbar-hide">
        <TabsTrigger value="itinerary" className="font-futura tracking-wide uppercase text-sm sm:text-base bg-amber-700 hover:bg-amber-600 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit text-gray-200">
          Itinerary
        </TabsTrigger>
        <TabsTrigger value="hotels" className="font-futura text-sm sm:text-base tracking-wide uppercase text-slate-100 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit bg-amber-700 hover:bg-amber-600">
          Hotels
        </TabsTrigger>
        <TabsTrigger value="expenses" className="font-futura text-sm sm:text-base tracking-wide uppercase text-amber-50 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit bg-amber-700 hover:bg-amber-600">
          Expenses
        </TabsTrigger>
        <TabsTrigger value="purchases" className="font-futura text-sm sm:text-base tracking-wide uppercase text-slate-100 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit bg-amber-700 hover:bg-amber-600">
          Purchases
        </TabsTrigger>
        <TabsTrigger value="cityview" className="font-futura text-sm sm:text-base tracking-wide uppercase text-slate-100 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit bg-amber-700 hover:bg-amber-600">
          City View
        </TabsTrigger>
        <TabsTrigger value="translation" className="font-futura text-sm sm:text-base tracking-wide uppercase text-slate-100 whitespace-nowrap px-3 sm:px-4 py-2 flex-shrink-0 min-w-fit bg-amber-700 hover:bg-amber-600">
          Translation
        </TabsTrigger>
      </TabsList>
    </div>;
};