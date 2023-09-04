import { useState } from 'react';
import { DEFAULT_LIMIT_PER_PAGE } from '../../../../types/constants';
import './pageLimit.css';

type PageLimitProps = {
  pageLimit: number | null;
  setPageLimit: (limit: number) => void;
};

export function PageLimit({ pageLimit, setPageLimit }: PageLimitProps) {
  const [activeLimitBtn, setActiveLimitBtn] = useState(pageLimit);
  const setLimit = (limit: number) => {
    setPageLimit(limit);
    setActiveLimitBtn(limit);
  };
  return (
    <div className='page-limit-settings'>
      <button
        type='button'
        className={`page-limit-button ${
          activeLimitBtn === DEFAULT_LIMIT_PER_PAGE ? 'active' : null
        }`}
        onClick={() => setLimit(DEFAULT_LIMIT_PER_PAGE)}
      >
        {DEFAULT_LIMIT_PER_PAGE}
      </button>
      <button
        type='button'
        className={`page-limit-button ${
          activeLimitBtn === DEFAULT_LIMIT_PER_PAGE * 2 ? 'active' : null
        }`}
        onClick={() => setLimit(DEFAULT_LIMIT_PER_PAGE * 2)}
      >
        {DEFAULT_LIMIT_PER_PAGE * 2}
      </button>
      <button
        type='button'
        className={`page-limit-button ${
          activeLimitBtn === DEFAULT_LIMIT_PER_PAGE * 5 ? 'active' : null
        }`}
        onClick={() => setLimit(DEFAULT_LIMIT_PER_PAGE * 5)}
      >
        {DEFAULT_LIMIT_PER_PAGE * 5}
      </button>
    </div>
  );
}
