import 'tailwindcss/tailwind.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from 'react'
import SnipcartContextProvider from '../context/SnipcartContext';

export default function App({ Component, pageProps }) {
  return (
    <SnipcartContextProvider>
      <Component {...pageProps} />
    </SnipcartContextProvider>
  )
}