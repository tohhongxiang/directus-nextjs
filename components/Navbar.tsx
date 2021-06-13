import { useSession, signOut, signIn } from 'next-auth/client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const PRIVATE_LINKS = [
]

const PUBLIC_LINKS = [
    {
        name: 'All Products',
        link: '/products'
    },
    {
        name: 'About',
        link: '/about'
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

    const [session, isLoading] = useSession();
    const router = useRouter()

    const isLoggedIn = session !== null
    const user = session?.user
    return (
        <nav className="bg-gray-800" ref={navRef}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                            <Link href="/"><a><strong className="text-xl font-bold text-white">Seshuri</strong></a></Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
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
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative" ref={dropDownRef}>
                            {isLoading ? (
                                <p className="text-gray-300">Loading...</p>
                            ) : isLoggedIn ? (
                                <>
                                    <button onClick={() => setIsDropdownOpen(c => !c)} type="button" className="bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <img className="h-8 w-8 rounded-full" src={user?.image} alt="" />
                                        <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden sm:block">{user?.name}</span>
                                    </button>
                                    {isDropdownOpen && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                        {DROPDOWN_LINKS.map(link => (
                                            <Link href={link.link} key={link.link}><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>{link.name}</a></Link>
                                        ))}
                                        <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" role="menuitem" tabIndex={-1} onClick={() => signOut()}>Sign out</a>
                                    </div>}
                                </>
                            ) : (
                                <button onClick={() => signIn()}><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a></button>
                            )}
                            <div>

                            </div>
                        </div>
                    </div>
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
                </div>
            </div>
        </nav>
    )
}

function useOnClickOutside(ref: React.MutableRefObject<any>, handler: (event: MouseEvent | TouchEvent) => void) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}