import React from "react";
import ProductCard from "./ProductCard";
import MobileProductCard from "./MobileProductcard";
const fakeLostItems = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  itemName: `Lost Item ${i + 1}`,
  category:`mobile${i+1}`,
  description: "Description of the lost item...",
  location:`location${i+1}`,
  date:`${Date.now()}`,
  Contact:`123456789`
}));

const fakeFoundItems = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  itemName: `Lost Item ${i + 1}`,
  category:`mobile${i+1}`,
  description: "Description of the lost item...",
  location:`location${i+1}`,
  date:`${Date.now()}`,
  Contact:`123456789`
}));

const Products = () => {
  return (
    <div className="px-6 py-10 mt-20 bg-gray-300 min-h-screen">
      {/* Desktop View */}
      <div className="hidden lg:flex gap-10">
        {/* Lost Items */}
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-pink-600 mb-6">Lost Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fakeLostItems.map((item) => (
              // <ItemCard key={item.id} {...item} />
              <ProductCard items={item}/>
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
            {fakeFoundItems.map((item) => (
              // <ItemCard key={item.id} {...item} />
              <ProductCard items={item}/>
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
            {fakeLostItems.map((item) => (
              // <ItemCard key={item.id} {...item} />
             <MobileProductCard items={item}/>
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
            {fakeFoundItems.map((item) => (
              <MobileProductCard items={item}/>
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
