import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import '../styles/global.css';
import { ThemeProvider } from '../src/context/ThemeProvider';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>pokedex by @sergiozeppo</title>
      </Head>
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
