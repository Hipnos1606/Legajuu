import { NextUIProvider } from '@nextui-org/react';
import { UserProvider } from '../components/context/userContext';
import { DirectoriesProvider } from '../components/context/directoriesContext';

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
