
import { supabase } from "@/integrations/supabase/client";

export const verifyAuthentication = async (): Promise<string> => {
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    console.error("Auth error:", authError);
    throw new Error("Authentication failed");
  }
  
  if (!user) {
    throw new Error("User must be authenticated to upload images");
  }
  
  console.log("User authenticated:", user.id);
  return user.id;
};
