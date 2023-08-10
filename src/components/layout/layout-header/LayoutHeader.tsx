import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export default function LayoutHeader(): ReactElement {
  return (
    <div>
      <NavLink to='/'>Main</NavLink>
      <NavLink to='/registration'>Registration</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  );
}
