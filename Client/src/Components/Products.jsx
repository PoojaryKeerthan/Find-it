import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductcard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import ProductSkelton from "./Skeletons/ProductSkelton";
import MobileProductskelton from "./Skeletons/MobileProductskelton";

const Products = () => {
  const [lostproducts, setlostProducts] = useState([]);
  const [foundproducts, setfoundProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getproducts/allLostproducts");
        const resp = await axios.get(" http://localhost:3000/getproducts/allFoundproducts");
        if (response && resp) setLoading(false);
        setlostProducts(response.data); // Save the fetched products to state
        setfoundProducts(resp.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.try again..");
      }
    };

    fetchProducts();
  }, [])

  return (

    <div className="px-6 py-10 mt-5 bg-gray-300 min-h-screen" >
      {error ? (<div className='text-center text-2xl text-red-600 h-screen flex items-center justify-center'>
        <MdError />Error in fetching data</div>
      ) : loading ? (
        <div className="px-14 py-10 mt-5 bg-gray-300 min-h-screen">
          {/* Desktop Skeletons (only visible on lg and above) */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-4 gap-4">
            {Array(8).fill().map((_, i) => <ProductSkelton key={i} />)}
          </div>

          {/* Mobile Skeletons (visible below lg) */}
          <div className="lg:hidden flex flex-col items-center gap-4">
            {Array(8).fill().map((_, i) => <MobileProductskelton key={i} />)}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden lg:flex gap-10">
            {/* Lost Items */}
            <div className="w-1/2">
            <div className="flex justify-center mb-10">
            <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                <span className="text-lg font-bold text-gray-800">Lost Items</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20" />
                </div>
              </button>
            </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lostproducts.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <ProductCard items={item} />
                ))}
              </div>
              <div className="flex justify-center">
                <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition hover:cursor-pointer"
                  onClick={() => navigate("/ViewLostProducts")}
                >
                  View More
                </button>
              </div>
            </div>

            {/* Found Items */}
            <div className="w-1/2">
            <div className="flex justify-center mb-10">
            <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                <span className="text-lg font-bold text-gray-800">Found Items</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/20" />
                </div>
              </button>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foundproducts.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <ProductCard items={item} />
                ))}
              </div>
              <div className="flex justify-center">
                <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition hover:cursor-pointer"
                  onClick={() => navigate('/ViewFoundProducts')}
                >
                  View More
                </button>
              </div>

            </div>
          </div>
          {/* Mobile View */}
          <div className="lg:hidden">
            {/* Lost Items */}
            <div className="mb-10 ">
              <h2 className="text-center text-2xl font-bold text-white mb-6 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl px-4 py-2 shadow-md tracking-wide">
                Lost Items
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lostproducts.map((item) => (
                  // <ItemCard key={item.id} {...item} />
                  <MobileProductCard items={item} />
                ))}
              </div>
              <div className="flex justify-center">
                <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => navigate("/ViewLostProducts")}
                >
                  View More
                </button>
              </div>

            </div>

            {/* Found Items */}
            <div>
              <h2 className="text-center text-2xl font-bold text-white mb-6 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl px-4 py-2 shadow-md tracking-wide">
                Found Items
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foundproducts.map((item) => (
                  <MobileProductCard items={item} />
                ))}
              </div>
              <div className="flex justify-center">
                <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => navigate('/ViewFoundProducts')}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </>
      )
      }
    </div>
  );
};


export default Products;
