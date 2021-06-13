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
        <div {...props} className="flex flex-col h-screen overflow-y-hidden">
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <main className="h-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}
