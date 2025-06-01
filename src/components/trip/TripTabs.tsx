import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const TripTabs: React.FC = () => {
  return <TabsList className="grid w-full grid-cols-6 mb-6 mx-[3px] my-px py-[3px] px-[23px] rounded-2xl bg-orange-400">
      <TabsTrigger value="itinerary" className="font-futura text-lg tracking-wide uppercase">Itinerary</TabsTrigger>
      <TabsTrigger value="hotels" className="font-futura text-lg tracking-wide uppercase">Hotels</TabsTrigger>
      <TabsTrigger value="expenses" className="font-futura text-lg tracking-wide uppercase">Expenses</TabsTrigger>
      <TabsTrigger value="purchases" className="font-futura text-lg tracking-wide uppercase">Purchases</TabsTrigger>
      <TabsTrigger value="cityview" className="font-futura text-lg tracking-wide uppercase">City View</TabsTrigger>
      <TabsTrigger value="translation" className="font-futura text-lg tracking-wide uppercase">Translation</TabsTrigger>
    </TabsList>;
};