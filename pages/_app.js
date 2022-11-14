import { NextUIProvider } from '@nextui-org/react';
import { initializeApp } from 'firebase/app';
import fbConfig from '../res/firebase/config';

initializeApp(fbConfig);

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
