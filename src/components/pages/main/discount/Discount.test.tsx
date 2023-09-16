import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Discount from './Discount';

describe('Discount Component', () => {
  it('Intro section', () => {
    render(
      <MemoryRouter>
        <Discount title='test-title' percent={123} code='test-code' />
      </MemoryRouter>,
    );

    const title = screen.getByText('test-title');
    expect(title).toBeInTheDocument();

    const percent = screen.getByText('123%');
    expect(percent).toBeInTheDocument();

    const code = screen.getByText('code: test-code');
    expect(code).toBeInTheDocument();
  });
});
