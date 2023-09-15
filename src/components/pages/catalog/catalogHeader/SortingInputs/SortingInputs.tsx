import { useState } from 'react';
import { MessageType, notifier } from '../../../../../utils/notifier';
import { MESSAGE_SHOW_TIME_ERROR } from '../../../../../types/constants';
import './sortingInputs.css';

type SortingInputsProps = {
  setPriceFrom: (minPrice: number | undefined) => void;
  setPriceTo: (minPrice: number | undefined) => void;
};
export function SortingInputs({
  setPriceFrom,
  setPriceTo,
}: SortingInputsProps) {
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    setMinPrice(Number.isNaN(newPrice) ? 0 : newPrice);
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    setMaxPrice(Number.isNaN(newPrice) ? 0 : newPrice);
  };

  const updatePriceLimit = () => {
    if (minPrice && maxPrice && minPrice > maxPrice) {
      notifier.showMessage(
        MessageType.ERROR,
        'Search',
        `The maximum price must be greater than the minimum`,
        MESSAGE_SHOW_TIME_ERROR,
      );
      setPriceFrom(undefined);
      setPriceTo(undefined);
    } else {
      if (minPrice) setPriceFrom(Number(minPrice));
      if (maxPrice) setPriceTo(Number(maxPrice));
    }
  };

  const clearPriceLimit = () => {
    setPriceFrom(undefined);
    setPriceTo(undefined);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className='sorting-by-price__container'>
      <input
        type='text'
        value={minPrice}
        onChange={handlePriceFromChange}
        placeholder='Min price'
        pattern='[0-9]*'
        className='sorting-by-price__input'
      />
      <input
        type='text'
        value={maxPrice}
        onChange={handlePriceToChange}
        placeholder='Max price'
        pattern='[0-9]*'
        className='sorting-by-price__input'
      />
      <button
        type='button'
        onClick={updatePriceLimit}
        className='sorting-by-price__button'
      >
        Find
      </button>
      <button
        type='button'
        onClick={clearPriceLimit}
        className='sorting-by-price__button'
      >
        Clear
      </button>
    </div>
  );
}
