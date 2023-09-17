import { render } from '@testing-library/react';
import App from './About';

describe('<App />', () => {
  it('should render without errors', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
