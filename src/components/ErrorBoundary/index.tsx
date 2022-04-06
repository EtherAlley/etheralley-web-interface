import { Component } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Error from '../Error';

type Props = { intl: IntlShape };

type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    const { children, intl } = this.props;
    if (!this.state.hasError) {
      return children;
    }

    return <Error message={intl.formatMessage({ id: 'page-wrapper-error', defaultMessage: 'Unexpected Error' })} />;
  }
}

export default injectIntl(ErrorBoundary);
