import "../index.css";
import type { AppProps } from "next/app";
import { LangContextProvider } from "../utils/hooks";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LangContextProvider>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/comma.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Générateur de citations aléatoires. Générez aléatoirement des citations inspirantes et partagez les direcrement sur twitter."
        />
        <title>Random quotes</title>
      </Head>
      <Component {...pageProps} />;
    </LangContextProvider>
  );
}

export default MyApp;
