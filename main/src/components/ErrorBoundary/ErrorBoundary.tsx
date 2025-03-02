import { Component, ReactNode, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

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
    this.setState({ error, errorInfo });
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return (
        fallback || (
          <div className={styles['error-container']}>
            <img
              className={styles['broken-pokeball']}
              src="/assets/img/broken-pokeball.png"
              alt=""
            />

            <h2>Something went wrong.</h2>
            <p>{error?.toString()}</p>
            <button
              className={styles['reset-button']}
              onClick={this.handleClick}
            >
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
