
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TranslationRequest {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
}

interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
  pronunciation?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceLanguage, targetLanguage }: TranslationRequest = await req.json();
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');

    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    if (!text || !targetLanguage) {
      throw new Error('Text and target language are required');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://europe-trip-planner.lovable.app',
        'X-Title': 'Europe Trip Planner'
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct",
        messages: [
          {
            role: "system",
            content: `You are a professional translator specializing in European languages. Your primary function is to provide accurate translations for travelers.

INSTRUCTIONS:
1. Translate the provided text from ${sourceLanguage || "the detected source language"} to ${targetLanguage}
2. Provide ONLY the translation - no explanations, comments, or additional text
3. If the target language uses non-Latin script (Greek, Russian, etc.), add a simple pronunciation guide in parentheses after the translation
4. Maintain the original tone and context appropriate for travel situations
5. For formal phrases, keep them formal; for casual phrases, keep them casual

OUTPUT FORMAT:
- For Latin script languages: [Translation only]
- For non-Latin script languages: [Translation] ([simple pronunciation])

EXAMPLE:
Input: "Where is the bathroom?"
Output for Italian: "Dove è il bagno?"
Output for Greek: "Πού είναι η τουαλέτα;" (Pou ine i toualeta?)

Now translate the following text:`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('Translation service unavailable');
    }

    const data = await response.json();
    const translationText = data.choices[0]?.message?.content?.trim() || "";
    
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

    return new Response(JSON.stringify(translation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
