import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../Redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdKeyboardArrowRight } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const[isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
  
      if (response.status === 200 && response.data.status === "success") {
        dispatch(logout()); // clear Redux state
       toast.success("Logout successful.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      
     toast.error("Logout failed from frontend. Please try again.");
    }
  };
  

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white shadow dark:bg-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <a href='#' className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer" onClick={() => navigate('/')}>
              Find-It
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 dark:text-white focus:outline-none z-50"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 items-center">
              {user ? (
                <>
                  <a href='#' className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer">Hyy! {user.name} </a>
                  <a href="#" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer">My-items</a>
                  <a href="#products" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer">Lost & Found items</a>
                  <a href="#contact" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer">Contact us</a>
                  <div className="relative">
      {/* Profile icon */}
      <div
        onClick={() => setIsLogoutModalOpen((prev) => !prev)}
        className="flex w-8 h-8 rounded-full bg-white items-center justify-center hover:cursor-pointer"
      >
        <span className="text-3xl font-bold mb-1.5">{user.name.charAt(0)}</span>
      </div>

      
      {isLogoutModalOpen && (
        <div className="absolute top-10 bg-white shadow-lg rounded-lg py-2 px-6 z-50 ">
          <button
            onClick={() => {
              setIsLogoutModalOpen(false);
              handleLogout();
            }}
            className="text-lg text-gray-700 hover:text-red-500 cursor-pointer flex items-center"
          >
            Logout <MdKeyboardArrowRight size={20} className='mt-1'/>
          </button>
        </div>
      )}
    </div>
                </>
              ) : (
                <>
                  <a href='#' className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer" onClick={() => navigate('/')}>Home</a>
                  <a className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer" onClick={() => navigate('/register')}>Register</a>
                  <a className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer" onClick={() => navigate('/login')}>Login</a>
                  <a href="#contact" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400 hover:cursor-pointer">Contact us</a>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Backdrop */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-opacity-40 z-40 lg:hidden"
          ></div>
        )}

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-6 space-y-6 mt-10">
            {user ? (
              <>
                <a href="#" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => {setIsOpen(false); navigate("/")}}>Hyy! {user.name}</a>
                <a href="#" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => setIsOpen(false)}>My-items</a>
                <a href="#products" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => setIsOpen(false)}>Lost & Found items</a>
                <a href="#contact" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => setIsOpen(false)}>Contact us</a>
                <a href="#" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => {setIsOpen(false);handleLogout()}}>Logout</a>
              </>
            ) : (
              <>
                <a href="#" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => { setIsOpen(false); navigate("/") }}>Home</a>
                <a className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => { setIsOpen(false); navigate("/register") }}>Register</a>
                <a className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => { setIsOpen(false); navigate("/login") }}>Login</a>
                <a href="#contact" className="block text-gray-800 dark:text-white text-lg hover:cursor-pointer" onClick={() => setIsOpen(false)}>Contact us</a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar