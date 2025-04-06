import React from 'react';
import Image from '../Assets/Project3.jpeg';

const MobileProductCard = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4 flex justify-between items-start space-x-4">
      
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">Beautiful Card</h2>
        <p className="text-gray-600 text-sm mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante sit amet tellus ornare tincidunt.
        </p>
        <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
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

