
export const validateImageFile = (file: File): void => {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File size must be less than 10MB");
  }
};

export const generateFileName = (file: File): string => {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  return fileName;
};

export const generateFilePath = (folder: string, fileName: string): string => {
  return `${folder}/${fileName}`;
};
