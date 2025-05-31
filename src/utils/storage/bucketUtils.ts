
import { supabase } from "@/integrations/supabase/client";

const BUCKET_NAME = "trip-images";

// Ensure bucket exists and is properly configured
export const ensureBucket = async (): Promise<boolean> => {
  try {
    console.log("Checking if bucket exists...");
    
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }

    console.log("Available buckets:", buckets?.map(b => b.name));
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
    } else {
      console.log(`Bucket ${BUCKET_NAME} already exists`);
    }
    
    console.log(`Bucket ${BUCKET_NAME} is ready`);
    return true;
  } catch (error) {
    console.error("Error in ensureBucket:", error);
    return false;
  }
};

export { BUCKET_NAME };
