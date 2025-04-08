import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const AddfoundProduct = () => {
  return (
    <>
    <Navbar />
    <div className="bg-[#f0e7e7] min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <form className="bg-[#f0e7e7] shadow-lg rounded-2xl p-4 sm:p-6 w-full overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
            Add the found-item details:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Product name</label>
              <input type="text" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Contact</label>
              <input type="text" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Location</label>
              <input type="text" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Address</label>
              <textarea className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Category</label>
              <div className="relative w-full">
                <select
                  className="block w-full appearance-none bg-gray-300 border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Wallets & Purses">Wallets & Purses</option>
                  <option value="Keys">Keys</option>
                  <option value="Bags & Backpacks">Bags & Backpacks</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Documents">Documents (IDs, Licenses)</option>
                  <option value="Eyewear">Eyewear</option>
                  <option value="Others">Others</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Description</label>
              <textarea className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Date of Found Item</label>
              <input type="date" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Upload image</label>
              <input type="file" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full" />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default AddfoundProduct