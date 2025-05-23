
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import { TranslationHistory as TranslationHistoryType } from './types';

interface TranslationHistoryProps {
  recentTranslations: TranslationHistoryType[];
  onSelectTranslation: (translation: TranslationHistoryType) => void;
}

export const TranslationHistory: React.FC<TranslationHistoryProps> = ({
  recentTranslations,
  onSelectTranslation
}) => {
  if (recentTranslations.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Translations</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {recentTranslations.map((item, index) => (
          <Card 
            key={index} 
            className="p-3 cursor-pointer hover:bg-gray-50" 
            onClick={() => onSelectTranslation(item)}
          >
            <div className="flex justify-between">
              <div className="truncate max-w-[70%]">
                <span className="text-sm font-medium">{item.input}</span>
                <p className="text-xs text-gray-600 truncate">{item.result.translatedText}</p>
              </div>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">{item.source}</Badge>
                <ArrowDown className="h-3 w-3 mt-1" />
                <Badge variant="outline" className="text-xs">{item.target}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
