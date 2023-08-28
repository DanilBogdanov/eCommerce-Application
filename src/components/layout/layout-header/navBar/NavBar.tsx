import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkClassesProps } from '../../../../types/layout';

import './navBar.css';

export default function NavBar(): ReactElement {
  const changeNavLinkClasses = ({ isActive }: NavLinkClassesProps): string => {
    return `nav-bar__link ${isActive ? 'nav-bar__link_active' : ''}`;
  };

  return (
    <nav className='nav-bar'>
      <NavLink to='/' className={changeNavLinkClasses}>
        Main
      </NavLink>
      <NavLink to='/catalog' className={changeNavLinkClasses}>
        Catalog
      </NavLink>
      <NavLink to='/about' className={changeNavLinkClasses}>
        About Us
      </NavLink>
    </nav>
  );
}
