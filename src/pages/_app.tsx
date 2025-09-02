import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Urbanist } from 'next/font/google';
import Footer from '@/components/Footer';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={`${urbanist.variable} font-sans`}>
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
