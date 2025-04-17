import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductCard from '../Components/ProductCard';
import MobileProductCard from '../Components/MobileProductcard';
import { MdError } from 'react-icons/md';

const ViewLostProducts = () => {
    const [lostproducts, setlostProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getproducts/allLostproducts");
                if (response) setLoading(false);
                setlostProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            {error ? (<div className='text-center text-2xl text-red-600 h-screen flex items-center justify-center'><MdError />Error in fetching data</div>) : loading ? (
                <div className='flex items-center justify-center h-screen'>
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
                    </div>
                </div>
                </div>
            ) : (
                <div className="px-6 py-10 mt-5 bg-gray-300 " >
                    <div className="hidden lg:block px-8 mt-10">
                        <div className='flex flex-col items-center justify-center '>
                            <h2 className="text-center text-3xl font-bold text-gray-600 mb-6 underline">Lost Items</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {lostproducts.map((item, index) => (
                                    <ProductCard key={index} items={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <div className='mt-4'>
                            <h2 className="text-center text-2xl font-bold text-gray-600 mb-4 underline">Lost Items</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {lostproducts.map((item) => (
                                    <MobileProductCard items={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ViewLostProducts;
