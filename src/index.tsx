import ReactDOM from 'react-dom';
import App from './containers/App';
import { Providers } from './Providers';

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
