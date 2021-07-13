import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="text-gray-600 body-font border-t border-gray-300">
            <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a className="flex font-medium items-center md:justify-start justify-center text-gray-900">
                        <Image src={"/icons/favicon.svg"} width={64} height={64} alt="" />
                        <span className="ml-3 text-xl">{process.env.NEXT_PUBLIC_STOREFRONT_NAME}</span>
                    </a>
                    <p className="mt-2 text-sm text-gray-500">E-commerce store built in NextJS, TailwindCSS, Directus and Snipcart</p>
                </div>
                <div className="flex-grow flex flex-wrap justify-end md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CONTACT US</h2>
                        <nav className="list-none mb-10">
                            <ul>
                                <li>
                                    <Link href="/contact"><a className="text-gray-600 hover:text-gray-800 hover:underline">Our Location</a></Link>
                                </li>
                                <li>
                                    <Link href="/contact"><a className="text-gray-600 hover:text-gray-800 hover:underline">Get In Touch</a></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">PRODUCTS</h2>
                        <nav className="list-none mb-10">
                            <ul>
                                <li>
                                    <Link href="/products?featured=true"><a className="text-gray-600 hover:text-gray-800 hover:underline">Featured Products</a></Link>
                                </li>
                                <li>
                                    <Link href="/products?sort=-date_created"><a className="text-gray-600 hover:text-gray-800 hover:underline">Recent Additions</a></Link>
                                </li>
                                <li>
                                    <Link href="/products"><a className="text-gray-600 hover:text-gray-800 hover:underline">All Products</a></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© Created by
                        <a href="https://github.com/tohhongxiang123/directus-nextjs" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank"><strong>Toh Hong Xiang</strong></a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a className="text-gray-500" href="https://github.com/tohhongxiang123" rel="noopener noreferrer" target="_blank">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" role="link" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500" href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/" rel="noopener noreferrer" target="_blank">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" role="link" viewBox="0 0 24 24">
                                <title>LinkedIn</title>
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}
