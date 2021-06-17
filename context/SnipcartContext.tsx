// https://docs.snipcart.com/v3/sdk/api

import { createContext, useEffect, useState, memo } from "react"

export const SnipcartContext = createContext(null)

export default function SnipcartContextProvider({ children }) {
    const [snipcart, setSnipcart] = useState(null)

    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            const sc = (window as any).Snipcart
            setSnipcart(sc)
        }, 0)

        return () => clearTimeout(timeoutHandler)
    }, [])

    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        const handler = () => {
            if (!snipcart) return

            snipcart.events.on('customer.signedin', customer => {
                setCustomer(customer)
            })

            snipcart.events.on('snipcart.initialized', state => {
                if (state.customer.status === 'SignedIn') {
                    setCustomer(state.customer)
                }
            })

            snipcart.events.on('customer.signedout', () => {
                setCustomer(null)
            })
        }

        document.addEventListener('snipcart.ready', handler)

        return () => {
            document.removeEventListener('snipcart.ready', handler)
        }
    }, [snipcart])

    return (
        <SnipcartContext.Provider value={{ snipcart, customer }}>
            <SnipCart />
            {children}
        </SnipcartContext.Provider>
    )
}


const SnipCart = memo(function({ children }) {
    return (
        <div>
            <div hidden id="snipcart" data-api-key={process.env.SNIPCART_KEY} data-config-modal-style="side"></div>
            {children}
        </div>
        
    )
})