import 'tailwindcss/tailwind.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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