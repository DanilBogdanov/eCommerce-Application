import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './logo/Logo';
import UserBar from './userBar/UserBar';
import NavBar from './navBar/NavBar';
import BurgerBtn from './burgerBtn/BurgerBtn';
import Burger from './burger/Burger';
import SearchBar from './searchBar/SearchBar';

import { BURGER_BREAKPOINT } from '../../../types/constants';

import './layoutHeader.css';

export default function LayoutHeader(): ReactElement {
  const [hasBurger, setHasBurger] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsBurgerActive(false);
  }, [location]);

  function resizeHandler() {
    setHasBurger(window.innerWidth <= BURGER_BREAKPOINT);
  }

  useEffect(() => {
    resizeHandler();
    globalThis.addEventListener('resize', resizeHandler);

    return () => {
      globalThis.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!hasBurger) {
      setIsBurgerActive(false);
    }
  }, [hasBurger, isBurgerActive]);

  return (
    <header className='header' data-testid='layout-header'>
      <div className='header__container'>
        <NavLink to='/'>
          <Logo color='#638C47' width='100' />
        </NavLink>
        {!hasBurger && (
          <>
            <NavBar />
            <div className='header__control'>
              <SearchBar />
              <UserBar />
            </div>
          </>
        )}
        {hasBurger && (
          <BurgerBtn
            isActive={isBurgerActive}
            onClick={() => setIsBurgerActive((prev) => !prev)}
          />
        )}
      </div>
      {hasBurger && (
        <Burger
          isActive={isBurgerActive}
          onClick={() => setIsBurgerActive((prev) => !prev)}
        />
      )}
    </header>
  );
}
