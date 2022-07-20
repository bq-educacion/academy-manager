import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/icon.ico" />
      <title>Next</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
