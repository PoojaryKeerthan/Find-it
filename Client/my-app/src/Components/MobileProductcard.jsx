import React from 'react';
import Image from '../Assets/Project3.jpeg';

const MobileProductCard = (props) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex justify-between items-start space-x-4">
      
      {/* Left Content */}
      <div className="flex-1">
      <h2 className="text-xl font-semibold">{props.items.itemName}</h2>
        <p><b>Location</b>:{props.items.location}</p>
        <p><b>Date:</b>:{props.items.date}</p>
        <button className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          Learn More
        </button>
      </div>

      {/* Right Image */}
      <img
        className="w-20 h-20 object-cover rounded-md"
        alt="Card Image"
        src={Image}
      />
    </div>
  );
};

export default MobileProductCard;

