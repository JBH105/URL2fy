import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta property="og:title" content="URL Master" />
        <meta property="og:image" content="/assets/logo.png" />
        <meta name="og:description" content="This is URL master Web App" />
        <meta name="keywords" content="name,HTML" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
