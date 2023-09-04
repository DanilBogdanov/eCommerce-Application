import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import './layoutFooter.css';

export default function LayoutFooter(): ReactElement {
  return (
    <footer className='footer' data-testid='layout-footer'>
      <div className='footer__container'>
        <div className='footer__authors'>
          <NavLink to='https://github.com/danilbogdanov'>
            <img src='/icons/footer/github.svg' height={25} alt='user' />
          </NavLink>
          <NavLink to='https://github.com/dartster'>
            <img src='/icons/footer/github.svg' height={25} alt='user' />
          </NavLink>
          <NavLink to='https://github.com/natteskrekkk'>
            <img src='/icons/footer/github.svg' height={25} alt='user' />
          </NavLink>
        </div>
        <p className='footer__info'>Created by Winners Team 2023</p>
        <NavLink to='https://rs.school/'>
          <img src='/icons/footer/rss.svg' height={35} alt='rss' />
        </NavLink>
      </div>
    </footer>
  );
}
