import { useState, ReactElement, useCallback } from 'react';
import { Product } from '../../types/api';
import { api } from '../../api/api';
import { MessageType, notifier } from '../../utils/notifier';
import './shopingAttributs.css';

type ShopinAttributsProps = {
  item: Product;
  itemInCart: boolean;
};

export function ShopingAttributs({
  item,
  itemInCart,
}: ShopinAttributsProps): ReactElement {
  const [inCart, setInCart] = useState(itemInCart);
  const addProduct = useCallback(() => {
    if (inCart) {
      api.carts.removeProduct(item.id);
      notifier.showMessage(
        MessageType.INFO,
        'Cart',
        `Remove ${item.name} from cart`,
      );
    } else {
      api.carts.addProduct(item.id);
      notifier.showMessage(
        MessageType.INFO,
        'Cart',
        `Add ${item.name} to cart`,
      );
    }
    setInCart((prev) => !prev);
  }, [inCart, item.id, item.name]);

  return (
    <div className='shoping-attributs'>
      <div className='price'>
        <div className='current-price'>
          $ {item.salePrice ? item.salePrice : item.price}
        </div>
        {item.salePrice && <div className='full-price'>$ {item.price}</div>}
      </div>
      <button
        type='button'
        className={`basket ${inCart ? 'active' : ''}`}
        onClick={addProduct}
        data-testid='basket'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='36'
          height='36'
          viewBox='0 0 27 26'
          fill='none'
          className='basket_svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M25.6214 7.20972H22.1394L20.2703 0.641389C19.9976 0.0688947 19.3203 -0.16227 18.7569 0.12488L18.6286 0.189895C18.067 0.478851 17.834 1.17596 18.1067 1.74845L19.4449 7.20791H7.42797L8.81496 1.75567C9.09308 1.1886 8.86372 0.487881 8.30748 0.193507L8.18107 0.128492C7.62121 -0.164076 6.93855 0.0598649 6.66043 0.628747L4.72262 7.20791H1.30933C0.586942 7.20791 0 7.75332 0 8.42153C0 8.42153 0.585136 10.6248 1.30933 10.6248H2.45793L3.26881 22.6833C3.26881 22.6833 3.36272 25.0473 7.08484 25.0473H19.7646C23.6384 25.0473 23.5842 22.6345 23.5842 22.6345L24.2398 10.6266H25.6232C26.3456 10.6266 26.9325 8.42333 26.9325 8.42333C26.9307 7.75512 26.3438 7.20972 25.6214 7.20972ZM5.37097 10.726H3.45302V8.80801H5.37097V10.726ZM9.0389 21.0399C9.0389 21.672 8.5856 22.1831 8.02936 22.1831H7.98783C7.42617 22.1831 6.97467 21.672 6.97467 21.0399V13.2218C6.97467 12.5897 7.42617 12.0804 7.98783 12.0804H8.02936C8.5856 12.0804 9.0389 12.5897 9.0389 13.2218V21.0399ZM14.4532 20.6877C14.4532 21.2909 14.0252 21.7803 13.4979 21.7803H13.4599C12.9308 21.7803 12.5046 21.2909 12.5046 20.6877V13.285C12.5046 12.6818 12.9308 12.1942 13.4599 12.1942H13.4979C14.0252 12.1942 14.4532 12.6836 14.4532 13.285V20.6877ZM19.8133 20.8539C19.8133 21.4643 19.3709 21.9573 18.8273 21.9573H18.7876C18.2422 21.9573 17.8033 21.4643 17.8033 20.8539V13.3482C17.8033 12.7378 18.2422 12.2448 18.7876 12.2448H18.8273C19.3709 12.2448 19.8133 12.7378 19.8133 13.3482V20.8539ZM23.4307 10.7819H21.455V8.8062H23.4307V10.7819Z'
            fillOpacity='0.78'
          />
        </svg>
      </button>
    </div>
  );
}
