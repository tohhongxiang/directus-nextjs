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

    const CART = (
        <a className="header__summary snipcart-checkout snipcart-summary px-2 flex items-center gap-4" href="#">
            <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.10512 0.368718C0.560256 0.368718 0.118164 0.812066 0.118164 1.35848C0.118164 1.9049 0.560256 2.34824 1.10512 2.34824H4.90887L8.30138 18.4009C8.43503 19.0053 8.83085 19.5079 9.32946 19.5041H25.7788C26.3005 19.5118 26.7799 19.0375 26.7799 18.5143C26.7799 17.9911 26.3006 17.5168 25.7788 17.5245H10.1315L9.71003 15.545H27.095C27.5371 15.5412 27.9547 15.2048 28.0511 14.7718L30.354 4.87412C30.4825 4.29933 29.9852 3.67172 29.3979 3.66786H7.21171L6.6771 1.15221C6.58329 0.71276 6.15921 0.368652 5.7107 0.368652L1.10512 0.368718ZM7.623 5.64746H12.7634L13.2569 8.61674H8.25005L7.623 5.64746ZM14.7785 5.64746H20.9881L20.4946 8.61674H15.2719L14.7785 5.64746ZM23.0031 5.64746H28.1537L27.4649 8.61674H22.5097L23.0031 5.64746ZM8.67181 10.5963H13.5862L14.0797 13.5656H9.29919L8.67181 10.5963ZM15.6009 10.5963H20.1656L19.6721 13.5656H16.0944L15.6009 10.5963ZM22.1807 10.5963H27.0023L26.3135 13.5656H21.6872L22.1807 10.5963ZM12.6197 20.164C10.8141 20.164 9.32979 21.6525 9.32979 23.4632C9.32979 25.2739 10.8141 26.7624 12.6197 26.7624C14.4252 26.7624 15.9095 25.2739 15.9095 23.4632C15.9095 21.6525 14.4252 20.164 12.6197 20.164ZM22.4892 20.164C20.6837 20.164 19.1994 21.6525 19.1994 23.4632C19.1994 25.2739 20.6837 26.7624 22.4892 26.7624C24.2948 26.7624 25.7791 25.2739 25.7791 23.4632C25.7791 21.6525 24.2948 20.164 22.4892 20.164ZM12.6197 22.1435C13.3586 22.1435 13.9356 22.7222 13.9356 23.4632C13.9356 24.2042 13.3586 24.7829 12.6197 24.7829C11.8807 24.7829 11.3037 24.2042 11.3037 23.4632C11.3037 22.7222 11.8807 22.1435 12.6197 22.1435ZM22.4892 22.1435C23.2282 22.1435 23.8052 22.7222 23.8052 23.4632C23.8052 24.2042 23.2282 24.7829 22.4892 24.7829C21.7503 24.7829 21.1733 24.2042 21.1733 23.4632C21.1733 22.7222 21.7503 22.1435 22.4892 22.1435Z" fill="#F0F0F0" />
            </svg>
            <span className="header__price snipcart-total-price text-gray-300 font-semibold">$0.00</span>
        </a>
    )
    return (
        <nav className="bg-gray-800 relative" ref={navRef}>
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
                                {CART}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative flex items-center" ref={dropDownRef}>
                            {isLoading ? (
                                <p className="text-gray-300">Loading...</p>
                            ) : isLoggedIn ? (
                                <div className="">
                                    <button onClick={() => setIsDropdownOpen(c => !c)} type="button" className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <img className="h-8 w-8 rounded-full" src={user?.image} alt="" />
                                        <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden sm:block">{user?.name}</span>
                                    </button>
                                    {isDropdownOpen && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                        {DROPDOWN_LINKS.map(link => (
                                            <Link href={link.link} key={link.link}><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1}>{link.name}</a></Link>
                                        ))}
                                        <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" role="menuitem" tabIndex={-1} onClick={() => signOut()}>Sign out</a>
                                    </div>}
                                </div>
                            ) : (
                                <button onClick={() => signIn()}><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a></button>
                            )}

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
                    {CART}
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