import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserBar from './UserBar';
import Api from '../../../../api/api';

describe('UserBar', () => {
  it('renders without errors', () => {
    const mockApi = new Api();

    render(
      <MemoryRouter>
        <UserBar api={mockApi} />
      </MemoryRouter>,
    );

    const userBarElement = screen.getByTestId('user-bar');
    expect(userBarElement).toBeInTheDocument();
  });

  it('renders login and signup buttons for anonymous user', () => {
    const mockApi = new Api();
    mockApi.user.isAnonymous = () => true;

    render(
      <MemoryRouter>
        <UserBar api={mockApi} />
      </MemoryRouter>,
    );

    const loginButton = screen.getByText('LogIn');
    const signupButton = screen.getByText('LogUp');
    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('renders logout button for authenticated user', () => {
    const mockApi = new Api();
    mockApi.user.isAnonymous = () => false;

    render(
      <MemoryRouter>
        <UserBar api={mockApi} />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByText('LogOut');
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls logout function on clicking logout button', async () => {
    const mockApi = new Api();
    mockApi.user.isAnonymous = jest.fn(() => false);
    const logoutSpy = jest.spyOn(mockApi.auth, 'logout');

    render(
      <MemoryRouter>
        <UserBar api={mockApi} />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByText('LogOut');
    fireEvent.click(logoutButton);

    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
