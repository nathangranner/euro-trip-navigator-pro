
// Utility function to parse date strings without timezone issues
export const parseLocalDate = (dateString: string): Date => {
  // Parse the date string as local time to avoid timezone conversion
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
};

// Format date for display
export const formatDisplayDate = (dateString: string): string => {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
