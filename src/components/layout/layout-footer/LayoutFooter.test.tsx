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

  it('renders logo', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('rss');
    expect(logo).toBeInTheDocument();
  });

  it('renders correct footer text', () => {
    render(
      <MemoryRouter>
        <LayoutFooter />
      </MemoryRouter>,
    );

    const footerText = screen.getByText('Created by Winners Team 2023');
    expect(footerText).toBeInTheDocument();
  });
});
