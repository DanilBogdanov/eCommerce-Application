import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import Api from '../../api/api';

describe('Layout component', () => {
  const mockApi = new Api();

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Layout api={mockApi} />
      </MemoryRouter>,
    );
  });

  it('renders LayoutHeader component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout api={mockApi} />
      </MemoryRouter>,
    );
    const headerComponent = getByTestId('layout-header');
    expect(headerComponent).toBeInTheDocument();
  });

  it('renders Outlet component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout api={mockApi} />
      </MemoryRouter>,
    );
    const outletComponent = getByTestId('outlet');
    expect(outletComponent).toBeInTheDocument();
  });

  it('renders LayoutFooter component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Layout api={mockApi} />
      </MemoryRouter>,
    );
    const footerComponent = getByTestId('layout-footer');
    expect(footerComponent).toBeInTheDocument();
  });
});
