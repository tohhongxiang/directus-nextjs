import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import ProductPreview from '../../components/ProductPreview'
import { getProducts } from '../../utils'

export default function index({ products }) {
    const [search, setSearch] = useState('')

    const router = useRouter()
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({ pathname: '/products', query: { search } })
    }

    const handleClear = () => {
        setSearch('')
        router.push({ pathname: '/products' })
    }

    useEffect(() => {
        const searchQuery = router.query.search as string
        if (searchQuery) {
            setSearch(searchQuery)
        }
    }, [router.query])

    return (
        <div>
            <form className="px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto" onSubmit={handleSearch}>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                        Search
                    </label>
                    <div className="flex flex-row">
                        <div className="relative flex flex-row items-center justify-center">
                            <input value={search} onChange={e => setSearch(e.target.value)} className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search for..." />
                            {search.length > 0 && <button className="z-10 h-full text-center absolute right-0 pr-4 opacity-70 hover:opacity:100 font-bold" type="button" onClick={handleClear}>
                            ×
                            </button>}
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline" type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-stretch">
                {products.map(product => <ProductPreview key={product.id} {...product} />)}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query
    const products = await getProducts(query)

    // {filter: {categories: {categories_id: {_in: 4 } } } }
    return {
        props: {
            products
        }
    }
}
