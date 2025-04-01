import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState({ username: "", email: "", password: "" });

  const handleRegister = () => {
    let newErrors = { username: "", email: "", password: "" };

    if (!Username.trim()) newErrors.username = "Username is required";
    if (!Email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(Email)) newErrors.email = "Invalid email format";
    if (!Password.trim()) newErrors.password = "Password is required";
    else if (Password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setError(newErrors);

    if (!newErrors.username && !newErrors.email && !newErrors.password) {
      console.log("Registered Successfully:", { Username, Email, Password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen lg:h-[700px] bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl lg:h-[600px]">
       
        <div className="w-full md:w-1/2 p-8 pt-30">
          <h2 className="text-4xl font-bold mb-4 pl-20 lg:pl-32">Sign up</h2>

         
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError({ ...Error, username: "" }); 
            }}
            className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {Error.username && <p className="text-red-500 text-xs">{Error.username}</p>}


          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...Error, email: "" });
            }}
            className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {Error.email && <p className="text-red-500 text-xs">{Error.email}</p>}


          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ ...Error, password: "" });
            }}
            className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {Error.password && <p className="text-red-500 text-xs">{Error.password}</p>}
          <p className="text-sm text-gray-500 mb-4 cursor-pointer">Forgot your password?</p>


         
          <button className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600" onClick={handleRegister}>
            Register
          </button>
        </div>


        <div className="w-full md:w-1/2 bg-gradient-to-r from-red-400 to-pink-500 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-center mb-4">
            Already have an account? Sign in to access your dashboard and explore more features.
          </p>
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-red-500" onClick={() => navigate('/Login')}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
