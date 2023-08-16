import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';
import Api from '../../api/api';
import './layout.css';

type LayoutProps = {
  api: Api;
};

export default function Layout({ api }: LayoutProps): ReactElement {
  return (
    <div className='layout_container'>
      <LayoutHeader api={api} />
      <Outlet />
      <LayoutFooter />
    </div>
  );
}
