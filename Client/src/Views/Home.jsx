import React from 'react'
import axios from 'axios';

import Navbar from '../Components/Navbar';
import Heroimage from '../Components/Heroimage';
import Products from '../Components/Products';
import Footer from '../Components/Footer';
axios.defaults.withCredentials = true;
const Home = () => {
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