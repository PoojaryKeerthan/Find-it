import React from 'react';
import Image from '../Assets/Project3.jpeg';
import { useNavigate } from 'react-router-dom';

const MobileProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex justify-between items-start space-x-4">
  {/* Status Badge */}
  <span
    className={`absolute top-26 right-3 px-2 py-1 text-xs rounded-full font-medium ${
      props.items.Status
        ? "bg-green-200 text-green-800"
        : "bg-yellow-200 text-yellow-800"
    }`}
  >
    {props.items.Status ? "Returned" : "Pending"}
  </span>

  {/* Left Content */}
  <div className="flex-1">
    <h2 className="text-xl font-semibold">{props.items.ProductName}</h2>
    <p><b>Location</b>: {props.items.Location}</p>
    <p><b>Date</b>: {props.items.Date}</p>
    <button className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
     onClick={() => navigate(`/DetailViewPage/${props.items._id}`)}
    >
      View Details
    </button>
  </div>

  {/* Right Image */}
  <img
    className="w-20 h-20 object-cover rounded-md"
    alt="Card Image"
    src={props.items.ImageURL}
  />
</div>

  );
};

export default MobileProductCard;

