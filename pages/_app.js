import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from '../context/globalState';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
    </ContextProvider>
  );
}

export default MyApp
