import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout'
import ProductPreview from '../../components/ProductPreview'
import { useOnClickOutside } from '../../hooks'
import { getCategories, getProducts } from '../../utils'
import { Category, Product } from '../../types'
import Pagination from '../../components/Pagination'

interface PageProps {
    products: Product[],
    categories: Category[],
    totalCount: number
}

const DEFAULT_LIMIT = 100
const DEFAULT_PAGE = 1

export default function index({ products = [], categories = [], totalCount }: PageProps) {
    const [search, setSearch] = useState('')

    const router = useRouter()
    const handleTextSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({ pathname: '/products', query: { ...router.query, search } })
        setIsFiltersMenuOpen(false)
    }

    const handleClearText = () => {
        setSearch('')
        const newQueryObject = { ...router.query }
        delete newQueryObject.search

        router.push({ pathname: '/products', query: newQueryObject })
        setIsFiltersMenuOpen(false)
    }

    useEffect(() => {
        const searchQuery = router.query.search as string
        if (searchQuery) {
            setSearch(searchQuery)
        }
    }, [router.query])

    const [categoriesSearch, setCategoriesSearch] = useState(Object.fromEntries(categories.map(category => [category.id, false])))

    const handleCategorySearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // get all categoryIDs marked true into an array
        const categories = Object.keys(categoriesSearch).filter(categoryId => categoriesSearch[categoryId])
        router.push({ pathname: '/products', query: { ...router.query, categories } })
        setIsFiltersMenuOpen(false)
    }

    const handleClearCategories = () => {
        // sets all values in categoriesSearch to false
        setCategoriesSearch(previousCategoriesSearch => Object.fromEntries(Object.keys(previousCategoriesSearch).map(category => [category, false])))
        const newQueryObject = { ...router.query }
        delete newQueryObject.categories
        router.push({ pathname: '/products', query: newQueryObject })
        setIsFiltersMenuOpen(false)
    }

    useEffect(() => {
        const markedCategories = router.query.categories as string[]

        if (markedCategories) {
            setCategoriesSearch(previousCategoriesSearch => {
                const result = { ...previousCategoriesSearch }
                Object.keys(previousCategoriesSearch).forEach((category) => {
                    result[category] = markedCategories.includes(category)
                })
                return result
            })
        }
    }, [router.query])

    const handleClearAll = () => {
        setCategoriesSearch(previousCategoriesSearch => Object.fromEntries(Object.keys(previousCategoriesSearch).map(category => [category, false])))
        setSearch('')
        setIsFiltersMenuOpen(false)
        router.push({ pathname: '/products' })
    }

    const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false)
    const filtersMenuRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(filtersMenuRef, () => setIsFiltersMenuOpen(false))

    const currentPage = parseInt(router.query.page as string ?? DEFAULT_PAGE.toString())
    const limit = parseInt(router.query.limit as string ?? DEFAULT_LIMIT.toString())

    return (
        <Layout title="Products" enableFooter={false}>
            <div className="flex h-full relative">
                <div className={`absolute h-full flex justify-start ${isFiltersMenuOpen ? 'bg-opacity-80 w-full z-10' : 'bg-opacity-0'} bg-black`}>
                    <div ref={filtersMenuRef} className="relative h-full bg-gray-100">
                        <div className={`${isFiltersMenuOpen ? 'block' : 'hidden'}`}>
                            <button className="p-4 rounded absolute top-0 right-0" onClick={() => setIsFiltersMenuOpen(false)}>×</button>
                            <form className={`px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto border-b border-gray-200`} onSubmit={handleTextSearch}>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                                        Search
                                    </label>
                                    <div className="flex flex-row">
                                        <div className="relative flex flex-row items-center justify-center">
                                            <input value={search} onChange={e => setSearch(e.target.value)} className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search" />
                                            {search.length > 0 && <button className="z-10 h-full text-center absolute right-0 pr-4 opacity-70 hover:opacity:100 font-bold" type="button" onClick={handleClearText}>
                                                ×
                                            </button>}
                                        </div>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-r focus:outline-none focus:shadow-outline" type="submit">
                                            <img src="/icons/search.svg" alt="search" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <form className="px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto border-b border-gray-200" onSubmit={handleCategorySearch}>
                                <div>
                                    <small className="block text-gray-700 text-sm font-bold mb-2">
                                        Categories
                                    </small>
                                    <div className="flex flex-col mb-4">
                                        {categories.map(category => (
                                            <div key={category.id}>
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" checked={categoriesSearch[category.id]} onChange={e => setCategoriesSearch(c => ({ ...c, [category.id]: !c[category.id] }))} />
                                                    <span className="ml-2">{category.name}</span>
                                                </label>
                                            </div>
                                        ))}
                                        <div className="mt-4 flex flex-col items-center justify-center gap-y-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Search
                                            </button>
                                            <a className="cursor-pointer font-semibold text-gray-600 hover:text-gray-700 hover:underline" type="button" onClick={handleClearCategories}>
                                                Clear categories
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <button onClick={handleClearAll} className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline">Clear all filters</button>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto overflow-x-hidden w-full">
                    <div className="py-8 px-4">
                        <div className="flex flex-col items-baseline gap-x-8 mb-12">
                            <h1 className="font-bold text-2xl mb-4">All Products</h1>
                            <div className="flex justify-start w-full">
                                <button className={`rounded-md bg-gray-100 hover:bg-gray-200 font-semibold px-4 py-2 ${isFiltersMenuOpen ? 'hidden' : 'block'}`} onClick={() => setIsFiltersMenuOpen(true)}>Filters</button>
                                <button onClick={handleClearAll} className="font-semibold text-gray-600 rounded-md px-4 py-2 hover:text-gray-900 hover:underline focus:outline-none">Clear filters</button>
                            </div>
                        </div>
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
                                {products.map(product => <ProductPreview key={product.id} product={product} />)}
                            </div>
                        ) : <p className="text-center font-bold text-2xl text-gray-600">No products found...</p>}
                        <Pagination currentPage={currentPage} totalCount={totalCount} pageLimit={limit} />
                    </div>
                    <Footer />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { search: textSearch, categories: categoriesSearch, page, limit, ...params }: any = context.query

    params.page = page ? page : DEFAULT_PAGE
    params.limit = limit ? limit : DEFAULT_LIMIT

    if (textSearch) {
        params.search = textSearch
    }

    if (categoriesSearch) {
        params.filter = { categories: { categories_id: { _in: categoriesSearch } } }
    }

    const { data: products, meta: { filter_count } } = await getProducts(params)
    const { data: categories } = await getCategories()

    return {
        props: {
            products,
            categories,
            totalCount: filter_count
        }
    }
}
