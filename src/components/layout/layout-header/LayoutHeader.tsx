import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../logo/Logo';
import Api from '../../../api/api';
import UserBar from './userBar/UserBar';
import './layoutHeader.css';

type LayoutHeaderProps = {
  api: Api;
};

export default function LayoutHeader({ api }: LayoutHeaderProps): ReactElement {
  return (
    <header className='header'>
      <div className='header-container'>
        <NavLink to='/'>
          <Logo color='#1edaab' />
        </NavLink>
        <NavLink to='/'>Main</NavLink>
        <NavLink to='/catalog'>Catalog</NavLink>
        <NavLink to='/about'>AboutUs</NavLink>
        <UserBar api={api} />
      </div>
    </header>
  );
}
