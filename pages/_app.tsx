import 'tailwindcss/tailwind.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from 'react'
import SnipcartContextProvider from '../context/SnipcartContext';
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	return (
		<SnipcartContextProvider>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="E-commerce store built with NextJS, Directus and SnipCart" />
			</Head>
			<Component {...pageProps} />
		</SnipcartContextProvider>
	)
}