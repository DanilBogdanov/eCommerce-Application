import { render, fireEvent } from '@testing-library/react';
import { ShopingAttributs } from './ShopingAttributs';

const MockItem = {
  id: 'id',
  key: 'key',
  name: 'string',
  description: 'string',
  categoryId: 'string',
  attributes: [
    {
      name: 'string',
      value: 'string',
    },
  ],
  imagesUrl: ['url1', 'url2'],
  price: 10,
  salePrice: null,
};

describe('ShopingAttributs Component', () => {
  it('toggles "active" class on basket button when clicked', () => {
    const { getByTestId } = render(
      <ShopingAttributs item={MockItem} itemInCart={false} />,
    );

    const basketButton = getByTestId('basket');
    expect(basketButton).not.toHaveClass('active');

    fireEvent.click(basketButton);
    expect(basketButton).toHaveClass('active');

    fireEvent.click(basketButton);
    expect(basketButton).not.toHaveClass('active');
  });
});
