import Link from 'next/link'
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Product } from '../../types';

interface ProductPreviewProps {
    product: Product,
    expanded?: boolean
}

export default function ProductPreview({ product: { 
    id, date_created, date_updated, price, description, name, image, categories = [], thumbnail, secondary_images = [], options = {} 
}, expanded = false }: ProductPreviewProps) {
    const productImages = expanded ? [image, ...secondary_images] : [image]

    const dataOptions = {}
    Object.entries(options).forEach(([key, value], index) => {
        dataOptions[`data-item-custom${index + 1}-name`] = key
        dataOptions[`data-item-custom${index + 1}-options`] = value 
    })

    const PRODUCT_HEADER = (
        <div className={`flex flex-row flex-wrap ${expanded ? 'items-baseline' : 'items-center'} justify-between mb-4 gap-x-8`}>
            <Link href={`/products/${id}`}><h3 className="font-medium text-lg cursor-pointer hover:underline opacity-90">{name}</h3></Link>
            <p>$<span className="text-2xl font-semibold">{price}</span></p>
        </div>
    )
    
    const productDisplay = (
        <div className={`w-full relative flex justify-center ${expanded ? 'flex-wrap' : 'max-w-xl flex-col'} gap-4`}>
            <div className="max-w-xl w-full flex-shrink">
                {!expanded && PRODUCT_HEADER}
                <div>
                    <Carousel className="" showStatus={false} showIndicators={false} autoPlay={false} showThumbs={productImages.length > 1} infiniteLoop dynamicHeight
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <button type="button" onClick={onClickHandler} title={label} style={{ zIndex: 1 }} className="absolute left-0 top-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-bold text-xl flex items-center justify-center">
                                    <img src="/icons/left.svg" alt="Prev" />
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <button type="button" onClick={onClickHandler} title={label} style={{ zIndex: 1 }} className="absolute right-0 top-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-bold text-xl flex items-center justify-center">
                                    <img src="/icons/right.svg" alt="Next" />
                                </button>
                            )
                        }
                    >
                        {productImages.map(img => <div key={img} className="flex items-center justify-center"><img src={img} alt={name} style={{ maxHeight: '400px', width: 'auto' }} /></div>)}
                    </Carousel>
                </div>
            </div>
            {expanded && <div className="max-w-xl flex-shrink">
                {expanded && PRODUCT_HEADER}
                <div dangerouslySetInnerHTML={{ __html: description }} className={`opacity-90 prose prose-sm mb-4 ${expanded ? '' : 'line-clamp-2'}`} />
                <div>
                    <ul className="flex flex-wrap gap-2 py-4">
                        {categories.map((category) => <Link href={`/products?categories=${category.id}`} key={category.id}><li><button className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 font-semibold">{category.name}</button></li></Link>)}
                    </ul>
                    <button className={`snipcart-add-item bg-blue-800 text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-md font-semibold`}
                        data-item-id={id}
                        data-item-price={price}
                        data-item-image={image}
                        data-item-name={name}
                        data-item-url={`/products/${id}`}
                        {...dataOptions}
                    >Add item ($<span className="font-semibold">{price}</span>)</button>
                </div>
            </div>}
        </div >
    )

    if (expanded) {
        return productDisplay
    }

    return <Link href={`/products/${id}`}><a>{productDisplay}</a></Link>
}