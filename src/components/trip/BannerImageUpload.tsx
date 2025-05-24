
import React from "react";
import { Input } from "@/components/ui/input";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  previewImage: string | null;
  dragActive: boolean;
  setDragActive: (active: boolean) => void;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUpload: (file: File) => void;
  onClearPreview: () => void;
}

export const BannerImageUpload: React.FC<BannerImageUploadProps> = ({
  imageUrl,
  setImageUrl,
  previewImage,
  dragActive,
  setDragActive,
  isUploading,
  fileInputRef,
  onFileUpload,
  onClearPreview,
}) => {
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
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
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
                onClick={onClearPreview}
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
    </>
  );
};
