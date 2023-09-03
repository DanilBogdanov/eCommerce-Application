import { ReactElement, useState, useEffect } from 'react';
import './pagination.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PaginationButtonContent = string | number;

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): ReactElement {
  const [butnsNumbers, setButnsNumbers] = useState<
    PaginationButtonContent[] | null
  >(null);

  useEffect(() => {
    const arrayOfAllPagesNumbers = Array(totalPages).fill(null);
    const filledArrayOfPageNumbers = arrayOfAllPagesNumbers
      .map((item, index, array) => {
        if (
          index === 0 ||
          index === array.length - 1 ||
          index === currentPage - 1 ||
          index === currentPage ||
          index === currentPage + 1
        ) {
          return index;
        }
        if (
          (index !== 0 && index === currentPage - 2) ||
          (index !== currentPage + 1 && index === array.length - 2)
        )
          return '...';

        return item;
      })
      .filter((item) => item === 0 || item);
    setButnsNumbers(filledArrayOfPageNumbers);
  }, [currentPage, totalPages]);

  return (
    <div className='catalog-pagination'>
      <button
        className='catalog-pagination__prev-page'
        type='button'
        onClick={() => {
          if (currentPage === 0) return;
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage <= 0}
      >
        {`<`}
      </button>
      <div className='catalog-pagination__btns-container'>
        {butnsNumbers &&
          butnsNumbers.map((item, index) => {
            if (item === '...')
              return (
                <button
                  type='button'
                  key={String(index) + String(item)}
                  className='catalog-pagination__button'
                  disabled
                >
                  {item}
                </button>
              );
            return (
              <button
                type='button'
                key={String(index) + String(item)}
                onClick={() => {
                  onPageChange(Number(item));
                }}
                className={`catalog-pagination__button ${
                  item === currentPage ? 'active' : null
                }`}
              >
                {Number(item) + 1}
              </button>
            );
          })}
      </div>
      <button
        className='catalog-pagination__next-page'
        type='button'
        onClick={() => {
          if (currentPage >= totalPages - 1) return;
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage >= totalPages - 1}
      >
        {`>`}
      </button>
    </div>
  );
}
