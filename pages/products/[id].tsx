import React, { useState } from 'react'
import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { Layout } from '../../components'
import { capitalise, getProduct, getProducts } from '../../utils'
import { Carousel } from 'react-responsive-carousel';
import { Product } from '../../types';
import Lightbox from 'react-image-lightbox'

interface ProductPageProps {
    product: Product
}
export default function id({ product }: ProductPageProps) {
    const [quantity, setQuantity] = useState(1)
    const [dataCustomFields, setDataCustomFields] = useState(() => {
        const result = {}
        product.custom_fields.map(({ name, options }, index) => {
            result[`data-item-custom${index + 1}-name`] = name
            result[`data-item-custom${index + 1}-options`] = options.join('|')
            result[`data-item-custom${index + 1}-value`] = options[0]
        })
        return result
    })

    const handleOptionChange = (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDataCustomFields(prev => ({ ...prev, [`data-item-custom${index + 1}-value`]: e.target.value }))
    }
    const productImages = [product.image, ...product.secondary_images]

    const [photoIndex, setPhotoIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const calculatePrice = (price = 0, quantity = 0) => {
        return isNaN(price * quantity) ? price.toFixed(2) : (price * quantity).toFixed(2)
    }
    return (
        <Layout title={product.name} seoTags={{
            "og:description": `Learn more about ${product.name} sold by ${process.env.NEXT_PUBLIC_STOREFRONT_NAME}`,
            "og:title": `${product.name} - ${process.env.NEXT_PUBLIC_STOREFRONT_NAME}`,
            "og:type": "website",
            "og:url": `${process.env.NEXT_PUBLIC_STOREFRONT_URL}/products/${product.id}`,
            "og:image": product.image,
            ...product.seo
        }}>
            <div className="lg:flex lg:flex-row justify-center mb-8">
                <div className="p-4 max-w-2xl mx-auto lg:mx-0 lg:sticky top-0 self-start">
                    <Carousel showStatus={false} showIndicators={false} autoPlay={false} showThumbs={productImages.length > 1} infiniteLoop dynamicHeight
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
                        {productImages.map(img => <div key={img} className="flex items-center cursor-pointer" onClick={() => setIsOpen(c => !c)}><img src={img} alt={product.name} /></div>)}
                    </Carousel>
                    {isOpen && (
                        <Lightbox
                            mainSrc={productImages[photoIndex]}
                            nextSrc={productImages[(photoIndex + 1) % productImages.length]}
                            prevSrc={productImages[(photoIndex + productImages.length - 1) % productImages.length]}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() => setPhotoIndex(prevIndex => (prevIndex + productImages.length - 1) % productImages.length)}
                            onMoveNextRequest={() => setPhotoIndex(prevIndex => (prevIndex + 1) % productImages.length)}
                        />
                    )}
                </div>
                <div className="p-4 max-w-xl sticky top-0 flex flex-col mx-auto lg:mx-0 self-start">
                    <h1 className="text-gray-900 text-3xl font-medium">{product.name}</h1>
                    <ul className="flex flex-wrap gap-2 py-4">
                        {product.categories.map((category) => <Link href={`/products?categories=${category.id}`} key={category.id}><li><button className="px-2 py-1 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-sm">{category.name}</button></li></Link>)}
                    </ul>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} className={`opacity-90 prose prose-sm mb-8`} />
                    <div>
                        <div className="flex flex-col gap-4">
                            {product.custom_fields.map(({ name, options }, index) => (
                                <div key={name}>
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                                        {capitalise(name)}
                                    </label>
                                    <select id={name} className="shadow-sm p-2 border border-gray-300 rounded-md" onChange={handleOptionChange(index)}>
                                        {options.map(option => <option key={option} value={option}>{capitalise(option)}</option>)}
                                    </select>
                                </div>
                            ))}
                            <div>
                                <label htmlFor={"quantity"} className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input type="number" value={quantity} min={1} step={1}
                                    id={"quantity"} className="shadow-sm p-2 border border-gray-300 rounded-md inline"
                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                    style={{ width: '60px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 mb-8" />
                    <div className="flex justify-between gap-x-8">
                        <p className="flex gap-x-2 items-baseline">
                            <span className={`title-font font-medium text-2xl text-gray-900 ${product.sale_price ? 'line-through opacity-70' : ''}`}>${calculatePrice(product.price, quantity)}</span>
                            {product.sale_price && <span className="title-font font-medium text-3xl text-gray-900">${calculatePrice(product.sale_price, quantity)}</span>}
                        </p>
                        <button className={`snipcart-add-item bg-blue-800 text-gray-100 hover:bg-blue-900 px-4 py-2 rounded-md font-semibold`}
                            data-item-id={product.id}
                            data-item-price={product.sale_price ? product.sale_price : product.price}
                            data-item-image={product.image}
                            data-item-name={product.name}
                            data-item-url={`/products/${product.id}`}
                            data-item-quantity={quantity}
                            {...dataCustomFields}
                        >Add to cart</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { id } = context.params

    try {
        const product = await getProduct(id as string)
        return {
            props: { product },
            revalidate: 60
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export async function getStaticPaths() {
    const { data: products } = await getProducts({ limit: -1 })
    const paths = products.map(product => ({ params: { id: product.id.toString() } }))
    return {
        paths, fallback: 'blocking'
    }
}
