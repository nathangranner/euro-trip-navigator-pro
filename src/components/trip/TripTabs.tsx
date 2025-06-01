import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const TripTabs: React.FC = () => {
  return <TabsList className="grid w-full grid-cols-6 mb-6 mx-[3px] my-px py-[3px] px-[23px] rounded-2xl bg-amber-600">
      <TabsTrigger value="itinerary" className="font-futura tracking-wide uppercase text-base text-orange-50 bg-amber-700 hover:bg-amber-600">Itinerary</TabsTrigger>
      <TabsTrigger value="hotels" className="font-futura text-base tracking-wide uppercase text-slate-100 bg-amber-700 hover:bg-amber-600">Hotels</TabsTrigger>
      <TabsTrigger value="expenses" className="font-futura text-base tracking-wide uppercase text-amber-50 bg-amber-700 hover:bg-amber-600">Expenses</TabsTrigger>
      <TabsTrigger value="purchases" className="font-futura text-base tracking-wide uppercase text-slate-100 bg-amber-700 hover:bg-amber-600">Purchases</TabsTrigger>
      <TabsTrigger value="cityview" className="font-futura text-base tracking-wide uppercase text-slate-100 bg-amber-700 hover:bg-amber-600">City View</TabsTrigger>
      <TabsTrigger value="translation" className="font-futura text-base tracking-wide uppercase text-slate-100 bg-amber-700 hover:bg-amber-600">Translation</TabsTrigger>
    </TabsList>;
};