import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Discount from './discount/Discount';
import './main.css';

export default function Main(): ReactElement {
  return (
    <div className='home'>
      <div className='intro' data-testid='intro'>
        <img
          className='intro__img'
          src='/img/main-background.png'
          alt='home-intro'
          data-testid='intro-img'
        />
        <h1 className='intro__title' data-testid='home-title'>
          Digital Dream Weave
        </h1>
        <p className='intro__subtitle' data-testid='home-subtitle'>
          AI Dreams 4 U
        </p>
        <NavLink className='intro__link' to='/catalog'>
          START BUY
        </NavLink>
      </div>
      <div className='discounts' data-testid='discounts'>
        <div className='discounts__container'>
          <Discount
            title='Discount for orders over 2 pieces'
            percent={20}
            code='more-than-2'
          />
          <Discount
            title='Discount on prices over $50'
            percent={30}
            code='expensive-not-today'
          />
          <Discount
            title='Autumn sale for the entire cart'
            percent={10}
            code='autumn-sale'
          />
        </div>
      </div>
    </div>
  );
}
