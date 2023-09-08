import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import './layoutFooter.css';

export default function LayoutFooter(): ReactElement {
  return (
    <footer className='footer' data-testid='layout-footer'>
      <div className='footer__container'>
        <div className='footer__authors'>
          <NavLink
            to='https://github.com/danilbogdanov'
            data-testid='danilbogdanov'
          >
            <img
              src='/icons/footer/github.svg'
              height={25}
              alt='danilbogdanov'
            />
          </NavLink>
          <NavLink to='https://github.com/dartster' data-testid='dartster'>
            <img src='/icons/footer/github.svg' height={25} alt='dartster' />
          </NavLink>
          <NavLink
            to='https://github.com/natteskrekkk'
            data-testid='natteskrekkk'
          >
            <img
              src='/icons/footer/github.svg'
              height={25}
              alt='natteskrekkk'
            />
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
