import React from 'react';
// import { Provider } from 'react-redux';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
// import { ThemeProvider } from './context/ThemeProvider';
// import { store } from './store';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
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

export default function Root() {
  return (
    // <ThemeProvider>
    //   <Provider store={store}>
    <Outlet />
    // </Provider>
    // </ThemeProvider>
  );
}
