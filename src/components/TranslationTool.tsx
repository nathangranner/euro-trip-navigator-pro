import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { translateText, getSupportedLanguages, TranslationResult } from "@/services/TranslationService";
import { toast } from "sonner";
import { TranslationForm } from './translation/TranslationForm';
import { TranslationResult as TranslationResultComponent } from './translation/TranslationResult';
import { TranslationHistory } from './translation/TranslationHistory';
import { TranslationHistory as TranslationHistoryType } from './translation/types';

export const TranslationTool: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("Auto-detect");
  const [targetLanguage, setTargetLanguage] = useState("Italian");
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState<TranslationHistoryType[]>(() => {
    // Load from localStorage
    const stored = localStorage.getItem('translation-history');
    return stored ? JSON.parse(stored) : [];
  });
  
  const languages = getSupportedLanguages();
  const sourceLanguages = ["Auto-detect", ...languages];
  
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }
    
    setLoading(true);
    try {
      const result = await translateText({
        text: inputText,
        sourceLanguage: sourceLanguage === "Auto-detect" ? undefined : sourceLanguage,
        targetLanguage: targetLanguage
      });
      
      setTranslation(result);
      
      // Save to recent translations (limited to 5)
      const newTranslations = [
        { input: inputText, result, source: sourceLanguage, target: targetLanguage },
        ...recentTranslations
      ].slice(0, 5);
      
      setRecentTranslations(newTranslations);
      
      // Save to localStorage
      localStorage.setItem('translation-history', JSON.stringify(newTranslations));
      
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLanguage !== "Auto-detect") {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
      // Clear current translation when swapping
      setTranslation(null);
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

  const handleSelectTranslation = (historyItem: TranslationHistoryType) => {
    setInputText(historyItem.input);
    setSourceLanguage(historyItem.source);
    setTargetLanguage(historyItem.target);
    setTranslation(historyItem.result);
  };
  
  return (
    <Card className="p-6 bg-slate-700 border-slate-600">
      <h2 className="text-2xl font-semibold mb-4 text-white">Travel Translator</h2>
      <p className="text-gray-300 mb-6">Translate phrases during your European adventure</p>
      
      <TranslationForm
        inputText={inputText}
        setInputText={setInputText}
        sourceLanguage={sourceLanguage}
        setSourceLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        onTranslate={handleTranslate}
        loading={loading}
        sourceLanguages={sourceLanguages}
        targetLanguages={languages}
        onSwapLanguages={swapLanguages}
      />
      
      {translation && (
        <TranslationResultComponent
          translation={translation}
          targetLanguage={targetLanguage}
          onSpeak={speak}
        />
      )}
      
      <TranslationHistory
        recentTranslations={recentTranslations}
        onSelectTranslation={handleSelectTranslation}
      />
    </Card>
  );
};
