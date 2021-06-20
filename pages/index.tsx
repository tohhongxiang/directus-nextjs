import React from "react";
import { GetStaticPropsContext } from 'next';
import { getProducts } from '../utils';
import { ProductPreview, Layout } from '../components';
import Link from 'next/link'

export default function Page({ products = [] }) {
    return (
        <Layout>
            <section className="flex flex-col justify-center items-center h-96 px-4 py-16 my-16">
                <h1 className="font-bold text-3xl mb-4">Lorem Ipsum</h1>
                <p className="font-light opacity-80 tracking-wide max-w-2xl text-center mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sint obcaecati dolores in sapiente odio impedit vero nemo? Perferendis odit tempora cum voluptatibus, molestias ipsam exercitationem illum perspiciatis. Accusamus, quod.</p>
                <Link href="/products"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">See our Products</button></Link>
            </section>
            <section className="flex flex-col justify-center items-center px-4 py-16 bg-gray-50">
                <Link href="/products"><h2 className="font-bold text-3xl mb-4 hover:underline cursor-pointer"><a>Featured Products</a></h2></Link>
                <div className="flex flex-wrap gap-12 justify-center py-12">
                    {products.map(product => (
                        <ProductPreview key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const products = await getProducts({ filter: { featured: { _eq: true } } })

    return {
        props: {
            products: products.slice(0, 3)
        },
        revalidate: 60
    }
}