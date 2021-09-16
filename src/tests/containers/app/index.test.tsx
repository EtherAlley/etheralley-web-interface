import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import App from '../../../containers/app';
import { HashRouter as Router } from 'react-router-dom';

test('renders highlight message', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/Ether/i)).toBeInTheDocument();
});
