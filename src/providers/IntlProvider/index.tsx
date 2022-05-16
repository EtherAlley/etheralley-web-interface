import { IntlProvider as IntlProviderComponent } from 'react-intl';
import translations from './translations';

function IntlProvider({ children }: { children: any }) {
  const locale = navigator.language;
  const messages = translations[locale];
  const AnyIntlProvider = IntlProviderComponent as any; // TODO: Something to do with lacking support for new React 18 type changes?
  return (
    <>
      <AnyIntlProvider messages={messages} locale="en" defaultLocale="en">
        {children}
      </AnyIntlProvider>
    </>
  );
}

export default IntlProvider;
