
import { supabase } from "@/integrations/supabase/client";
import { BUCKET_NAME } from "./bucketUtils";

export const generatePublicUrl = (filePath: string): string => {
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  if (!publicUrlData.publicUrl) {
    throw new Error("Failed to generate public URL");
  }

  console.log("Public URL generated:", publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
};

export const extractFilePathFromUrl = (imageUrl: string): string => {
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split("/");
  const bucketNameIndex = pathParts.findIndex(part => part === BUCKET_NAME);
  
  if (bucketNameIndex === -1) {
    throw new Error("Not a Supabase storage URL");
  }
  
  // The path should be everything after the bucket name
  return pathParts.slice(bucketNameIndex + 1).join("/");
};

export const isSupabaseUrl = (url: string): boolean => {
  try {
    return url.includes(BUCKET_NAME);
  } catch {
    return false;
  }
};
