import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

test('renders Login component', () => {
  render(<Login />);

  const loginElement = screen.getByText('Login');

  expect(loginElement).toBeInTheDocument();
});
