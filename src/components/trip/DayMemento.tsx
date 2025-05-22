
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleSave = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Image URL Required",
        description: "Please provide a valid image URL",
        variant: "destructive",
      });
      return;
    }

    onMementoChange(dayNumber, imageUrl);
    setIsEditing(false);
    toast({
      title: "Memento Updated",
      description: `Your memento for Day ${dayNumber} has been updated`,
    });
  };

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
          <div className="space-y-3">
            <div>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/your-memento.jpg"
                className="text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add a photo or memento from this day
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
