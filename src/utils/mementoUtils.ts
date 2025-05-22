
// Function to save day memento image to localStorage
export const saveDayMementoImage = (dayNumber: number, mementoUrl: string) => {
  const storedData = localStorage.getItem('tripData') 
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  if (!storedData.dayMementos) {
    storedData.dayMementos = {};
  }
  
  storedData.dayMementos[dayNumber] = mementoUrl;
  
  localStorage.setItem('tripData', JSON.stringify(storedData));
};

// Function to load all day memento images from localStorage
export const loadDayMementoImages = (): Record<number, string> => {
  const storedData = localStorage.getItem('tripData')
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  return storedData.dayMementos || {};
};

// Function to get a specific day's memento image
export const getDayMementoImage = (dayNumber: number): string | null => {
  const dayMementos = loadDayMementoImages();
  return dayMementos[dayNumber] || null;
};
