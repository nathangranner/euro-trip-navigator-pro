import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";
interface BannerDisplayProps {
  bannerImage: string | null;
  onEditClick: () => void;
}
export const BannerDisplay: React.FC<BannerDisplayProps> = ({
  bannerImage,
  onEditClick
}) => {
  return <div className="relative">
      <Card className="overflow-hidden rounded-lg">
        <div style={{
        backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
        backgroundColor: bannerImage ? 'transparent' : '#f0f0f0'
      }} className="w-full h-64 bg-cover bg-center flex items-center justify-center">
          {!bannerImage && <div className="text-gray-400 flex flex-col items-center">
              <Image className="h-12 w-12" />
              <p>No banner image set</p>
            </div>}
        </div>
      </Card>
      <Button className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-black" onClick={onEditClick}>
        <Upload className="h-4 w-4 mr-2" />
        Change Banner
      </Button>
    </div>;
};