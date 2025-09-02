import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={`${urbanist.variable} font-sans`}>
      {/* Google Tag Manager (loads after hydration) */}
      {process.env.NEXT_PUBLIC_GTM_ID ? (
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}</Script>
      ) : null}
      <Theme appearance="dark" accentColor="violet" grayColor="mauve" radius="large" scaling="95%">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        {/* Keep footer outside animated container so it stays fixed */}
        <Footer />
      </Theme>
    </div>
  );
}
