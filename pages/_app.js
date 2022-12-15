import { NextUIProvider } from '@nextui-org/react';
import { UserProvider } from '../components/context/userContext';
import { initializeApp } from 'firebase/app';
import fbConfig from '../res/firebase/config';
import { DirectoriesProvider } from '../components/context/directoriesContext';

initializeApp(fbConfig);

function MyApp({ Component, pageProps }) {

  return (
    <NextUIProvider>
      <DirectoriesProvider>
          <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </DirectoriesProvider> 
    </NextUIProvider>
  )
}

export default MyApp
