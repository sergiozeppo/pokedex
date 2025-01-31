import { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      console.log('ErrorBoundary: Rendering fallback UI');
    }

    if (hasError) {
      return (
        fallback || (
          <div className="error-container">
            <h2>Something went wrong.</h2>
            <p>{error?.toString()}</p>
            <button className="reset-button" onClick={this.handleClick}>
              Try again
            </button>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
