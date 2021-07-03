import React from 'react'
import { Layout } from '../components'

export default function contact() {
    const locationQuery = "macritchie reservoir"
    return (
        <Layout title="Contact Us" seoTags={{
            "og:description": `Contact us to learn more about ${process.env.NEXT_PUBLIC_STOREFRONT_NAME}!`,
            "og:title": `Contact Us - ${process.env.NEXT_PUBLIC_STOREFRONT_NAME}`,
            "og:type": "website",
            "og:url": `${process.env.NEXT_PUBLIC_STOREFRONT_URL}/contact`
        }}>
            <section className="text-gray-600 body-font relative">
                <div className="absolute inset-0 bg-gray-300">
                    <iframe width="100%" height="100%" frameBorder="0" marginHeight={0} marginWidth={0} title="map" scrolling="no" src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${locationQuery}&ie=UTF8&t=&z=14&iwloc=B&output=embed`} style={{ filter: 'contrast(1.2) opacity(0.7)' }}></iframe>
                </div>
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us!</h1>
                        <ul className="text-gray-600">
                            <li>Example Company</li>
                            <li className="mb-2">1 Lorem Ipsum Road 1, #01-34, Singapore 123456</li>
                            <li>Tel: <span className="font-medium">+65 1234 5678</span></li>
                            <li className="mb-2">Fax: <span className="font-medium">+65 9876 5432</span></li>
                            <li><a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">example@example.com</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
