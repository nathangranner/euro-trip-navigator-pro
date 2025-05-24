
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, folder: string = 'general'): Promise<string | null> => {
    try {
      setUploading(true);

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive"
        });
        return null;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error", 
          description: "File must be an image",
          variant: "destructive"
        });
        return null;
      }

      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast({
          title: "Error",
          description: "You must be logged in to upload images",
          variant: "destructive"
        });
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.data.user.id}/${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('trip-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('trip-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const saveImageToDatabase = async (imageUrl: string, imageType: 'photo' | 'document' | 'banner', tripId?: string, tripDayId?: string, activityId?: string, caption?: string) => {
    try {
      const { error } = await supabase
        .from('trip_images')
        .insert([{
          image_url: imageUrl,
          image_type: imageType,
          trip_id: tripId || null,
          trip_day_id: tripDayId || null,
          activity_id: activityId || null,
          caption: caption || null
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image saved successfully"
      });
    } catch (error) {
      console.error('Error saving image to database:', error);
      toast({
        title: "Error",
        description: "Failed to save image to database",
        variant: "destructive"
      });
    }
  };

  return {
    uploadImage,
    saveImageToDatabase,
    uploading
  };
};
