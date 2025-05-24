
import React from "react";
import { Image } from "lucide-react";

interface BannerImagePreviewProps {
  displayImage: string | null;
}

export const BannerImagePreview: React.FC<BannerImagePreviewProps> = ({
  displayImage,
}) => {
  if (!displayImage) return null;

  return (
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
  );
};
