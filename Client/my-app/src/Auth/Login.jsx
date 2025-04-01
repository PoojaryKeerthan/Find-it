import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState({ email: "", password: "" });

  const handleLogin = () => {
    let newErrors = { email: "", password: "" };

    if (!Email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(Email)) newErrors.email = "Invalid email format";

    if (!Password.trim()) newErrors.password = "Password is required";

    setError(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Logged in Successfully:", { Email, Password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen lg:h-[700px] bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl lg:h-[600px]">
        {/* Sign In Section */}
        <div className="w-full md:w-1/2 p-8 pt-40">
          <h2 className="text-4xl font-bold mb-4 pl-20 lg:pl-32">Sign In</h2>
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...Error, email: "" });
            }}
            className="w-full p-3 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-red-400"
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
            className="w-full p-3 border rounded mb-1 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {Error.password && <p className="text-red-500 text-xs">{Error.password}</p>}

          <p className="text-sm text-gray-500 mb-4 cursor-pointer">Forgot your password?</p>

          {/* Login Button */}
          <button className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600" onClick={handleLogin}>
            SIGN IN
          </button>
        </div>

        {/* Sign Up Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-red-400 to-pink-500 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">New Here? Create an Account!</h2>
          <p className="text-center mb-4">Sign up now and be a part of our community. Get started with exclusive access and benefits!</p>
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-red-500" onClick={() => navigate('/Register')}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
