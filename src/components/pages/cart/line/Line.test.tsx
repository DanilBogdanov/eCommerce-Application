import { render, fireEvent } from '@testing-library/react';
import { Line } from './Line';
import { LineItem } from '../../../../types/api';

const mockLine: LineItem = {
  id: 'lineId',
  name: { 'en-US': 'Product Name' },
  variant: {
    images: [{ url: 'image_url', label: 'Image Label' }],
    attributes: [{ name: 'author', value: 'Author Name' }],
  },
  price: { value: { centAmount: 1000 } },
  discountedPrice: undefined,
  quantity: 2,
  totalPrice: { centAmount: 2000 },
  productId: '2sdfsdf23423',
  productKey: 'sdfsfd23324sedfr',
};

const MockChangeQuantity = (id: string, quantity: number) => {
  mockLine.id = id;
  mockLine.quantity = quantity;
  return Promise.resolve();
};

const MockremoveLine = (id: string) => {
  mockLine.id = id;
  return Promise.resolve();
};

describe('Line component', () => {
  it('should render the component without errors', () => {
    const { container } = render(
      <Line
        line={mockLine}
        index={0}
        changeQuantity={MockChangeQuantity}
        removeLine={MockremoveLine}
      />,
    );
    expect(container).toBeTruthy();
  });

  it('should call removeLine when "remove" button is clicked', () => {
    const removeLineMock = jest.fn();
    const { getByText } = render(
      <Line
        line={mockLine}
        index={0}
        changeQuantity={MockChangeQuantity}
        removeLine={removeLineMock}
      />,
    );

    const removeButton = getByText('remove');

    fireEvent.click(removeButton);

    expect(removeLineMock).toHaveBeenCalledTimes(1);
    expect(removeLineMock).toHaveBeenCalledWith('lineId');
  });
});
