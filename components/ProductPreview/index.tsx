import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'

export default function ProductPreview({ id, date_created, date_updated, price, description, name, image, categories, thumbnail, secondary_images }) {
    const productImages = [image, ...secondary_images]
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)

    return (
        <div className="max-w-xl w-full relative">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-x-4">
                <Link href={`/products/${id}`}><h3 className="font-bold text-lg cursor-pointer hover:underline">{name}</h3></Link>
                <p>$<span className="text-2xl font-semibold">{price}</span></p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: description }} className="opacity-80 max-w-2xl" />
            <div className="my-4">
                <Slider
                    asNavFor={nav2}
                    ref={ref => setNav1(ref)}
                    adaptiveHeight={true}
                >
                    {productImages.map(img => <div key={img}><img className={"w-full mx-auto object-cover"} src={img} alt={name} /></div>)}
                </Slider>
                {productImages.length > 1 && <Slider
                    asNavFor={nav1}
                    ref={ref => setNav2(ref)}
                    slidesToShow={5}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    centerMode={true}
                    infinite={productImages.length > 3}
                >
                    {productImages.map(img => <a className="cursor-pointer" key={img}><img className={"mx-auto"} src={img} alt={name} width={128} height={128} /></a>)}
                </Slider>}
            </div>
            <div>
                <ul className="flex flex-wrap gap-2 py-4">
                    {categories.map((category) => <li key={category}><Link href={`/categories/${category}`}><button className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 font-semibold">{category}</button></Link></li>)}
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
