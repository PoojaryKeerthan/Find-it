import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaTag, FaInfoCircle, FaTimes, FaUser } from 'react-icons/fa'
import { MdError } from "react-icons/md";
import axios from 'axios';
import MapComponent from '../Components/MapComponent';


const DetailViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState();
  const [itemtype, setItemtype] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isActivePopup, setIsActivePopup] = useState(false);
  
  
  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getproducts/getitembyid/${id}`);
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
        <div>
          {isActivePopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 px-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setIsActivePopup(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                >
                  <FaTimes className="text-lg" />
                </button>

                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-gray-700" /> Contact Details
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Get in touch with the person who {itemtype === 'lost' ? 'lost' : 'found'} this item.</p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-gray-600" />
                    <span className="text-gray-800 font-medium">{item.Contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <span className="text-gray-800">{item.Address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-600" />
                    <span className="text-gray-800">{item.Date}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition text-sm cursor-pointer"
                    onClick={() => setIsActivePopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="min-h-screen bg-gradient-to-r from-[#f0f1f4] to-[#d9e2e8] px-4 sm:px-8 py-22 z-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Product Image */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={item.ImageURL}
                  className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] object-cover object-center transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-xl text-white">
                  <h2 className="text-xl font-semibold">{item.ProductName}</h2>
                  <span className={`mt-2 inline-block text-sm px-3 py-1 rounded-full ${item.Status ? 'bg-green-600' : 'bg-yellow-500'}`}>
                    {item.Status ? 'Returned' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-800">{item.ProductName}</h3>
                  <p className="text-gray-600 text-lg">{item.Description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem icon={<FaMapMarkerAlt className='text-gray-800' />} label={itemtype === 'lost' ? "Last Seen At" : "Found At"} value={item.Location} />
                    <DetailItem icon={<FaPhoneAlt className='text-gray-800' />} label="Contact" value={item.Contact} />
                    <DetailItem icon={<FaCalendarAlt className='text-gray-800' />} label={itemtype === 'lost' ? "Lost On" : "Found On"} value={item.Date} />
                    <DetailItem icon={<FaTag className='text-gray-800' />} label="Category" value={item.Category} />
                    <DetailItem icon={<FaInfoCircle className='text-gray-800' />} label="Condition" value={item.Condition ? item.Condition : "Not Availaible"} />
                    <DetailItem icon={<FaMapMarkerAlt className='text-gray-800' />} label={itemtype === 'lost' ? "Return to" : "Found At"} value={item.Address} />
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                  <button className="w-full sm:w-auto px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-800 transition-all hover:cursor-pointer"
                  onClick={() => setIsActivePopup(true)}
                  >
                    Contact {itemtype === 'lost' ? 'owner' : 'Finder'} 
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
                <MapComponent Location={item.Location} />
              </div>
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
