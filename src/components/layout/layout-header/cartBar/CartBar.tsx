import { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './cartBar.css';
import { api } from '../../../../api/api';

export default function CartBar(): ReactElement {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    api.carts.onChangeQuantity((newQuantity) => {
      setQuantity(newQuantity);
    });
    setQuantity(api.carts.currentQuantity);
  }, []);

  return (
    <div className='cart-bar'>
      <NavLink className='cart-bar__link' to='/cart'>
        <img src='/icons/header/cart.svg' height={30} alt='cart' />
        <div className='cart-bar__quantity'>{quantity}</div>
      </NavLink>
    </div>
  );
}
