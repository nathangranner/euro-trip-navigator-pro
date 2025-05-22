
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleSave = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Image URL Required",
        description: "Please provide a valid image URL",
        variant: "destructive",
      });
      return;
    }

    onBannerChange(imageUrl);
    setIsEditing(false);
    toast({
      title: "Banner Updated",
      description: "Your banner image has been updated successfully",
    });
  };

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
                Enter a direct URL to an image (JPG, PNG, or GIF)
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Banner
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
