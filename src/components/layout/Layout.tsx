import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';
import Api from '../../api/api';

type LayoutProps = {
  api: Api;
};

export default function Layout({ api }: LayoutProps): ReactElement {
  return (
    <>
      <LayoutHeader api={api} />
      <Outlet />
      <LayoutFooter />
    </>
  );
}
