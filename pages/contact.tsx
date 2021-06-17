import React from 'react'
import { Layout } from '../components'

export default function contact() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center py-16 px-4 gap-8">
                <img src="/images/contact-us.jpg" alt="Contact Us" />
                <h1 className="font-semibold text-5xl mb-8 text-center">Contact Us!</h1>
                <ul className="text-lg text-gray-700 font-medium">
                    <li>Example Company</li>
                    <li>1 Lorem Ipsum Road 1, #01-34, Singapore 123456</li>
                    <li>Tel: +65 1234 5678</li>
                    <li>Fax: +65 9876 5432</li>
                    <li><a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">example@example.com</a></li>
                </ul>
            </div>
        </Layout>
    )
}
