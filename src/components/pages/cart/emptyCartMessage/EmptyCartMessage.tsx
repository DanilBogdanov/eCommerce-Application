import { NavLink } from 'react-router-dom';
import emptyCartImage from '../../../../assets/img/empty-cart.png';
import './EmptyCartMessage.css';

enum EmptyCartText {
  TITLE = 'Cart is empty',
  PARAGRAPH = 'Find some cool stuff in',
}

export function EmptyCartMessage() {
  return (
    <div className='empty-cart'>
      <h1 className='empty-cart__header'>{EmptyCartText.TITLE}</h1>
      <div className='empty-cart__img-container'>
        <img
          src={emptyCartImage}
          alt='empty cart'
          className='empty-cart__img'
        />
      </div>
      <div className='empty-cart__link-container'>
        <p className='empty-cart__paragraph'>{EmptyCartText.PARAGRAPH}</p>
        <NavLink to='/catalog' className='emty-cart__link'>
          Catalog
        </NavLink>
      </div>
    </div>
  );
}
