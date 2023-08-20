import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LayoutFooter from './LayoutFooter';

describe('LayoutFooter', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const footer = screen.getByTestId('layout-footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders correct navigation links', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const mainLink = screen.getByText('Main');
    const catalogLink = screen.getByText('Catalog');
    const aboutUsLink = screen.getByText('AboutUs');

    expect(mainLink).toBeInTheDocument();
    expect(catalogLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders correct footer text', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const footerText = screen.getByText('Create by Winners Team');
    expect(footerText).toBeInTheDocument();
  });
});
