import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Registration from './Registration';

test('renders Registration component', () => {
  render(<Registration />);

  const registrationElement = screen.getByText('Registration');

  expect(registrationElement).toBeInTheDocument();
});
