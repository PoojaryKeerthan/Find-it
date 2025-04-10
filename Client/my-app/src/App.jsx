import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./Controllers/ProtectedRoute"
import HideForLoggedIn from "./Controllers/HideForLoggedIn";
import Home from './Views/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Addlostproduct from './Components/Addlostproduct'
import AddfoundProduct from './Components/AddfoundProduct'
import { Toaster } from 'react-hot-toast';

function App() {
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
