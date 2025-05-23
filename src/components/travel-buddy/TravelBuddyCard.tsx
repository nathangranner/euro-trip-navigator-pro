
import React from 'react';
import { Card } from "@/components/ui/card";
import { TravelBuddy } from './types';

interface TravelBuddyCardProps {
  buddy: TravelBuddy;
  isSelected: boolean;
  onSelect: (buddy: TravelBuddy) => void;
}

export const TravelBuddyCard: React.FC<TravelBuddyCardProps> = ({ buddy, isSelected, onSelect }) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}`} 
      onClick={() => onSelect(buddy)}
    >
      <div className="flex items-center mb-3">
        <img 
          src={buddy.avatar} 
          alt={buddy.name} 
          className="w-12 h-12 rounded-full mr-3 object-cover" 
        />
        <div>
          <h3 className="font-semibold">{buddy.name}</h3>
          <p className="text-sm text-gray-500">{buddy.model.split('/')[0]}</p>
        </div>
      </div>
      <p className="text-sm">{buddy.description}</p>
    </Card>
  );
};
