import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/utils/imageStorageUtils";
import { saveDayMementoImage } from "@/utils/mementoUtils";

interface DayMementoProps {
  dayNumber: number;
  mementoImage: string | null;
  onMementoChange: (dayNumber: number, newMemento: string) => void;
}

export const DayMemento: React.FC<DayMementoProps> = ({
  dayNumber,
  mementoImage,
  onMementoChange,
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(mementoImage || "");
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

    try {
      // Save to localStorage
      saveDayMementoImage(dayNumber, imageUrl);
      // Update parent component
      onMementoChange(dayNumber, imageUrl);
      setIsEditing(false);
      setPreviewImage(null);
      toast({
        title: "Memento Saved",
        description: `Your memento for Day ${dayNumber} has been saved successfully`,
      });
      console.log(`Memento saved for day ${dayNumber}:`, imageUrl);
    } catch (error) {
      console.error("Error saving memento:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save your memento. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
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

      console.log("Starting upload for memento day", dayNumber);
      
      // Upload to Supabase
      const uploadedUrl = await uploadImage(file, `mementos/day-${dayNumber}`);
      
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        console.log("Upload successful, URL:", uploadedUrl);
        toast({
          title: "Upload Successful",
          description: "Memento image has been uploaded successfully",
        });
      } else {
        throw new Error("Upload returned null URL");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setPreviewImage(null);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
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

  // Get the image to display (preview, current URL input, or saved memento)
  const displayImage = previewImage || (isEditing ? imageUrl : mementoImage);

  return (
    <div className="mb-4">
      {!isEditing ? (
        <div className="relative">
          <Card className="overflow-hidden rounded-lg">
            <div 
              className="w-full h-40 bg-cover bg-center flex items-center justify-center"
              style={{ 
                backgroundImage: mementoImage ? `url(${mementoImage})` : 'none',
                backgroundColor: mementoImage ? 'transparent' : '#f5f5f5'
              }}
            >
              {!mementoImage && (
                <div className="text-gray-400 flex flex-col items-center">
                  <Image className="h-8 w-8" />
                  <p className="text-sm">Add a memento</p>
                </div>
              )}
            </div>
          </Card>
          <Button 
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-black text-xs py-1 h-8"
            onClick={() => setIsEditing(true)}
          >
            <Upload className="h-3 w-3 mr-1" />
            {mementoImage ? "Change" : "Add Memento"}
          </Button>
        </div>
      ) : (
        <Card className="p-3">
          <h3 className="text-sm font-medium mb-2">Day {dayNumber} Memento</h3>
          
          {/* Image Preview Section */}
          {displayImage && (
            <div className="mb-2">
              <div className="relative w-full h-32 overflow-hidden rounded-lg border">
                <img 
                  src={displayImage} 
                  alt="Memento preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load image:", displayImage);
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                  onLoad={() => {
                    console.log("Image loaded successfully:", displayImage);
                  }}
                />
                <div className="hidden w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Image className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs">Failed to load image</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div 
            className={`border-2 border-dashed rounded-lg p-3 mb-3 transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              {previewImage ? (
                <div className="relative w-full max-h-32 overflow-hidden mb-2">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="mx-auto max-h-32 object-contain"
                  />
                  <button 
                    onClick={clearPreview}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500 text-center mb-1">
                    Drag & drop or click to select
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs py-1 h-7"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Select Image"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/your-memento.jpg"
                className="text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a URL or upload an image above
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                setIsEditing(false);
                setPreviewImage(null);
                setImageUrl(mementoImage || "");
              }}>
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={isUploading}
              >
                Save
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
