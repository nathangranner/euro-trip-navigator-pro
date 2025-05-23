
import { supabase } from "@/integrations/supabase/client";

export interface TranslationRequest {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
  pronunciation?: string;
}

export const translateText = async (request: TranslationRequest): Promise<TranslationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('translate', {
      body: {
        text: request.text,
        sourceLanguage: request.sourceLanguage === "Auto-detect" ? undefined : request.sourceLanguage,
        targetLanguage: request.targetLanguage
      }
    });

    if (error) {
      console.error('Translation error:', error);
      throw new Error('Translation failed');
    }

    return data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const getSupportedLanguages = (): string[] => {
  return [
    "Italian",
    "German",
    "French",
    "Spanish",
    "English",
    "Swiss German",
    "Portuguese",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Finnish",
    "Russian",
    "Polish",
    "Czech",
    "Hungarian",
    "Greek",
    "Turkish"
  ];
};
