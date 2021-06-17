import React from 'react'

function SnipCart({ children }) {
    return (
        <div>
            <div hidden id="snipcart" data-api-key={process.env.SNIPCART_KEY} data-config-modal-style="side"></div>
            {children}
        </div>
        
    )
}

export default React.memo(SnipCart)
