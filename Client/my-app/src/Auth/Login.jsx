import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import toast from "react-hot-toast";
import { setUser } from '../Redux/slices/authSlice';
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState({ email: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    let newErrors = { email: "", password: "" };
    setErrorMessage('');
    setIsLoading(false);

    if (!Email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(Email)) newErrors.email = "Invalid email format";

    if (!Password.trim()) newErrors.password = "Password is required";

    setError(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/users/login",
          { Email, Password },
          { withCredentials: true }
        );

        if (response.status === 201) {
          // ✅ WAIT for this request before checking the user
          const res = await axios.get("http://localhost:3000/", {
            withCredentials: true,
          });

          if (res.data.user) {
            dispatch(setUser(res.data.user));
          }

          toast.success("Login Successful");

          setTimeout(() => {
            setIsLoading(false);
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          setErrorMessage(err.response.data.message || "Something went wrong!");
        } else if (err.request) {
          setErrorMessage("No response from server. Check your internet connection.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
  };
  return (
    <>
      <Navbar />
      {
        isLoading &&
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]" />
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]" />
          </div>
        </div>
      }
      <div className="flex justify-center items-center min-h-screen lg:h-[700px] bg-gray-100 p-4 mt-6">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl lg:h-[600px]">
          {/* Sign In Section */}
          <div className="w-full md:w-1/2 p-8 pt-10 lg:pt-46 ">
            <h2 className="text-4xl font-bold mb-4 pl-18 lg:pl-32">Sign In</h2>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError({ ...Error, email: "" });
              }}
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 "
            />
            {Error.email && <p className="text-red-500 text-xs">{Error.email}</p>}

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...Error, password: "" });
              }}
              className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {Error.password && <p className="text-red-500 text-xs">{Error.password}</p>}

            <div>
              {ErrorMessage && <p className="text-sm text-red-600 mb-4 text-center">{ErrorMessage}</p>}
            </div>

            {/* Login Button */}
            <button className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 hover:cursor-pointer" onClick={handleLogin}>
              SIGN IN
            </button>
          </div>

          {/* Sign Up Section */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-red-400 to-pink-500 text-white flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">New Here? Create an Account!</h2>
            <p className="text-center mb-4">Sign up now and be a part of our community. Get started with exclusive access and benefits!</p>
            <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-red-500 hover:cursor-pointer" onClick={() => navigate('/Register')}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Login;