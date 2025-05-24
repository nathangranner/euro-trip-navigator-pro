
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/imageStorageUtils";

export const useBannerImage = (bannerImage: string | null, onBannerChange: (newBanner: string) => void) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(bannerImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSave = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Image URL Required",
        description: "Please provide a valid image URL or upload an image",
        variant: "destructive",
      });
      return;
    }

    console.log("Saving banner image:", imageUrl);
    onBannerChange(imageUrl);
    setIsEditing(false);
    setPreviewImage(null);
    toast({
      title: "Banner Updated",
      description: "Your banner image has been updated successfully",
    });
  };

  const handleFileUpload = async (file: File) => {
    // Check if file is an image (including WebP)
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, WebP, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Show preview before upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      console.log("Starting banner image upload...");
      
      // Upload to Supabase
      const uploadedUrl = await uploadImage(file, "banners");
      
      if (uploadedUrl) {
        console.log("Banner upload successful:", uploadedUrl);
        setImageUrl(uploadedUrl);
        toast({
          title: "Upload Successful",
          description: "Image has been uploaded successfully",
        });
      } else {
        throw new Error("Upload returned null URL");
      }
    } catch (error) {
      console.error("Error uploading banner file:", error);
      setPreviewImage(null);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "An error occurred while uploading the image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearPreview = () => {
    setPreviewImage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(null);
    setImageUrl(bannerImage || "");
  };

  return {
    isEditing,
    setIsEditing,
    imageUrl,
    setImageUrl,
    isUploading,
    fileInputRef,
    dragActive,
    setDragActive,
    previewImage,
    handleSave,
    handleFileUpload,
    clearPreview,
    handleCancel,
  };
};
