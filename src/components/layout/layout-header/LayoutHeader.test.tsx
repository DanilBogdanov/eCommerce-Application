import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import Api from '../../../api/api';

describe('LayoutHeader', () => {
  it('renders without errors', () => {
    const mockApi = new Api();
    render(
      <MemoryRouter>
        <LayoutHeader api={mockApi} />
      </MemoryRouter>,
    );

    const headerElement = screen.getByTestId('layout-header');
    expect(headerElement).toBeInTheDocument();
  });

  it('marks the active link as active', () => {
    const mockApi = new Api();
    render(
      <MemoryRouter initialEntries={['/about']}>
        <LayoutHeader api={mockApi} />
      </MemoryRouter>,
    );

    const activeLink = screen.getByText('About Us');
    expect(activeLink).toHaveClass('active');
  });

  it('applies appropriate classes to links', () => {
    const mockApi = new Api();
    render(
      <MemoryRouter>
        <LayoutHeader api={mockApi} />
      </MemoryRouter>,
    );

    const mainLink = screen.getByText('Main');
    expect(mainLink).toHaveClass('nav-link');

    const catalogLink = screen.getByText('Catalog');
    expect(catalogLink).toHaveClass('nav-link');

    const aboutLink = screen.getByText('About Us');
    expect(aboutLink).toHaveClass('nav-link');
  });
});
