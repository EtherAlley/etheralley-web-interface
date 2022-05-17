import { createRoot } from 'react-dom/client';
import App from './containers/App';
import { Providers } from './Providers';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Providers>
    <App />
  </Providers>
);
