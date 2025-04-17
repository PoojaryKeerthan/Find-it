import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./Controllers/ProtectedRoute"
import HideForLoggedIn from './Controllers/HideForLoggedIn'
import Home from './Views/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Addlostproduct from './Components/Addlostproduct'
import AddfoundProduct from './Components/AddfoundProduct'
import ViewLostProducts from './Views/ViewLostProducts'
import ViewFoundProducts from './Views/ViewFoundProducts'
import DetailViewPage from './Views/DetailViewPage'
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from './Redux/slices/authSlice'
import axios from 'axios'
import ScrollTotop from './Hooks/ScrollTotop'
import UserProducts from './Views/UserProducts'
import EditUserProduct from './Views/EditUserProduct'
function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, { withCredentials: true });
        if (res.data.user) {
          dispatch(setUser(res.data.user)); // ✅ user exists
        } else {
          dispatch(setUser(null)); // ✅ no user, but still set loading to false
        }
      } catch (error) {
        dispatch(setUser(null)); // ✅ also cover error cases
        console.error("Error fetching user data", error);
      }
    };
  
    fetchData(); // always call this
  }, [dispatch]);
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollTotop />
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
          <Route path='/ViewLostProducts' element={<ViewLostProducts />} />
          <Route path='/ViewFoundProducts' element={<ViewFoundProducts />} />
          <Route path='/DetailViewPage/:id' element={<DetailViewPage />} />
          <Route path='/userproducts/:id' element={<UserProducts/>}/>
          <Route path='/edituserproduct/:id' element={<EditUserProduct/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
