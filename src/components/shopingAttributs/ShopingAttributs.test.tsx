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
  it('renders correctly and increments/decrements item counter', () => {
    const { getByText, getByTestId } = render(
      <ShopingAttributs item={MockItem} />,
    );

    const counter = getByTestId('counter-data');
    expect(counter.textContent).toBe('0');

    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    expect(counter.textContent).toBe('1');

    const decrementButton = getByText('–');
    fireEvent.click(decrementButton);
    expect(counter.textContent).toBe('0');
  });

  it('toggles "active" class on basket button when clicked', () => {
    const { getByTestId } = render(<ShopingAttributs item={MockItem} />);

    const basketButton = getByTestId('basket');
    expect(basketButton).not.toHaveClass('active');

    fireEvent.click(basketButton);
    expect(basketButton).toHaveClass('active');

    fireEvent.click(basketButton);
    expect(basketButton).not.toHaveClass('active');
  });
});
