import { ChangeEvent, useEffect, useState } from 'react';
import { EmptyCartMassage } from './emptyCartMassage/EmptyCartMassage';
import { api } from '../../../api/api';
import { Cart } from '../../../types/api';
import './cart.css';
import { Line } from './line/Line';

export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setInputValue('');
  };

  useEffect(() => {
    const loadCart = async () => {
      const cartResp = await api.carts.getCart();
      if (cartResp.isSuccessful && cartResp.data) {
        setCart(cartResp.data);
      }
    };
    loadCart();
  }, []);

  const changeQuantity = async (lineItemId: string, quantity: number) => {
    const cartResp = await api.carts.changeLineItemQuantity(
      lineItemId,
      quantity,
    );
    if (cartResp.isSuccessful && cartResp.data) {
      setCart(cartResp.data);
    }
  };

  const removeLine = async (lineItemId: string) => {
    const cartResp = await api.carts.removeLineItem(lineItemId);
    if (cartResp.isSuccessful && cartResp.data) {
      setCart(cartResp.data);
    }
  };

  const clearCart = async () => {
    const cartResp = await api.carts.cleanCart();
    if (cartResp.isSuccessful && cartResp.data) {
      setCart(cartResp.data);
    }
  };

  if (!cart || cart.lineItems.length === 0) return <EmptyCartMassage />;

  return (
    <div className='cart__container'>
      <div className='cart__title'>Your Cart</div>
      <div className='cart__items-container'>
        {cart.lineItems.map((item, idx) => {
          return (
            <Line
              key={item.id}
              line={item}
              index={idx}
              changeQuantity={changeQuantity}
              removeLine={removeLine}
            />
          );
        })}
      </div>
      <div className='cart__promocode-container'>
        <input
          type='text'
          placeholder='Insert promocode here'
          value={inputValue}
          onChange={handleInputChange}
          className='cart__promocode-input'
        />
        <button
          className='button cart__promocode-button'
          type='button'
          onClick={handleButtonClick}
        >
          Send promocode
        </button>
      </div>
      <div className='cart__total-price'>
        Total: $ {cart.totalPrice.centAmount / 100}
      </div>
      <div className='cart__clear-cart-container'>
        <button
          className='button cart__clear-button'
          type='button'
          onClick={() => clearCart()}
        >
          clear cart
        </button>
      </div>
      <div />
    </div>
  );
}
