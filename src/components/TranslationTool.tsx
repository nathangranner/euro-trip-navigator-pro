
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translateText, getSupportedLanguages, TranslationResult } from "@/services/TranslationService";
import { Loader2, Languages, ArrowDown, VolumeX, Volume2, ArrowRightLeft, Key } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getApiKey, saveApiKey, isApiKeyPermanent } from "@/utils/storageUtils";
import { Modal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const TranslationTool: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("Auto-detect");
  const [targetLanguage, setTargetLanguage] = useState("Italian");
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState<Array<{input: string, result: TranslationResult, source: string, target: string}>>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [rememberApiKey, setRememberApiKey] = useState(true);

  const languages = getSupportedLanguages();
  const sourceLanguages = ["Auto-detect", ...languages];
  
  // Check for saved API key on component mount
  useEffect(() => {
    const storedApiKey = getApiKey("openrouter");
    const isPermanent = isApiKeyPermanent("openrouter");
    
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setRememberApiKey(isPermanent);
    }
  }, []);
  
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }
    
    // Check if API key is available
    if (!apiKey) {
      setShowApiKeyModal(true);
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
      setRecentTranslations(prev => {
        const newTranslations = [
          { input: inputText, result, source: sourceLanguage, target: targetLanguage },
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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Save the API key, and mark it as permanent if the switch is checked
      saveApiKey("openrouter", apiKey.trim(), rememberApiKey);
      setShowApiKeyModal(false);
      toast.success("OpenRouter API key saved");
      
      // Now try translating again
      handleTranslate();
    } else {
      toast.error("Please enter a valid API key");
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
            onClick={swapLanguages}
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
                  setSourceLanguage(item.source);
                  setTargetLanguage(item.target);
                  setTranslation(item.result);
                }}>
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
        )}
      </div>
      
      {/* API Key Modal */}
      <Modal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
        title="Set OpenRouter API Key" 
        footer={
          <Button onClick={handleSaveApiKey} className="ml-auto">
            Save API Key
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            To use the translation feature, you need an OpenRouter API key. 
            Get your key at <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">openrouter.ai</a>.
          </p>
          
          <Input 
            type="password" 
            value={apiKey} 
            onChange={e => setApiKey(e.target.value)} 
            placeholder="sk-or-v1-xxxxxxxx" 
            className="w-full" 
          />
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="remember-api-key-translation" 
              checked={rememberApiKey}
              onCheckedChange={setRememberApiKey} 
            />
            <Label htmlFor="remember-api-key-translation">Remember this API key permanently</Label>
          </div>
          
          <p className="text-xs text-gray-500">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </Modal>
    </Card>
  );
};
