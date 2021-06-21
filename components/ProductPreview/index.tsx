import Link from 'next/link'
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Product } from '../../types';

interface ProductPreviewProps {
    product: Product,
    expanded?: boolean
}

export default function ProductPreview({ product: { id, date_created, date_updated, price, description, name, image, categories, thumbnail, secondary_images }, expanded = false }: ProductPreviewProps) {
    const productImages = [image, ...secondary_images]

    return (
        <div className="max-w-xl w-full relative">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-x-4">
                <Link href={`/products/${id}`}><h3 className="font-bold text-lg cursor-pointer hover:underline">{name}</h3></Link>
                <p>$<span className="text-2xl font-semibold">{price}</span></p>
            </div>
            <div className="my-4">
                <Carousel className="" showStatus={false} showIndicators={false} autoPlay={false} showThumbs={productImages.length > 1} infiniteLoop dynamicHeight
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button type="button" onClick={onClickHandler} title={label} className="absolute left-0 z-10 top-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-bold text-xl flex items-center justify-center">
                                <img src="/icons/left.svg" alt="Prev"/>
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button type="button" onClick={onClickHandler} title={label} className="absolute right-0 z-10 top-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-bold text-xl flex items-center justify-center">
                                <img src="/icons/right.svg" alt="Next"/>
                            </button>
                        )
                    }
                >
                    {productImages.map(img => <div key={img} className="flex items-center justify-center"><img src={img} alt={name} style={{ maxHeight: '400px', width: 'auto' }} /></div>)}
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