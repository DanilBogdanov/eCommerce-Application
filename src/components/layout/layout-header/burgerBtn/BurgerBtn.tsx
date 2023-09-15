import { ReactElement } from 'react';

import './burgerBtn.css';

type BurgerBtnProps = {
  isActive: boolean;
  onClick: () => void;
};

export default function BurgerBtn({
  isActive,
  onClick,
}: BurgerBtnProps): ReactElement {
  return (
    <button
      className={`burger-btn ${isActive && 'burger-btn_active'}`}
      onClick={() => onClick()}
      type='button'
    >
      <span className='burger-btn__line' />
      <span className='burger-btn__line' />
      <span className='burger-btn__line' />
    </button>
  );
}
