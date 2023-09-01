type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  function getPageNumbers() {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i + 1) {
        pageNumbers.push(i);
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2);
      const rightOffset = totalPages - leftOffset;

      if (currentPage <= leftOffset) {
        for (let i = 1; i <= maxVisiblePages; i + 1) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages);
      } else if (currentPage >= rightOffset) {
        pageNumbers.push(1, '...');
        for (
          let i = rightOffset - (maxVisiblePages - 1);
          i <= totalPages;
          i + 1
        ) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pageNumbers;
  }

  function handlePageClick(page: number | string) {
    if (page !== '...') {
      onPageChange(Number(page));
    }
  }

  return (
    <div className='pagination'>
      {getPageNumbers().map((page, index) => (
        <button
          type='button'
          key={String(index) + page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
