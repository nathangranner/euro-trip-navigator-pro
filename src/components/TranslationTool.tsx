
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translateText, getSupportedLanguages, TranslationResult } from "@/services/TranslationService";
import { Loader2, Languages, ArrowDown, VolumeX, Volume2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const TranslationTool: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Italian");
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState<Array<{input: string, result: TranslationResult, target: string}>>([]);

  const languages = getSupportedLanguages();
  
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }
    
    setLoading(true);
    try {
      const result = await translateText({
        text: inputText,
        targetLanguage: targetLanguage
      });
      
      setTranslation(result);
      
      // Save to recent translations (limited to 5)
      setRecentTranslations(prev => {
        const newTranslations = [
          { input: inputText, result, target: targetLanguage },
          ...prev
        ].slice(0, 5);
        return newTranslations;
      });
      
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const speak = (text: string, lang: string) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map our language names to BCP 47 language tags for speech synthesis
      const langMap: Record<string, string> = {
        "Italian": "it-IT",
        "German": "de-DE",
        "French": "fr-FR",
        "Spanish": "es-ES",
        "English": "en-US",
        "Swiss German": "de-CH",
        "Portuguese": "pt-PT"
        // Add more mappings as needed
      };
      
      utterance.lang = langMap[lang] || lang;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis not supported:", error);
      toast.error("Speech synthesis not supported in this browser");
    }
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Travel Translator</h2>
      <p className="text-gray-600 mb-6">Translate phrases during your European adventure</p>
      
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
          <div className="text-sm text-gray-500">Auto-detect</div>
          <ArrowDown className="h-4 w-4" />
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleTranslate} disabled={loading || !inputText.trim()} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Languages className="h-4 w-4 mr-2" />}
          Translate
        </Button>
        
        {translation && (
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
                onClick={() => speak(translation.translatedText, targetLanguage)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {recentTranslations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Translations</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentTranslations.map((item, index) => (
                <Card key={index} className="p-3 cursor-pointer hover:bg-gray-50" onClick={() => {
                  setInputText(item.input);
                  setTargetLanguage(item.target);
                  setTranslation(item.result);
                }}>
                  <div className="flex justify-between">
                    <div className="truncate max-w-[70%]">
                      <span className="text-sm font-medium">{item.input}</span>
                      <p className="text-xs text-gray-600 truncate">{item.result.translatedText}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{item.target}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
