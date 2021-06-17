import React from "react";
import { GetServerSidePropsContext } from 'next';
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const products = await getProducts()
    const categories = await getCategories()

    return {
        props: {
            products,
            categories
        }
    }
}