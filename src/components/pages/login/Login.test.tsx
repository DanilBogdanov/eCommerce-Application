/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';
import Api from '../../../api/api';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  const mockApi = new Api();
  mockApi.auth.login = jest.fn(async () => {
    return { result: true, message: `logged in` };
  });

  it('renders without errors', () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <MemoryRouter>
            <Login api={mockApi} />
          </MemoryRouter>
        </FormProvider>
      );
    }

    render(<TestComponent />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const showPasswordButton = screen.getByText('Show Password');
    const signInButton = screen.getByText('Sign In');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(showPasswordButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <MemoryRouter>
            <Login api={mockApi} />
          </MemoryRouter>
        </FormProvider>
      );
    }

    render(<TestComponent />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const showPasswordButton = screen.getByText('Show Password');

    expect(passwordInput.getAttribute('type')).toBe('password');
    fireEvent.click(showPasswordButton);
    expect(passwordInput.getAttribute('type')).toBe('text');
    fireEvent.click(showPasswordButton);
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  it('submits the form successfully', async () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <MemoryRouter>
            <Login api={mockApi} />
          </MemoryRouter>
        </FormProvider>
      );
    }

    render(<TestComponent />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signInButton = screen.getByText('Sign In');

    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    await act(async () => {
      fireEvent.click(signInButton);
      await Promise.resolve();
    });
    expect(mockApi.auth.login).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
