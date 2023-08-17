import { ReactElement } from 'react';
import './layoutFooter.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../logo/Logo';

type NavLinkClassesProps = {
  isActive: boolean;
  isPending: boolean;
};

const changeNavLinkClasses = ({
  isActive,
  isPending,
}: NavLinkClassesProps): string => {
  return `footer-link ${isPending ? 'pending' : ''} ${
    isActive ? 'active' : ''
  }`;
};

export default function LayoutFooter(): ReactElement {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <NavLink to='/'>
          <Logo color='#ffffff' width='100' />
        </NavLink>
        <NavLink to='/' className={changeNavLinkClasses}>
          Main
        </NavLink>
        <NavLink to='/catalog' className={changeNavLinkClasses}>
          Catalog
        </NavLink>
        <NavLink to='/about' className={changeNavLinkClasses}>
          AboutUs
        </NavLink>
        <div>Create by Winners Team</div>
      </div>
    </footer>
  );
}
