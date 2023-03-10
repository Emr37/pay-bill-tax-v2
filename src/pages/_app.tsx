//import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import WalletContextProvider from '../context/WalletContextProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

require('../styles/globals.css');





export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

 
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        
        <Header/>
        <Component {...pageProps} />
        <Footer/>
        
      </WalletContextProvider>
    </ChakraProvider>
  );
}
}
