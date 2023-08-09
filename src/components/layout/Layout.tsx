import { ReactElement } from 'react';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';

export default function Layout(): ReactElement {
  return (
    <>
      <LayoutHeader />
      Main
      <LayoutFooter />
    </>
  );
}
