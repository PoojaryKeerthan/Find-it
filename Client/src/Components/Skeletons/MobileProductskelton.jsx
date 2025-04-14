import React from 'react'

const MobileProductskelton = () => {
    return (
        <div className="relative w-[300px] bg-white rounded-lg shadow-md p-4 flex justify-between items-start space-x-4 animate-pulse">
            <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-300 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="mt-3 h-8 w-24 bg-gray-300 rounded-full" />
            </div>
            <div className="w-20 h-20 bg-gray-300 rounded-md" />
        </div>
    )
}

export default MobileProductskelton