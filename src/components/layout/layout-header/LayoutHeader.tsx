import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../logo/Logo';

export default function LayoutHeader(): ReactElement {
  return (
    <div>
      <NavLink to='/'>
        <Logo color='#000000' />
      </NavLink>
      <NavLink to='/'>Main</NavLink>
      <NavLink to='/registration'>Registration</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  );
}
