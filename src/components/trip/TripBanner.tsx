import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/imageStorageUtils";

interface TripBannerProps {
  bannerImage: string | null;
  onBannerChange: (newBanner: string) => void;
}

export const TripBanner: React.FC<TripBannerProps> = ({
  bannerImage,
  onBannerChange,
}) => {
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreviewImage(null);
  };

  // Get the image to display (preview, current URL input, or saved banner)
  const displayImage = previewImage || (isEditing ? imageUrl : bannerImage);

  return (
    <div className="w-full mb-8">
      {!isEditing ? (
        <div className="relative">
          <Card className="overflow-hidden rounded-lg">
            <div 
              className="w-full h-64 bg-cover bg-center flex items-center justify-center"
              style={{ 
                backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
                backgroundColor: bannerImage ? 'transparent' : '#f0f0f0'
              }}
            >
              {!bannerImage && (
                <div className="text-gray-400 flex flex-col items-center">
                  <Image className="h-12 w-12" />
                  <p>No banner image set</p>
                </div>
              )}
            </div>
          </Card>
          <Button 
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-black"
            onClick={() => setIsEditing(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Change Banner
          </Button>
        </div>
      ) : (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Update Banner Image</h3>
          
          {/* Image Preview Section */}
          {displayImage && (
            <div className="mb-4">
              <div className="relative w-full h-48 overflow-hidden rounded-lg border">
                <img 
                  src={displayImage} 
                  alt="Banner preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load banner image:", displayImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                  onLoad={() => {
                    console.log("Banner image loaded successfully:", displayImage);
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Failed to load image</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div 
            className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              {previewImage ? (
                <div className="relative w-full max-h-48 overflow-hidden mb-4">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="mx-auto max-h-48 object-contain"
                  />
                  <button 
                    onClick={clearPreview}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center mb-2">
                    Drag and drop an image here, or click to select a file
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.webp"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={triggerFileInput}
                disabled={isUploading}
                className="mt-2"
              >
                {isUploading ? "Uploading..." : "Select Image"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/your-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a direct URL to an image or upload a file above (JPEG, PNG, WebP supported)
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setPreviewImage(null);
                setImageUrl(bannerImage || "");
              }}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isUploading}
              >
                Save Banner
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
