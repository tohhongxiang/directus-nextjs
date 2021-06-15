import React from 'react'
import { getProducts } from '../../utils'

export default function index({ products }) {
    return (
        <div>
            <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
    )
}

export async function getServerSideProps(context) {
    const products = await getProducts()
    return {
        props: {
            products
        }
    }
}
