import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
  });

  it('renders LayoutHeader component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const headerComponent = getByTestId('layout-header');
    expect(headerComponent).toBeInTheDocument();
  });

  it('renders Outlet component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const outletComponent = getByTestId('outlet');
    expect(outletComponent).toBeInTheDocument();
  });

  it('renders LayoutFooter component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const footerComponent = getByTestId('layout-footer');
    expect(footerComponent).toBeInTheDocument();
  });
});
