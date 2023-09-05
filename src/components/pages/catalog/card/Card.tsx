import { ReactElement, useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Product } from '../../../../types/api';
import './card.css';
import { ShopingAttributs } from '../../../shopingAttributs/ShopingAttributs';

type CardProps = {
  item: Product;
  cateoguriesNames: string[][] | null;
};

export function Card({ item, cateoguriesNames }: CardProps): ReactElement {
  const [correctPath, setCorrectPath] = useState<string | null>(null);
  const buttonBookMarkRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split('/');
    const currentDir = pathArray[pathArray.length - 1];
    const productCategory = cateoguriesNames?.filter(
      (categoryName) => categoryName[0] === item.categoryId,
    );

    if (currentDir === 'catalog' && productCategory) {
      const pathString = `${
        location.pathname
      }/${productCategory[0][1].toLowerCase()}/${item.key}`;
      setCorrectPath(pathString);
    } else {
      const pathString = `${location.pathname}/${item.key}`;
      setCorrectPath(pathString);
    }
  }, [cateoguriesNames, item.categoryId, item.key, location]);

  function addBookMark() {
    if (buttonBookMarkRef && buttonBookMarkRef.current) {
      const currentClass = buttonBookMarkRef.current.classList;
      if (currentClass.contains('active')) {
        currentClass.remove('active');
      } else {
        currentClass.add('active');
      }
    }
  }

  return (
    <div className='prodoct-card'>
      <div className='product-card__header'>
        <div className='product-card__author-name'>
          {item.attributes[0].value}
        </div>
        <button
          type='button'
          className='product-card__bookmark'
          onClick={addBookMark}
          ref={buttonBookMarkRef}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='34'
            viewBox='0 0 24 34'
            fill='none'
            className='product-card__bookmark__svg'
          >
            <path
              d='M4.61121 16.0518V0.730235H19.6737V16.0518C19.6741 16.3514 19.6002 16.6374 19.4683 16.8779L19.4683 16.878C19.3367 17.1179 19.1576 17.2949 18.9639 17.4039L18.9639 17.4039C18.7721 17.5118 18.5674 17.5527 18.3696 17.5325L18.3695 17.5324C18.1711 17.5122 17.9687 17.4291 17.7873 17.2756L17.7856 17.2741L13.2143 13.4224L13.2106 13.4193C12.9168 13.1741 12.5433 13.0289 12.1443 13.0289C11.7454 13.0289 11.3719 13.1741 11.078 13.4193L11.0743 13.4225L6.49926 17.2784L6.49822 17.2793C6.31659 17.4328 6.11397 17.5158 5.91536 17.5359C5.71737 17.556 5.51254 17.5149 5.32054 17.4067C5.12679 17.2975 4.94758 17.12 4.81604 16.8797L4.61121 16.0518Z'
              fill='#80B35E'
              fillOpacity='0.13'
              stroke='#80B35E'
              strokeWidth='2'
            />
          </svg>
        </button>
      </div>
      <NavLink to={correctPath || '/'} className='product-card_img-container'>
        <img
          src={item.imagesUrl[0]}
          alt={item.name}
          className='prodoct-card__img'
        />
      </NavLink>

      <div className='product-card__attributs'>
        <div className='product-card__item-name'>
          {item.name.length > 20
            ? `${item.name.substring(0, 15)}...`
            : item.name}
        </div>
        <ShopingAttributs item={item} />
      </div>
    </div>
  );
}
