/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactElement } from 'react';
import NavBar from '../navBar/NavBar';
import UserBar from '../userBar/UserBar';

import Api from '../../../../api/api';

import './burger.css';

type BurgerProps = {
  api: Api;
  isActive: boolean;
  onClick: () => void;
};

export default function Burger({
  api,
  isActive,
  onClick,
}: BurgerProps): ReactElement {
  return (
    <div className={`burger${isActive ? ' burger_active' : ''}`}>
      <div className='burger__background' onClick={() => onClick()} />
      <div className='burger__container'>
        <UserBar api={api} />
        <NavBar />
      </div>
    </div>
  );
}
