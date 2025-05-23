
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2 } from "lucide-react";
import { TranslationResult as TranslationResultType } from "@/services/TranslationService";

interface TranslationResultProps {
  translation: TranslationResultType;
  targetLanguage: string;
  onSpeak: (text: string, lang: string) => void;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  translation,
  targetLanguage,
  onSpeak
}) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <Badge className="mb-2">{targetLanguage}</Badge>
          <p className="text-lg font-medium">{translation.translatedText}</p>
          {translation.pronunciation && (
            <p className="text-sm text-gray-600 italic mt-1">
              {translation.pronunciation}
            </p>
          )}
        </div>
        <Button 
          size="icon"
          variant="ghost" 
          onClick={() => onSpeak(translation.translatedText, targetLanguage)}
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
