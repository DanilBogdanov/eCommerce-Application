import { ReactElement } from 'react';
import { LineItem } from '../../../../types/api';
import './line.css';

type LineProps = {
  line: LineItem;
  index: number;
  changeQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeLine: (lineItemId: string) => Promise<void>;
};

export function Line({
  line,
  index,
  changeQuantity,
  removeLine,
}: LineProps): ReactElement {
  return (
    <div className='line-container'>
      <div className='line__item-data'>
        <div className='line__postiton'>{index + 1}</div>
        <div className='line__image-container'>
          <img
            src={line.variant.images[0].url}
            alt={line.variant.images[0].label}
            className='line__image'
          />
        </div>
        <div className='line__item-title'>
          <div className='line__item-name'>{line.name['en-US']}</div>
          <div className='line__img-quntity'>
            Collection of{' '}
            <span className='bold'>{line.variant.images.length}</span>{' '}
            {line.variant.images.length < 2 ? 'image' : 'images'}
          </div>
          <div className='line__item-author'>
            by <span className='bold'>{line.variant.attributes[0].value} </span>
          </div>
        </div>
      </div>
      <div className='line__prices'>
        <div
          className={`line__full-price ${
            line.price.discounted ? 'strikethrough' : ''
          }`}
        >
          $ {line.price.value.centAmount / 100}
        </div>
        {line.price.discounted?.value ? (
          <div className='line__discont-price'>
            $ {line.price.discounted.value.centAmount / 100}
          </div>
        ) : (
          <div />
        )}
        <div className='line__promo-price' />
      </div>
      <div className='line__quantitiy-container'>
        <div className='line__quantity-settings'>
          <button
            className='button line__quantity-button'
            type='button'
            onClick={() => changeQuantity(line.id, line.quantity - 1)}
          >
            –
          </button>
          <div className='line__quantity'>{line.quantity}</div>
          <button
            className='button line__quantity-button'
            type='button'
            onClick={() => changeQuantity(line.id, line.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className='line__total_price'>
          Total price: $
          <span className='bold'>{line.totalPrice.centAmount / 100}</span>
        </div>
      </div>
      <button
        className='button line__remove'
        type='button'
        onClick={() => removeLine(line.id)}
      >
        remove
      </button>
    </div>
  );
}
