import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../logo/Logo';
import Api from '../../../api/api';
import UserBar from './userBar/UserBar';
import './layoutHeader.css';

type LayoutHeaderProps = {
  api: Api;
};

type NavLinkClassesProps = {
  isActive: boolean;
  isPending: boolean;
};

const changeNavLinkClasses = ({
  isActive,
  isPending,
}: NavLinkClassesProps): string => {
  return `nav-link ${isPending ? 'pending' : ''} ${isActive ? 'active' : ''}`;
};

export default function LayoutHeader({ api }: LayoutHeaderProps): ReactElement {
  return (
    <header className='header'>
      <div className='header-container'>
        <NavLink to='/'>
          <Logo color='#10116d' width='150' />
        </NavLink>
        <div className='header-nav'>
          <NavLink to='/' className={changeNavLinkClasses}>
            Main
          </NavLink>
          <NavLink to='/catalog' className={changeNavLinkClasses}>
            Catalog
          </NavLink>
          <NavLink to='/about' className={changeNavLinkClasses}>
            About Us
          </NavLink>
        </div>
        <UserBar api={api} />
      </div>
    </header>
  );
}
