import { NavLink } from 'react-router-dom';
import './EmptyCartMassage.css';
import emptyCartImage from '../../../../assets/img/empty-cart.png';

export function EmptyCartMassage() {
  return (
    <div className='empty-cart'>
      <h1 className='empty-cart__header'>Cart is empty</h1>
      <div className='empty-cart__img-container'>
        <img
          src={emptyCartImage}
          alt='empty cart'
          className='empty-cart__img'
        />
      </div>
      <div className='empty-cart__link-container'>
        <p className='empty-cart__paragraph'>Find some cool stuff in</p>
        <NavLink to='/catalog' className='emty-cart__link'>
          Catalog
        </NavLink>
      </div>
    </div>
  );
}
