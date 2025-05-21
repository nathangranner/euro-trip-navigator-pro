
import { toast } from "sonner";
import { getApiKey } from "@/utils/storageUtils";

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
  const apiKey = getApiKey("openrouter");
  
  if (!apiKey) {
    toast.error("OpenRouter API key is required for translation");
    throw new Error("API key not found");
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Europe Trip Planner'
      },
      body: JSON.stringify({
        model: "google/gemini-pro", // Using Gemini Pro for translations
        messages: [
          {
            role: "system",
            content: `You are a precise language translator. Translate the given text from ${request.sourceLanguage || "auto-detected language"} to ${request.targetLanguage}. 
            If the target language uses a non-Latin alphabet, also include a simple pronunciation guide in parentheses. 
            Respond ONLY with the translation and optional pronunciation guide, nothing else.`
          },
          {
            role: "user",
            content: request.text
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Translation service unavailable');
    }

    const data = await response.json();
    const translationText = data.choices[0]?.message?.content || "";
    
    // Parse the response to separate translation and pronunciation if present
    const hasPronunciation = translationText.includes('(') && translationText.includes(')');
    
    let translation: TranslationResult = {
      translatedText: translationText,
    };

    if (hasPronunciation) {
      const matches = translationText.match(/(.*?)\s*\((.*?)\)/);
      if (matches && matches.length >= 3) {
        translation = {
          translatedText: matches[1].trim(),
          pronunciation: matches[2].trim()
        };
      }
    }

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    toast.error("Couldn't complete the translation");
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
