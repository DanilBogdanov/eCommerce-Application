import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs Component', () => {
  it('renders breadcrumbs correctly', () => {
    const locationArray = ['Home', 'Category', 'Product'];

    const { container, getByText } = render(
      <MemoryRouter>
        <Breadcrumbs locationArray={locationArray} />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('Product')).toBeInTheDocument();

    const separators = container.querySelectorAll('.breadcrumbs-link');
    expect(separators.length).toBe(2);

    const currentPosition = getByText('Product');
    expect(currentPosition).toHaveClass('breadcrumbs-current-position');

    const links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/Home');
    expect(links[1]).toHaveAttribute('href', '/Home/Category');
  });

  it('renders breadcrumbs correctly when locationArray is null', () => {
    const { container, queryByText } = render(
      <MemoryRouter>
        <Breadcrumbs locationArray={null} />
      </MemoryRouter>,
    );

    expect(queryByText('Home')).not.toBeInTheDocument();
    expect(queryByText('Category')).not.toBeInTheDocument();
    expect(queryByText('Product')).not.toBeInTheDocument();

    const separators = container.querySelectorAll('.breadcrumbs-link');
    expect(separators.length).toBe(0);
  });
});
