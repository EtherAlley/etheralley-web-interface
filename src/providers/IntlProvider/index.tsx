import { ReactChild } from 'react';
import { IntlProvider as IntlProviderComponent } from 'react-intl';
import translations from './translations';

function IntlProvider({ children }: { children: ReactChild }) {
  const locale = navigator.language;
  const messages = translations[locale];

  console.log(locale);

  return (
    <IntlProviderComponent messages={messages} locale="en" defaultLocale="en">
      {children}
    </IntlProviderComponent>
  );
}

export default IntlProvider;
