import { useRouter } from 'next/router'
import React from 'react'

interface PaginationProps {
    currentPage: number,
    pageLimit: number,
    totalCount: number
}

export default function Pagination({ currentPage, pageLimit, totalCount }: PaginationProps) {
    let firstItemIndex = (currentPage - 1) * pageLimit
    let lastItemIndex = currentPage * pageLimit > totalCount ? totalCount : currentPage * pageLimit

    const lastPage = Math.ceil(totalCount / pageLimit)
    const numberOfFrontPagesShown = 3
    const numberOfBackPagesShown = 3
    const numberOfMiddlePagesShown = 5
    // displays page numbers
    // if current page is 100, total 1000 pages, then it will look like [1, 2, 3, ..., 98, 99, 100, 101, 102, ..., 998, 999, 1000]
    const pageNumbers = [...Array(lastPage).keys()].map(number => {
        if (number < numberOfFrontPagesShown || number > lastPage - numberOfBackPagesShown - 1 || Math.abs(currentPage - number) < numberOfMiddlePagesShown / 2) {
            return number
        }
        return null
    }).reduce((acc, currentElement) => {
        const previousElement = acc[acc.length - 1]
        if (previousElement !== currentElement) {
            acc.push(currentElement)
        }
        return acc
    }, [] as (number | null)[]).map(numbers => numbers != null ? numbers + 1 : null)

    const router = useRouter()
    const handlePagination = (direction: number) => {
        router.push({
            query: {
                ...router.query,
                limit: pageLimit,
                page: currentPage + direction
            }
        })
    }
    

    return (
        <div className="flex flex-wrap items-center space-x-4">
            <p className="my-4">Page <strong>{currentPage}/{lastPage}, Items <strong>{firstItemIndex + 1} - {lastItemIndex}</strong> of {totalCount}</strong></p>
            <nav className="relative z-0 inline-flex flex-wrap rounded-md shadow-sm -space-x-px mx-auto" aria-label="Pagination">
                {currentPage <= 1 || <button onClick={() => handlePagination(-1)} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>}
                {pageNumbers.map((number, index) => number === null ? (
                    <button
                        disabled
                        key={index}
                        className={`pointer-events-none relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:outline-none`}
                    >
                        ...
                    </button>
                ) : (
                    <button
                        key={index}
                        onClick={() => router.push({ query: { ...router.query, page: number } })}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 ${currentPage === number ? "bg-gray-200" : "bg-white"} text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage >= lastPage || <button onClick={() => handlePagination(1)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>}
            </nav>
        </div>
    )
}
