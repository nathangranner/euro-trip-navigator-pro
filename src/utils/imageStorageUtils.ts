
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "trip-images";

// Ensure bucket exists and is properly configured
const ensureBucket = async () => {
  try {
    console.log("Checking if bucket exists...");
    
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }

    console.log("Available buckets:", buckets);
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`Bucket ${BUCKET_NAME} does not exist, attempting to create it...`);
      
      // Try to create the bucket
      const { data: createData, error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error("Error creating bucket:", createError);
        return false;
      }
      
      console.log("Bucket created successfully:", createData);
    }
    
    console.log(`Bucket ${BUCKET_NAME} is ready`);
    return true;
  } catch (error) {
    console.error("Error in ensureBucket:", error);
    return false;
  }
};

// Uploads a file to Supabase storage and returns the public URL
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

    // Ensure bucket exists
    const bucketReady = await ensureBucket();
    if (!bucketReady) {
      // If bucket creation failed, try to proceed anyway - it might exist but list failed
      console.warn("Bucket check failed, attempting upload anyway...");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size must be less than 10MB");
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log(`Uploading file to: ${BUCKET_NAME}/${filePath}`);

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
      
      // If the bucket doesn't exist error, try to create it and retry
      if (error.message.includes("Bucket not found") || error.message.includes("bucket does not exist")) {
        console.log("Bucket not found, creating and retrying...");
        
        const bucketCreated = await ensureBucket();
        if (bucketCreated) {
          // Retry the upload
          const retryResult = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
              contentType: file.type,
            });
            
          if (retryResult.error) {
            throw new Error(`Upload failed after bucket creation: ${retryResult.error.message}`);
          }
          
          if (!retryResult.data || !retryResult.data.path) {
            throw new Error("Upload succeeded but no path returned");
          }
          
          console.log("Retry upload successful:", retryResult.data);
          
          // Get the public URL
          const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(retryResult.data.path);

          if (!publicUrlData.publicUrl) {
            throw new Error("Failed to generate public URL");
          }

          console.log("Public URL generated:", publicUrlData.publicUrl);
          return publicUrlData.publicUrl;
        }
      }
      
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data || !data.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    console.log("Upload successful:", data);

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    if (!publicUrlData.publicUrl) {
      throw new Error("Failed to generate public URL");
    }

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
