import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './cartBar.css';

export default function CartBar(): ReactElement {
  return (
    <div className='cart-bar'>
      <NavLink className='cart-bar__link' to='/cart'>
        <img src='/icons/header/cart.svg' height={30} alt='cart' />
      </NavLink>
    </div>
  );
}
