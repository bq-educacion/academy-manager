import { TranslateProvider } from "@academy-manager/ui";
import type { AppProps } from "next/app";
import Head from "next/head";
import messages from "../messages";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="/icon.ico" />
      <title>Next</title>
    </Head>
    <TranslateProvider
      defaultMessages={messages["es"]}
      messages={messages["es"]}
    >
      <Component {...pageProps} />
    </TranslateProvider>
  </>
);

export default MyApp;
