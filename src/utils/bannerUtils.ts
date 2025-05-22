
// Function to save banner image to localStorage
export const saveBannerImage = (bannerUrl: string) => {
  const storedData = localStorage.getItem('tripData') 
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  storedData.bannerImage = bannerUrl;
  
  localStorage.setItem('tripData', JSON.stringify(storedData));
};

// Function to load banner image from localStorage
export const loadBannerImage = (): string | null => {
  const storedData = localStorage.getItem('tripData')
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  return storedData.bannerImage || null;
};

// Function to save city banner image to localStorage
export const saveCityBannerImage = (city: string, bannerUrl: string) => {
  const storedData = localStorage.getItem('tripData') 
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  if (!storedData.cityBanners) {
    storedData.cityBanners = {};
  }
  
  storedData.cityBanners[city] = bannerUrl;
  
  localStorage.setItem('tripData', JSON.stringify(storedData));
};

// Function to load city banner images from localStorage
export const loadCityBannerImages = (): Record<string, string> => {
  const storedData = localStorage.getItem('tripData')
    ? JSON.parse(localStorage.getItem('tripData') || '{}')
    : {};
  
  return storedData.cityBanners || {};
};

// Function to get a specific city's banner image
export const getCityBannerImage = (city: string): string | null => {
  const cityBanners = loadCityBannerImages();
  return cityBanners[city] || null;
};
