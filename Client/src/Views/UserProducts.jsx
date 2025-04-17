import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import MobileProductCard from '../Components/MobileProductcard';

const UserProducts = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const {id} = useParams();
  useEffect(() => {
    const getUserProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getproducts/getitemsbyuserid/${id}`);
        if (res) setLoading(false);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Error fetching products.");
      }
    }
    if (id) getUserProducts();
  })

  return (
    <>
    <Navbar />
    <div className="px-6 py-10 mt-5 bg-gray-300 min-h-screen" >
      {error ? (<div className='text-center text-2xl text-red-600 h-screen flex items-center justify-center'><MdError />Error in fetching data</div>)
        : loading ? (
          <div className='flex items-center justify-center h-screen'>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
              </div>
            </div>
          </div>
        ):(
          <div>
        <div className="hidden lg:flex gap-10 mt-6">
            {/* Lost Items */}
            <div className="w-1/2">
              <h2 className="text-center text-3xl font-bold text-gray-700 mb-6 underline" >Lost Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.lostItems.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <ProductCard items={item} View={true}/>
                ))}
              </div>
            </div>

            {/* Found Items */}
            <div className="w-1/2">
              <h2 className="text-center text-3xl font-bold text-gray-700 mb-6 underline">Found Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.foundItems.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <ProductCard items={item} View={true} />
                ))}
              </div>
            </div>
          </div>
          {/* Mobile View */}
          <div className="lg:hidden mt-6">
            {/* Lost Items */}
            <div className="mb-10 ">
              <h2 className="text-center text-2xl font-bold text-gray-700 mb-4 underline">Lost Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.lostItems.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <MobileProductCard items={item} View={true}/>
                ))}
              </div>
              
            </div>

            {/* Found Items */}
            <div>
              <h2 className="text-center text-2xl font-bold text-gray-700 mb-4 underline">Found Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.foundItems.map((item) => (
                  <MobileProductCard items={item} View={true}/>
                ))}
              </div>
            </div>
          </div>
          </div>
        )
      }
      </div>
      <Footer />
    </>
  )
}

export default UserProducts