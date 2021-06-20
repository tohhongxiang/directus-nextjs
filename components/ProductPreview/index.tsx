import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';

export default function ProductPreview({ product: { id, date_created, date_updated, price, description, name, image, categories, thumbnail, secondary_images }, expanded = false }) {
    const productImages = [image, ...secondary_images]

    return (
        <div className="max-w-xl w-full relative">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-x-4">
                <Link href={`/products/${id}`}><h3 className="font-bold text-lg cursor-pointer hover:underline">{name}</h3></Link>
                <p>$<span className="text-2xl font-semibold">{price}</span></p>
            </div>
            <div className="my-4">
                <Carousel showStatus={false} showIndicators={false} autoPlay={false} showThumbs={productImages.length > 1} infiniteLoop>
                    {productImages.map(img => <div key={img}><img className={"w-full mx-auto object-cover"} src={img} alt={name} /></div>)}
                </Carousel>
            </div>
            <div dangerouslySetInnerHTML={{ __html: description }} className={`opacity-90 max-w-2xl prose prose-sm ${expanded ? '' : 'line-clamp-2'}`} />
            <div>
                <ul className="flex flex-wrap gap-2 py-4">
                    {categories.map((category) => <li key={category.id}><Link href={`/products?categories=${category.id}`}><button className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 font-semibold">{category.name}</button></Link></li>)}
                </ul>
                <button className="snipcart-add-item bg-blue-800 text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-md font-semibold"
                    data-item-id={id}
                    data-item-price={price}
                    data-item-image={image}
                    data-item-name={name}
                    data-item-url={`/products/${id}`}
                >Add item ($<span className="font-semibold">{price}</span>)</button>
            </div>
        </div >
    )
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className}`}
            style={{ ...style, display: "block", background: 'black', borderRadius: '100%' }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: 'black', borderRadius: '100%' }}
            onClick={onClick}
        />
    );
}