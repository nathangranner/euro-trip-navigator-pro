
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TravelConciergeMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface TravelConciergeRequest {
  messages: TravelConciergeMessage[];
  model: string;
  systemPrompt: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, model, systemPrompt }: TravelConciergeRequest = await req.json();
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');

    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    if (!messages || messages.length === 0) {
      throw new Error('Messages are required');
    }

    // Prepare messages for the API call, ensuring system prompt is first
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(msg => msg.role !== "system")
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://europe-trip-planner.lovable.app',
        'X-Title': 'Europe Trip Planner'
      },
      body: JSON.stringify({
        model: model || "meta-llama/llama-3-70b-instruct",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      throw new Error('Travel concierge service unavailable');
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content?.trim() || "I'm sorry, I couldn't process your request.";

    return new Response(JSON.stringify({ response: responseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Travel concierge chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
