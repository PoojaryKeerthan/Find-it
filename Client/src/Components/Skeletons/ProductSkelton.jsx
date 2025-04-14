import React from 'react'

const ProductSkelton = () => {
    return (
        <div>
            <div className="w-80 p-4 bg-white rounded-lg shadow-md animate-pulse">
                <div className="w-full h-40 bg-gray-300 rounded-t-lg" />
                <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="mt-4 h-8 bg-gray-400 rounded-full w-32" />
                </div>
            </div>
        </div>
    )
}

export default ProductSkelton