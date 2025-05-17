export const createFilterObject = (filter) => {
  switch (filter) {
    case 'upvotes':
      return { filterByUpvotes: true, filterByStars: false, sortByDate: false, sortByOldest: false };
    case 'stars':
      return { filterByUpvotes: false, filterByStars: true, sortByDate: false, sortByOldest: false };
    case 'recent':
      return { filterByUpvotes: false, filterByStars: false, sortByDate: true, sortByOldest: false };
    case 'oldest':
      return { filterByUpvotes: false, filterByStars: false, sortByDate: false, sortByOldest: true };
    default: // For clearing the filter (empty string)
      return { filterByUpvotes: false, filterByStars: false, sortByDate: false, sortByOldest: true }; // Or your default clear state
  }
};