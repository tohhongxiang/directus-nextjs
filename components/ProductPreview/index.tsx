import Link from 'next/link'
import React from 'react'
import { Product } from '../../types';

interface ProductPreviewProps {
    product: Product
}

export default function ProductPreview({ product: {
    id, date_created, date_updated, price, description, name, image, categories = [], thumbnail, secondary_images = [], custom_fields = []
} }: ProductPreviewProps) {
    return (
        <Link href={`/products/${id}`}>
            <a>
                <div className="p-4 w-full max-w-xl">
                    <div className="rounded h-72 overflow-hidden flex justify-center items-center">
                        <img alt={name} className="object-cover object-center w-full h-full block" src={image} />
                    </div>
                    <div className="mt-4">
                        <ul className="flex flex-wrap gap-2 mb-2">
                            {categories.map((category) => <Link href={`/products?categories=${category.id}`} key={category.id}><li><button className="px-2 py-1 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-sm">{category.name}</button></li></Link>)}
                        </ul>
                        <h2 className="text-gray-700 font-medium hover:underline">{name}</h2>
                        <p className="mt-1">$<span className="text-xl font-semibold">{price.toFixed(2)}</span></p>
                    </div>
                </div>
            </a>
        </Link>
    )
}