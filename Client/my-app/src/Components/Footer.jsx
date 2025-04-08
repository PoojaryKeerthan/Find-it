import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">

        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Lost & Found</h2>
          <p className="text-gray-400 text-sm mt-2">Helping people reunite with their belongings.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Lost Items</a>
          <a href="#" className="hover:underline">Found Items</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Lost & Found. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
