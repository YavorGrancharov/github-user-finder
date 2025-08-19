import { PaginationAction } from "./Pagination";

export const goToPage = (currentPage: number, totalPages: number) => {
  return function (action: PaginationAction) {
    switch (action) {
      case "first": return 1;
      case "next": return Math.min(currentPage + 1, totalPages);
      case "prev": return Math.max(currentPage - 1, 1);
      case "last": return totalPages;
    }
  };
};
