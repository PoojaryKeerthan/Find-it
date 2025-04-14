import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src={props.items.ImageURL} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{props.items.ProductName}</h2>
        <p><b>Location</b>:{props.items.Location}</p>
        <p><b>Date:</b>:{props.items.Date}</p>
        <span
          className={`absolute top-5 right-5 px-2 py-1 text-sm rounded-full font-medium ${props.items.Status
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
            }`}
        >
          {props.items.Status ? "Returned" : "Pending"}
        </span>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
          onClick={() => navigate(`/DetailViewPage/${props.items._id}`)}
          >View Details</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
