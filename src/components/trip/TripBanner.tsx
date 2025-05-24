
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBannerImage } from "@/hooks/useBannerImage";
import { BannerDisplay } from "./BannerDisplay";
import { BannerImagePreview } from "./BannerImagePreview";
import { BannerImageUpload } from "./BannerImageUpload";

interface TripBannerProps {
  bannerImage: string | null;
  onBannerChange: (newBanner: string) => void;
}

export const TripBanner: React.FC<TripBannerProps> = ({
  bannerImage,
  onBannerChange,
}) => {
  const {
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
  } = useBannerImage(bannerImage, onBannerChange);

  // Get the image to display (preview, current URL input, or saved banner)
  const displayImage = previewImage || (isEditing ? imageUrl : bannerImage);

  return (
    <div className="w-full mb-8">
      {!isEditing ? (
        <BannerDisplay 
          bannerImage={bannerImage} 
          onEditClick={() => setIsEditing(true)} 
        />
      ) : (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Update Banner Image</h3>
          
          <BannerImagePreview displayImage={displayImage} />

          <BannerImageUpload
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            previewImage={previewImage}
            dragActive={dragActive}
            setDragActive={setDragActive}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            onFileUpload={handleFileUpload}
            onClearPreview={clearPreview}
          />
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isUploading}
            >
              Save Banner
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
