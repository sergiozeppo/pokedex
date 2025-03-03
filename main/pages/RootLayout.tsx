import { ReactNode } from 'react';
import Header from '../src/views/Header/Header';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="container">
        <ErrorBoundary>
          <Header />
          {children}
        </ErrorBoundary>
      </div>
    </>
  );
}
