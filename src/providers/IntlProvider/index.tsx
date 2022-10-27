import { IntlProvider as IntlProviderComponent } from 'react-intl';
import translations from './translations';

function IntlProvider({ children }: { children: JSX.Element }) {
  const locale = navigator.language;
  const messages = translations[locale];
  return (
    <>
      <IntlProviderComponent messages={messages} locale="en" defaultLocale="en">
        {children}
      </IntlProviderComponent>
    </>
  );
}

export default IntlProvider;
