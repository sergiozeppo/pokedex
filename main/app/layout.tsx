import type { Metadata } from 'next';
import '../styles/global.css';
import { Providers } from './providers';
import Header from '../src/views/Header/Header';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../src/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'pokedex by @sergiozeppo',
  description:
    'React, Typescript, React Router, Next.js (Pages API / Router API), Vitest',
  icons: {
    icon: 'assets/img/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            <div className="container">
              <ErrorBoundary>
                <Header />
                {children}
              </ErrorBoundary>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
