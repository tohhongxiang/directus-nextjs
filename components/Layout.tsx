import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

interface LayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string,
    children: React.ReactNode | React.ReactNodeArray,
    enableFooter?: boolean
    seoTags?: {
        'og:title'?: string,
        'og:description'?: string,
        'og:url'?: string,
        'og:image'?: string,
        'og:type'?: string,
        [key: string]: string
    }
}

export default function Layout({ children, title = '', enableFooter = true, seoTags = {} as any, ...props }: LayoutProps) {
    return (
        <div {...props} className="flex flex-col h-screen overflow-hidden">
            <Head>
                <title>{title ? `${title} - ${process.env.NEXT_PUBLIC_STOREFRONT_NAME}` : `${process.env.NEXT_PUBLIC_STOREFRONT_NAME}`}</title>
                {Object.entries(seoTags).map(([property, content]) => <meta key={property} property={property} content={content} />)}
                <link rel="preconnect" href="https://app.snipcart.com"></link>
                <link rel="preconnect" href="https://cdn.snipcart.com"></link>
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
                <script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
            </Head>
            <Navbar />
            <main className="h-full overflow-y-auto">
                {children}
                {enableFooter && <Footer />}
            </main>
        </div>
    )
}
