import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useOnClickOutside } from '../hooks'
import DisplayCart from './DisplayCart'
import { useContext } from 'react'
import { SnipcartContext } from '../context/SnipcartContext'

const PRIVATE_LINKS = [
]

const PUBLIC_LINKS = [
    {
        name: 'Products',
        link: '/products'
    },
    {
        name: 'Contact',
        link: '/contact'
    },
]

const DROPDOWN_LINKS = [
    {
        name: 'Checkout',
        link: '/checkout'
    },
    {
        name: "Your Profile",
        link: '/profile'
    }
]

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    useOnClickOutside(navRef, () => setIsNavbarOpen(false))

    const dropDownRef = useRef<HTMLDivElement>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    useOnClickOutside(dropDownRef, () => setIsDropdownOpen(false))

    const router = useRouter()

    const { customer } = useContext(SnipcartContext)
    const isLoggedIn = customer !== null
    return (
        <nav className="bg-gray-800 relative" ref={navRef}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={() => setIsNavbarOpen(c => !c)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded={isNavbarOpen ? "true" : "false"}>
                            <span className="sr-only">Open main menu</span>
                            {!isNavbarOpen ? (<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>)}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/"><a><strong className="text-xl font-bold text-white">Lorem</strong></a></Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4 items-center">
                                {isLoggedIn && PRIVATE_LINKS.map(link => (
                                    <Link href={link.link} key={link.link}>
                                        <a
                                            className={`
                                        ${router.asPath === link.link ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} 
                                        px-3 py-2 rounded-md text-sm font-medium`}
                                        >
                                            {link.name}
                                        </a>
                                    </Link>
                                ))}
                                {PUBLIC_LINKS.map(link => (
                                    <Link href={link.link} key={link.link}>
                                        <a
                                            className={`
                                        ${router.asPath === link.link ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} 
                                        px-3 py-2 rounded-md text-sm font-medium`}
                                        >
                                            {link.name}
                                        </a>
                                    </Link>
                                ))}
                                <DisplayCart />
                            </div>
                        </div>
                    </div>
                    <button className="snipcart-customer-signin text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{customer ? customer.billingAddress.fullName : "Login"}</button>
                </div>
            </div>
            <div className={`${isNavbarOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {isLoggedIn && PRIVATE_LINKS.map(link => (
                        <Link href={link.link} key={link.link}>
                            <a
                                className={`
                                        ${router.asPath === link.link ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} 
                                        block px-3 py-2 rounded-md text-base font-medium`}
                            >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                    {PUBLIC_LINKS.map(link => (
                        <Link href={link.link} key={link.link}>
                            <a
                                className={`
                                        ${router.asPath === link.link ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} 
                                        block px-3 py-2 rounded-md text-base font-medium`}
                            >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                    <DisplayCart />
                </div>
            </div>
        </nav>
    )
}