import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaTag, FaInfoCircle } from 'react-icons/fa'
import { MdError } from "react-icons/md";
import axios from 'axios';
import MapComponent from '../Components/MapComponent';

const product = {
  ProductName: "Sony Wireless Earbuds",
  Location: "Infosys Campus, Mudipu, Mangalore",
  Address: "Security Office, Infosys Campus Gate 2",
  Contact: "9876543210",
  Date: "2025-04-05",
  Category: "Electronics",
  Description: "Black Sony wireless earbuds found near the food court. Slightly scratched case, fully working.",
  Condition: "Good",
  Status: false,
  ImageURL: "https://res.cloudinary.com/dxeaw4dt6/image/upload/v1744558761/find-it/Founditems/y8vid1klamfa3ogqagja.jpg"
}

const DetailViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState();
  const [itemtype, setItemtype] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/getproducts/getitembyid/${id}`);
        if (res) setLoading(false);
        setItem(res.data.item);
        setItemtype(res.data.type);

      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    if (id) getItemDetails();
  }, [id, item, itemtype])


  return (
    <>
      <Navbar />
      {error ? (<div className='text-center text-2xl text-red-600 h-screen flex items-center justify-center'><MdError />Error in fetching data</div>) : loading ? (
        <div className="min-h-screen bg-gradient-to-r from-[#f0f1f4] to-[#d9e2e8] px-4 sm:px-8 py-22">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 animate-pulse">

            {/* Image Skeleton */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gray-300 rounded-2xl shadow-xl" />

            {/* Text Info Skeleton */}
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4" />
                <div className="h-5 bg-gray-300 rounded w-full" />
                <div className="h-5 bg-gray-300 rounded w-5/6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="h-[72px] bg-gray-300 rounded-xl shadow" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                <div className="h-12 w-full sm:w-40 bg-gray-300 rounded-lg" />
                <div className="h-12 w-full sm:w-40 bg-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-[#f0f1f4] to-[#d9e2e8] px-4 sm:px-8 py-22">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Product Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={item.ImageURL}

                className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-xl text-white">
                <h2 className="text-xl font-semibold">{item.ProductName}</h2>
                <span className={`mt-2 inline-block text-sm px-3 py-1 rounded-full ${item.Status ? 'bg-green-600' : 'bg-yellow-500'}`}>
                  {product.Status ? 'Returned' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-800">{item.ProductName}</h3>
                <p className="text-gray-600 text-lg">{item.Description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem icon={<FaMapMarkerAlt className='text-gray-800' />} label="Found at" value={item.Location} />
                  <DetailItem icon={<FaPhoneAlt className='text-gray-800' />} label="Contact" value={item.Contact} />
                  <DetailItem icon={<FaCalendarAlt className='text-gray-800' />} label="Date Found" value={item.Date} />
                  <DetailItem icon={<FaTag className='text-gray-800' />} label="Category" value={item.Category} />
                  <DetailItem icon={<FaInfoCircle className='text-gray-800' />} label="Condition" value={item.Condition ? item.Condition : "Not Availaible"} />
                  <DetailItem icon={<FaMapMarkerAlt className='text-gray-800' />} label="Currently With" value={item.Address} />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                <button className="w-full sm:w-auto px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-800 transition-all hover:cursor-pointer">
                  Contact Finder
                </button>
                <button className="w-full sm:w-auto px-6 py-3 text-lg font-medium border border-gray-600 text-gray-800 hover:text-white hover:bg-gray-800 rounded-lg transition-all hover:cursor-pointer"
                  onClick={() => { itemtype === 'found' ? navigate('/ViewFoundProducts') : navigate('/ViewLostProducts') }}
                >
                  Back to Listings
                </button>
              </div>

            </div>
            <div className='col-span-full lg:col-span-2'>
              <h1>mapcomponent</h1>
              <MapComponent Location={item.Location}/>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-md transition hover:shadow-lg">
    <div className="text-blue-500 text-xl pt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
)

export default DetailViewPage
