import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

test('renders highlight message', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Ether/i)).toBeInTheDocument();
});
