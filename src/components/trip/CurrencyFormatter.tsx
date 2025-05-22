
// Helper function to format currency
export const formatCurrency = (amount: number, currency: string) => {
  const symbol = 
    currency === 'EUR' ? '€' : 
    currency === 'USD' ? '$' : 
    currency === 'GBP' ? '£' : 
    'CHF ';
  
  return `${symbol}${amount.toFixed(2)}`;
};
