import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '@radix-ui/themes/styles.css';
import '@/styles/globals.css';
import { Theme } from '@radix-ui/themes';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={`${urbanist.variable} font-sans`}>
      {/* Google tag (gtag.js) */}
      <Script
        id="ga-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-788FE357V4'}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} 
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-788FE357V4'}');
      `}</Script>
      <Theme
        className={urbanist.className}
        appearance="dark"
        accentColor="violet"
        grayColor="mauve"
        radius="large"
        scaling="95%"
      >
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
