import React from 'react'
import { Layout } from '../components'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Layout title="Not Found">
            <div className="py-16">
                <h1 className="text-center font-bold text-2xl mb-4">Page Not Found</h1>
                <p className="text-gray-600 text-center font-medium hover:underline"><Link href="/"><a>Return home</a></Link></p>
            </div>
        </Layout>
    )
}
