import React from 'react';

const ProductCard = (props) => {
  console.log(props.items);
  
  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src="https://via.placeholder.com/150" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{props.items.itemName}</h2>
        <p><b>Location</b>:{props.items.location}</p>
        <p><b>Date:</b>:{props.items.date}</p>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
