import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from './Registration';
import Api from '../../../api/api';

const mockApi = new Api();
mockApi.auth.login = jest.fn(async () => {
  return { result: true, message: `logged in` };
});

describe('Registration', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <Registration api={mockApi} />
      </MemoryRouter>,
    );
  });
  it('submits the form successfully', () => {
    render(
      <MemoryRouter>
        <Registration api={mockApi} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const nameInput = screen.getByPlaceholderText(/\bname\b/i);
    const surnameInput = screen.getByPlaceholderText(/surname/i);
    const birthdateInput = screen.getByPlaceholderText(/birth/i);
    const streetInput = screen.getAllByPlaceholderText(/street/i);
    const cityInput = screen.getAllByPlaceholderText(/city/i);
    const countrySelect = screen.getAllByPlaceholderText(/country/i);
    const postcodeInput = screen.getAllByPlaceholderText(/postcode/i);
    const signUpButton = screen.getByText('Sign Up');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
    expect(birthdateInput).toBeInTheDocument();
    streetInput.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    cityInput.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    countrySelect.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    postcodeInput.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(signUpButton).toBeInTheDocument();
  });
});
