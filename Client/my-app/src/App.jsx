import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./Controllers/ProtectedRoute"
import HideForLoggedIn from './Controllers/HideForLoggedIn'
import Home from './Views/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Addlostproduct from './Components/Addlostproduct'
import AddfoundProduct from './Components/AddfoundProduct'
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './Redux/slices/authSlice'
import axios from 'axios'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path="/register"
            element={
              <HideForLoggedIn>
                <Register />
              </HideForLoggedIn>
            }
          />
          <Route
            path="/login"
            element={
              <HideForLoggedIn>
                <Login />
              </HideForLoggedIn>
            }
          />
          <Route
            path="/Addlostproduct"
            element={
              <ProtectedRoute>
                <Addlostproduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Addfoundproduct"
            element={
              <ProtectedRoute>
                <AddfoundProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
