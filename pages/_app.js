import { NextUIProvider } from '@nextui-org/react';
import { DirectoriesProvider } from '../components/context/directoriesContext';

function MyApp({ Component, pageProps }) {

  return (
    <NextUIProvider>
      <DirectoriesProvider>
        <Component {...pageProps} />
      </DirectoriesProvider>
    </NextUIProvider>
  )
}

export default MyApp
