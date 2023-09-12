import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import { ApiResponse, Cart } from '../../../types/api';
import './cart.css';
import { EmptyCartMassage } from './emptyCartMassage/EmptyCartMassage';

export function CartPage() {
  const [cart, setCart] = useState<ApiResponse<Cart> | null>(null);
  useEffect(() => {
    const chekCart = async () => {
      const cartData = await api.carts.getCart();
      setCart(cartData);
    };
    chekCart();
  }, []);
  if (cart?.data?.lineItems.length === 0) return <EmptyCartMassage />;
  return <div>Корзина</div>;
}
