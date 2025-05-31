
import { supabase } from "@/integrations/supabase/client";
import { ensureBucket, BUCKET_NAME } from "./bucketUtils";
import { validateImageFile, generateFileName, generateFilePath } from "./fileValidation";
import { verifyAuthentication } from "./authUtils";
import { generatePublicUrl } from "./urlUtils";

export const uploadImage = async (
  file: File,
  folder: string = "misc"
): Promise<string | null> => {
  try {
    console.log("Starting image upload...", { 
      fileName: file.name, 
      size: file.size, 
      type: file.type,
      folder: folder 
    });

    // Ensure bucket exists first
    const bucketReady = await ensureBucket();
    if (!bucketReady) {
      console.warn("Bucket check failed, but attempting upload anyway...");
    }

    // Validate file
    validateImageFile(file);

    // Generate file details
    const fileName = generateFileName(file);
    const filePath = generateFilePath(folder, fileName);

    console.log(`Uploading file to: ${BUCKET_NAME}/${filePath}`);

    // Verify authentication
    await verifyAuthentication();

    // Upload the file with proper options
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("Upload error details:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data || !data.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    console.log("Upload successful:", data);

    // Get the public URL
    const publicUrl = generatePublicUrl(data.path);
    return publicUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};
