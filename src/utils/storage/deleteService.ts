
import { supabase } from "@/integrations/supabase/client";
import { BUCKET_NAME } from "./bucketUtils";
import { extractFilePathFromUrl } from "./urlUtils";

export const deleteImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const filePath = extractFilePathFromUrl(imageUrl);
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
    
    if (error) {
      console.error("Error deleting file:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in deleteImage:", error);
    return false;
  }
};
