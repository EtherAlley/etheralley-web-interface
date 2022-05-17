import { Component } from 'react';
import Error from '../Error';

type Props = { children: React.ReactNode };

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
    const { children } = this.props;
    if (!this.state.hasError) {
      return children;
    }

    return <Error />;
  }
}

export default ErrorBoundary;
