import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaTag, FaInfoCircle, FaTimes, FaUser } from 'react-icons/fa'
import { MdError } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const EditUserProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState();
    const [itemtype, setItemtype] = useState();
    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);

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


    const handleToggle = (e) => {
        setStatus(e.target.checked);
    };

    const handleSave = async () => {
        try {
            setLoader(true)
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/getproducts/updateProduct/${id}`,
                {
                    itemType: itemtype,  
                    Status: status        
                });
            console.log(res);

            if (res.status === 200) {
                setLoader(false);
                toast.success("Product updated successfully.");
                setTimeout(() => {
                    navigate(-1)
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                loader ? (<div>
                    <div className='flex items-center justify-center h-screen'>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
              </div>
            </div>
          </div>
                </div>) : (
                    <div>
                        <div className="min-h-screen bg-gradient-to-r from-[#f0f1f4] to-[#d9e2e8] px-4 sm:px-8 py-22 z-20">
                            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                                {/* Product Image */}
                                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                                    <img
                                        src={item.ImageURL}
                                        className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[665px] object-cover object-center transition-transform duration-300 hover:scale-105"
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
                                    <div>
                                        <p className="text-yellow-700 bg-yellow-100 border border-yellow-300 p-3 mb-2 rounded-lg text-sm">
                                            ⚠️Note:only this can be edited
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">

                                            <div>
                                                <p className="text-yellow-700 bg-yellow-100 border border-yellow-300 p-3 mb-2 rounded-lg text-sm">
                                                    ⚠️ Caution: Once marked as handed over, this item will be considered resolved. Only update this status if the item has been safely returned to the rightful owner.
                                                </p>
                                            </div>

                                            <div className='flex mb-4 items-center ml-4'>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox"
                                                        onChange={handleToggle}
                                                        className="sr-only peer"
                                                        defaultChecked={item.Status}
                                                        disabled={item.Status} />
                                                    <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95" />
                                                </label>
                                                <span className="lg:hidden ml-2 text-gray-800 font-semibold">Mark Item as Handed Over?</span>
                                            </div>
                                        </div>
                                        <button
                                            className={`w-full sm:w-auto px-6 py-3 text-lg font-medium border rounded-lg transition-all
                                                     ${(item.Status || !status)
                                                    ? 'border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed'
                                                    : 'border-gray-600 text-gray-800 hover:text-white hover:bg-gray-800 cursor-pointer'
                                                }`}
                                            disabled={item.Status}
                                            onClick={handleSave}
                                            title={item.Status ? 'This item has already been marked as handed over' : ''}
                                        >
                                            Save
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
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

export default EditUserProduct