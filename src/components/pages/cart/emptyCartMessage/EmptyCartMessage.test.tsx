import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EmptyCartMessage } from './EmptyCartMessage';

describe('EmptyCartMassage Component', () => {
  it('should render with correct title and paragraph', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCartMessage />
      </MemoryRouter>,
    );

    const titleElement = getByText('Cart is empty');
    const paragraphElement = getByText('Find some cool stuff in');

    expect(titleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });

  it('should render the "Catalog" NavLink', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCartMessage />
      </MemoryRouter>,
    );

    const catalogLinkElement = getByText('Catalog');

    expect(catalogLinkElement).toBeInTheDocument();
  });

  it('should render the empty cart image', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <EmptyCartMessage />
      </MemoryRouter>,
    );

    const emptyCartImageElement = getByAltText('empty cart');

    expect(emptyCartImageElement).toBeInTheDocument();
  });
});
