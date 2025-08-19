export const getInfoMessage = (
  isLoading: boolean,
  hasResults: boolean,
  hasSearchTerm: boolean
): string => {
  if (isLoading) return "Loading data...";
  if (!hasSearchTerm) return "Start typing to see some results";
  return hasResults ? "Search results:" : "No results found";
};
