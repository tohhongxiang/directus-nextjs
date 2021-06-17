import React from "react";
import { GetStaticPropsContext } from 'next';
import { getCategories, getProducts } from '../utils';
import { ProductPreview, Layout } from '../components';

export default function Page({ products = [], categories = [] }) {
    return (
        <Layout>
            <div className="flex flex-wrap gap-12 justify-center py-12">
                {products.map(product => (
                    <ProductPreview key={product.id} {...product} />
                ))}
            </div>
        </Layout>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const products = await getProducts()
    const categories = await getCategories()

    return {
        props: {
            products,
            categories
        },
        revalidate: 60
    }
}