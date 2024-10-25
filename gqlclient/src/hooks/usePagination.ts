import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    goToPage,
  };
};