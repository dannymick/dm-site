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
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        ) : null}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
