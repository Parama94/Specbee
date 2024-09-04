import { useState } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getDisplayedPages = () => {
    let startPage, endPage;

    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {getDisplayedPages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? styles.active : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
