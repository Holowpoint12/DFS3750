import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { initializeBrowserTools } from '@/utils/browser-tools';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize browser tools on client-side only
    if (typeof window !== 'undefined') {
      initializeBrowserTools().then((success) => {
        if (!success) {
          console.log('Browser tools initialization failed, app will function without advanced debugging');
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>HoopStack - Fantasy Sports Social Platform</title>
        <meta name="description" content="Play fantasy sports with friends, join clans, and enjoy the social experience without monetary stakes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 