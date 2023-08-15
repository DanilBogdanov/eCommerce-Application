import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';

export default function Layout(): ReactElement {
  return (
    <div className='layout_container'>
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </div>
  );
}
