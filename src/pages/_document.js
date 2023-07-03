import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <meta name="theme-color" content="#000000" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="URL Master" />
        <meta property="og:image" content="/assets/logo.png" />
        <meta name="og:description" content="This is URL master Web App" />
        <meta name="keywords" content="name,HTML" />
        <style>
          {`
          img.og-image {
            width: 300px; 
            height: auto;
            border: 2px solid black; 
          }
          `}
        </style>
      </Head>
      <body>
        <img className="og-image" src="/assets/logo.png" alt="Logo" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
