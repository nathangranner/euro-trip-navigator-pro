
import { useState } from 'react';

export const useTripTabs = () => {
  const [activeTab, setActiveTab] = useState("itinerary");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return {
    activeTab,
    handleTabChange
  };
};
