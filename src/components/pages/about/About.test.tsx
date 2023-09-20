import { render } from '@testing-library/react';
import About from './About';

describe('AboutUs component', () => {
  it('should render the component without errors', () => {
    const { container } = render(<About />);
    expect(container).toBeTruthy();
  });

  it('should display the "About Us" section', () => {
    const { getByText } = render(<About />);
    const aboutUsHeader = getByText('About Us');
    expect(aboutUsHeader).toBeInTheDocument();
  });

  it('should display the "Our thanks" section', () => {
    const { getByText } = render(<About />);
    const ourThanksHeader = getByText('Our thanks');
    expect(ourThanksHeader).toBeInTheDocument();
  });

  it('should display RSSchool and RollingScopes logos', () => {
    const { getAllByAltText } = render(<About />);
    const rsschoolLogo = getAllByAltText('RSSchool logo');
    const rsLogo = getAllByAltText('RolingScopes logo');

    expect(rsschoolLogo).toHaveLength(1);
    expect(rsLogo).toHaveLength(1);
  });
});
