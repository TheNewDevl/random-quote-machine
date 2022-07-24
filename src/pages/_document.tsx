// In _document.js
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="fr">
      <Head />

      <body>
        <Main />
        <NextScript />
        <Script
          src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
