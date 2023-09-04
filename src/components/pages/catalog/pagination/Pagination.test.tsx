import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('renders correctly with multiple pages', () => {
    const onPageChangeMock = jest.fn();
    const { container, getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(
      container.querySelector('.catalog-pagination__prev-page'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.catalog-pagination__next-page'),
    ).toBeInTheDocument();

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();

    expect(getByText('2')).toHaveClass('active');

    const prevButton = container.querySelector(
      '.catalog-pagination__prev-page',
    );
    fireEvent.click(prevButton as Element);
    expect(onPageChangeMock).toHaveBeenCalledWith(0);

    const nextButton = container.querySelector(
      '.catalog-pagination__next-page',
    );
    fireEvent.click(nextButton as Element);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('renders correctly with only one page', () => {
    const onPageChangeMock = jest.fn();
    const { container, queryByText } = render(
      <Pagination
        currentPage={0}
        totalPages={1}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(
      container.querySelector('.catalog-pagination__prev-page'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.catalog-pagination__next-page'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.catalog-pagination__prev-page'),
    ).toBeDisabled();
    expect(
      container.querySelector('.catalog-pagination__next-page'),
    ).toBeDisabled();

    expect(queryByText('1')).toBeInTheDocument();
  });
});
