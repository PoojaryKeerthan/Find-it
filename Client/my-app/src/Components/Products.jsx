import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductcard";
import axios from "axios";

const Products = () => {
  const [lostproducts, setlostProducts] = useState([]);
  const [foundproducts, setfoundProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getproducts/allLostproducts");
        const resp = await axios.get(" http://localhost:3000/getproducts/allFoundproducts");
        setlostProducts(response.data); // Save the fetched products to state
        setfoundProducts(resp.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  },[])

  return (
    <div className="px-6 py-10 mt-5 bg-gray-300 min-h-screen" >
      {/* Desktop View */}
      <div className="hidden lg:flex gap-10">
        {/* Lost Items */}
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-pink-600 mb-6" >Lost Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lostproducts.map((item) => (
              // <ItemCard key={item.id} {...item} />
              <ProductCard items={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
              View More
            </button>
          </div>
        </div>

        {/* Found Items */}
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-green-600 mb-6">Found Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foundproducts.map((item) => (
              // <ItemCard key={item.id} {...item} />
              <ProductCard items={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
              View More
            </button>
          </div>

        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Lost Items */}
        <div className="mb-10 ">
          <h2 className="text-center text-2xl font-bold text-pink-600 mb-4">Lost Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lostproducts.map((item) => (
              // <ItemCard key={item.id} {...item} />
              <MobileProductCard items={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition">
              View More
            </button>
          </div>

        </div>

        {/* Found Items */}
        <div>
          <h2 className="text-center text-2xl font-bold text-green-600 mb-4">Found Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foundproducts.map((item) => (
              <MobileProductCard items={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
