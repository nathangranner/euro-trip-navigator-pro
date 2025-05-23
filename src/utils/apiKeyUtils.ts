
import { supabase } from "@/integrations/supabase/client";

// Enhanced API key management - now using Supabase instead of localStorage
export const saveApiKey = async (service: string, key: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("User not authenticated. Cannot save API key.");
      return false;
    }
    
    const { error } = await supabase
      .from('api_keys')
      .upsert(
        {
          user_id: user.id,
          service,
          api_key: key
        },
        { 
          onConflict: 'user_id,service',
          ignoreDuplicates: false 
        }
      );
    
    if (error) {
      console.error("Error saving API key:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in saveApiKey:", error);
    return false;
  }
};

export const getApiKey = async (service: string): Promise<string> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("User not authenticated. Cannot retrieve API key.");
      return "";
    }
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('api_key')
      .eq('user_id', user.id)
      .eq('service', service)
      .maybeSingle();
    
    if (error) {
      console.error("Error retrieving API key:", error);
      return "";
    }
    
    return data?.api_key || "";
  } catch (error) {
    console.error("Error in getApiKey:", error);
    return "";
  }
};

export const clearApiKey = async (service: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("User not authenticated. Cannot delete API key.");
      return false;
    }
    
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('user_id', user.id)
      .eq('service', service);
    
    if (error) {
      console.error("Error deleting API key:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in clearApiKey:", error);
    return false;
  }
};

// Check if user has an API key stored
export const hasApiKey = async (service: string): Promise<boolean> => {
  const key = await getApiKey(service);
  return key !== "";
};
