import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/dm-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/dm-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/dm-180.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="description" content="Danny Mickleburgh: San Francisco full-stack software engineer specializing in React, Typescript, Next.js, AI, web development, and modern software architecture." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
