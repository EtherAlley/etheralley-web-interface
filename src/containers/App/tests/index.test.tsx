import { render } from '../../../tests/test-utils';
import App from '../index';

test('renders highlight message', () => {
  const { getByText } = render(<App />);

  expect(getByText(/Welcome to EtherAlley/i)).toBeInTheDocument();
});
