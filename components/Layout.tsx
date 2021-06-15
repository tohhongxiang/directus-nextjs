import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

interface LayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string,
    children: React.ReactNode | React.ReactNodeArray
}

export default function Layout({ children, title = 'ShopName', ...props }: LayoutProps) {
    return (
        <div {...props} className="flex flex-col min-h-screen">
            <Head>
                <title>{title}</title>
                <link rel="preconnect" href="https://app.snipcart.com"></link>
                <link rel="preconnect" href="https://cdn.snipcart.com"></link>
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
                <script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
            </Head>
                <Navbar />
                <div hidden id="snipcart" data-api-key={process.env.SNIPCART_KEY} data-config-modal-style="side"></div>
                <main className="h-full">
                    {children}
                </main>
                <Footer />
        </div>
            )
}
