import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" type="image/png" href="assets/img/favicon.png" />
      <title>pokedex by @sergiozeppo</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}