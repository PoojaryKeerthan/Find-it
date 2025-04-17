import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 " id='contact'>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">

        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Find It</h2>
          <p className="text-gray-400 text-sm mt-2">Helping people reunite with their belongings.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
          <a href="#" className="hover:underline" onClick={()=>navigate('/')}>Home</a>
          <a href="#" className="hover:underline" onClick={()=>navigate('/ViewLostProducts')}>Lost Items</a>
          <a href="#" className="hover:underline" onClick={()=>navigate('/ViewFoundProducts')}>Found Items</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="https://github.com/PoojaryKeerthan/Find-it" className="hover:text-blue-400"><FaGithub /></a>
          <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
          <a href="https://www.instagram.com/keerthan.__poojary" className="hover:text-pink-400"><FaInstagram /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Find It. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
