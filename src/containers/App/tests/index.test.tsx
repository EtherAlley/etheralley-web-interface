import '@testing-library/jest-dom';
import { render, waitFor } from '../../../tests/test-utils';
import App from '../index';

test('renders highlight message', async () => {
  const { getByText } = render(<App />);

  await waitFor(() => expect(getByText(/Welcome to EtherAlley/i)).toBeInTheDocument());
});
