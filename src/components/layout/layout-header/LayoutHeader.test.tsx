import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';

describe('LayoutHeader', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <LayoutHeader />
      </MemoryRouter>,
    );

    const headerElement = screen.getByTestId('layout-header');
    expect(headerElement).toBeInTheDocument();
  });

  it('marks the active link as active', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <LayoutHeader />
      </MemoryRouter>,
    );

    const activeLink = screen.getByText('About Us');
    expect(activeLink).toHaveClass('nav-bar__link nav-bar__link_active');
  });

  it('applies appropriate classes to links', () => {
    render(
      <MemoryRouter>
        <LayoutHeader />
      </MemoryRouter>,
    );

    const mainLink = screen.getByText('Main');
    expect(mainLink).toHaveClass('nav-bar__link');

    const catalogLink = screen.getByText('Catalog');
    expect(catalogLink).toHaveClass('nav-bar__link');

    const aboutLink = screen.getByText('About Us');
    expect(aboutLink).toHaveClass('nav-bar__link');
  });
});
