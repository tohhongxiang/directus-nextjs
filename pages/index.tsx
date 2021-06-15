import React from "react";
import { getSession } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';
import { getCategories, getProducts } from '../utils';
import ProductDisplay from '../components/ProductPreview';

export default function Page({ products = [], categories = [] }) {
    return (
        <div className="flex flex-wrap justify-center">
            {products.map(product => (
                <ProductDisplay key={product.id} {...product} />
            ))}
        </div>
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