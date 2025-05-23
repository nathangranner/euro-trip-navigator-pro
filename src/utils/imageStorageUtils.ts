
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "trip_images";

// Uploads a file to Supabase storage and returns the public URL
export const uploadImage = async (
  file: File,
  folder: string = "misc"
): Promise<string | null> => {
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not authenticated");
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log(`Uploading file to: ${BUCKET_NAME}/${filePath}`);

    // Upload the file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log("Upload successful:", data);

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log("Public URL generated:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};

// Delete an image from Supabase storage
export const deleteImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const bucketNameIndex = pathParts.findIndex(part => part === BUCKET_NAME);
    
    if (bucketNameIndex === -1) {
      console.error("Not a Supabase storage URL");
      return false;
    }
    
    // The path should be everything after the bucket name
    const filePath = pathParts.slice(bucketNameIndex + 1).join("/");
    
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

// Check if URL is from Supabase storage
export const isSupabaseUrl = (url: string): boolean => {
  try {
    return url.includes(BUCKET_NAME);
  } catch {
    return false;
  }
};
