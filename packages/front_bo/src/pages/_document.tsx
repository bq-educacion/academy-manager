import { baseStyles } from "@academy-manager/ui";
import { ApolloProvider } from "@apollo/client";
import { Global } from "@emotion/react";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { client } from "../apollo/client";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Global styles={baseStyles} />
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ApolloProvider client={client}>
          <body>
            <Main />
            <NextScript />
          </body>
        </ApolloProvider>
      </Html>
    );
  }
}
