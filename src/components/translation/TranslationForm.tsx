
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Languages, ArrowRightLeft } from "lucide-react";

interface TranslationFormProps {
  inputText: string;
  setInputText: (text: string) => void;
  sourceLanguage: string;
  setSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  onTranslate: () => void;
  loading: boolean;
  sourceLanguages: string[];
  targetLanguages: string[];
  onSwapLanguages: () => void;
}

export const TranslationForm: React.FC<TranslationFormProps> = ({
  inputText,
  setInputText,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  loading,
  sourceLanguages,
  targetLanguages,
  onSwapLanguages
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Textarea
          placeholder="Enter text to translate..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="resize-none h-24"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="From language" />
          </SelectTrigger>
          <SelectContent>
            {sourceLanguages.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onSwapLanguages}
          disabled={sourceLanguage === "Auto-detect"}
          className="flex-shrink-0"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
        
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="To language" />
          </SelectTrigger>
          <SelectContent>
            {targetLanguages.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={onTranslate} disabled={loading || !inputText.trim()} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Languages className="h-4 w-4 mr-2" />}
        Translate
      </Button>
    </div>
  );
};
