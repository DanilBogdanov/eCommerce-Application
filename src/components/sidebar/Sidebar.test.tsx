import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const mockCategories = {
  isSuccessful: true,
  message: 'Categories retrieved successfully',
  data: [
    {
      id: '1',
      key: 'category1',
      name: 'Category1',
      description: 'Description for Category 1',
    },
    {
      id: '2',
      key: 'category2',
      name: 'Category2',
      description: 'Description for Category 2',
    },
  ],
};

describe('Sidebar Component', () => {
  it('renders correctly with categories', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <Sidebar categories={mockCategories} />
      </MemoryRouter>,
    );

    const category1Link = getByText('Category1');
    expect(category1Link).toBeInTheDocument();
    expect(category1Link.getAttribute('href')).toBe('/catalog/category1');

    const category2Link = getByText('Category2');
    expect(category2Link).toBeInTheDocument();
    expect(category2Link.getAttribute('href')).toBe('/catalog/category2');

    const links = container.querySelectorAll('.sidebar__link');
    links.forEach((link) => {
      expect(link).not.toHaveClass('sidebar__link_active');
    });

    expect(container.querySelector('.sidebar__underline')).toBeInTheDocument();
  });

  it('renders correctly with no categories', () => {
    const { container, queryByText } = render(
      <MemoryRouter>
        <Sidebar categories={null} />
      </MemoryRouter>,
    );

    expect(queryByText('Category1')).not.toBeInTheDocument();
    expect(queryByText('Category2')).not.toBeInTheDocument();

    expect(container.querySelector('.sidebar__underline')).toBeInTheDocument();
  });
});
