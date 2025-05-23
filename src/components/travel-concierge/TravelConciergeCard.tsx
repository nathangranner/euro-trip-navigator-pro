
import React from 'react';
import { Card } from "@/components/ui/card";
import { TravelConcierge } from './types';

interface TravelConciergeCardProps {
  concierge: TravelConcierge;
  isSelected: boolean;
  onSelect: (concierge: TravelConcierge) => void;
}

export const TravelConciergeCard: React.FC<TravelConciergeCardProps> = ({ concierge, isSelected, onSelect }) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}`} 
      onClick={() => onSelect(concierge)}
    >
      <div className="flex items-center mb-3">
        <img 
          src={concierge.avatar} 
          alt={concierge.name} 
          className="w-12 h-12 rounded-full mr-3 object-cover" 
        />
        <div>
          <h3 className="font-semibold">{concierge.name}</h3>
          <p className="text-sm text-gray-500">{concierge.model.split('/')[0]}</p>
        </div>
      </div>
      <p className="text-sm">{concierge.description}</p>
    </Card>
  );
};
