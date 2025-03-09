import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import PokeLoader from './components/PokeLoader/PokeLoader';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
import { store } from './store';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.png" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokédex by sergiozeppo</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <PokeLoader />;
}

export default function Root() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ThemeProvider>
  );
}
