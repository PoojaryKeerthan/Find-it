import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/slices/authSlice';
import Navbar from '../Components/Navbar';
import Heroimage from '../Components/Heroimage';
import Products from '../Components/Products';
import Footer from '../Components/Footer';
axios.defaults.withCredentials = true;
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!user) {
      fetchData();
    }
  }, [dispatch, user]);
  return (
    // <div>{user ? JSON.stringify({ id: user.id, name: user.name, email: user.email }):"no user"}</div>
    <>
      <Navbar />
      <Heroimage />
      <Products />
      <Footer />
    </>
  )
}


export default Home