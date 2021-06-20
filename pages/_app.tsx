import 'tailwindcss/tailwind.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from 'next-auth/client'
import React from 'react'
import SnipcartContextProvider from '../context/SnipcartContext';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <SnipcartContextProvider>
          <Component {...pageProps} />
      </SnipcartContextProvider>
    </Provider>
  )
}