/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login', () => {
  it('renders without errors', () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <MemoryRouter>
            <Login />
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
            <Login />
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
});
