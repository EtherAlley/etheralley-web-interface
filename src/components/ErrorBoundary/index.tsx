import { Component } from 'react';
import Error from '../Error';

type Props = { message: string; width: number; height: number };

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
    if (!this.state.hasError) {
      return this.props.children;
    }

    return <Error {...this.props} />;
  }
}

export default ErrorBoundary;
