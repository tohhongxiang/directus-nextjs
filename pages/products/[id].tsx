import { GetStaticPropsContext } from 'next'
import React from 'react'
import { Layout, ProductPreview } from '../../components'
import { getProduct, getProducts } from '../../utils'

export default function id({ product }) {
    return (
        <Layout title={product.name}>
            <div className="flex flex-cols items-center justify-center py-16 px-8">
                <ProductPreview {...product} />
            </div>
        </Layout>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { id } = context.params

    const product = await getProduct(id as string)
    return {
        props: { product },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const products = await getProducts()
    const paths = products.map(product => ({ params: { id: product.id.toString() } }))
    return {
        paths, fallback: false
    }
}
