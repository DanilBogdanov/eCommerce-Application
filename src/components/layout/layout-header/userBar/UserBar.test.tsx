import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserBar from './UserBar';

describe('UserBar', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <UserBar />
      </MemoryRouter>,
    );

    const userBarElement = screen.getByTestId('user-bar');
    expect(userBarElement).toBeInTheDocument();
  });

  it('renders login and signup buttons for anonymous user', () => {
    render(
      <MemoryRouter>
        <UserBar />
      </MemoryRouter>,
    );

    const loginButton = screen.getByText('LogIn');
    const signupButton = screen.getByText('LogUp');
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});
