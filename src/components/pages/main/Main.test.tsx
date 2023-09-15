import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './Main';

test('renders Main component', () => {
  render(<Main />);

  expect(screen.getByText('Main')).toBeInTheDocument();
});
