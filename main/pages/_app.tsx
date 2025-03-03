import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import '../styles/global.css';
import { ThemeProvider } from '../src/context/ThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
