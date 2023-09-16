import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main Page', () => {
  it('Intro section', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const intro = screen.getByTestId('intro');
    expect(intro).toBeInTheDocument();

    const introImg = screen.getByTestId('intro-img');
    expect(introImg).toBeInTheDocument();

    const title = screen.getByTestId('home-title');
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByTestId('home-subtitle');
    expect(subtitle).toBeInTheDocument();
  });

  it('Discount section', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    const discounts = screen.getByTestId('discounts');
    expect(discounts).toBeInTheDocument();
  });
});
