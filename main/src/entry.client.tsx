import React from 'react';
import ReactDOM from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import './index.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
import { store } from './store';

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <HydratedRouter />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
