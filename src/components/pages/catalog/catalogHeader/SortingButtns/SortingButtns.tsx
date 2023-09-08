import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SortOrder, SortedBy } from '../CatalogHeaderTypes';
import './sortingButtns.css';

type SortingButtnsProps = {
  sortedBy: string;
  sortOrder: string;
  setSortedBy: (sortedBy: SortedBy) => void;
  setSortOrder: (order: SortOrder) => void;
};

export function SortingButtns({
  sortedBy,
  sortOrder,
  setSortedBy,
  setSortOrder,
}: SortingButtnsProps) {
  const [path, setPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (path) {
      const isPageChange = path !== location.pathname;
      if (isPageChange) {
        setSortedBy(SortedBy.NAME);
        setSortOrder(SortOrder.ASC);
        setPath(location.pathname);
      }
    } else {
      setPath(location.pathname);
    }
  }, [location, path, setSortOrder, setSortedBy]);

  return (
    <div className='product-header__sort-setting'>
      <button
        type='button'
        className={`product-header__sort-btn ${
          sortedBy === SortedBy.NAME && 'product-header__sort-btn_active'
        }`}
        onClick={() => {
          setSortedBy(SortedBy.NAME);
          if (sortOrder === SortOrder.ASC && sortedBy === SortedBy.NAME) {
            setSortOrder(SortOrder.DESC);
          } else setSortOrder(SortOrder.ASC);
        }}
      >
        Name{' '}
        {sortedBy === SortedBy.NAME && sortOrder === SortOrder.DESC ? '↓' : '↑'}
      </button>
      <button
        type='button'
        className={`product-header__sort-btn ${
          sortedBy === SortedBy.PRICE && 'product-header__sort-btn_active'
        }`}
        onClick={() => {
          setSortedBy(SortedBy.PRICE);
          if (sortOrder === SortOrder.ASC && sortedBy === SortedBy.PRICE) {
            setSortOrder(SortOrder.DESC);
          } else setSortOrder(SortOrder.ASC);
        }}
      >
        Price{' '}
        {sortedBy === SortedBy.PRICE && sortOrder === SortOrder.DESC
          ? '↓'
          : '↑'}
      </button>
    </div>
  );
}
