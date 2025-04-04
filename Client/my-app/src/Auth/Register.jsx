import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState({ name: "", email: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    let newErrors = { username: "", email: "", password: "" };
    setLoading(false)
    if (!username.trim()) newErrors.username = "Username is required";  
    if (!Email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(Email)) newErrors.email = "Invalid email format";
    if (!Password.trim()) newErrors.password = "Password is required";
    else if (Password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setError(newErrors);

    if (!newErrors.username && !newErrors.email && !newErrors.password) {
        try {
            setErrorMessage('')
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/users/register", {
                username, 
                email: Email, 
                password: Password
            });

            if (response.status === 201) {
                navigate("/login"); // Redirect on success
            }
        } catch (error) {
          setLoading(false);
        setErrorMessage(error.response.data.message);
        }
    }
};


  return (
    <>
    {
      loading && 
      <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]" />
      </div>
    </div>
    }
    <div className="flex justify-center items-center min-h-screen lg:h-[700px] bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl lg:h-[600px]">
        <div className="w-full md:w-1/2 p-8 pt-30">
          <h2 className="text-4xl font-bold mb-4 pl-20 lg:pl-32">Sign up</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
              setError({ ...Error, username: "" });
            }}
            className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {Error.name && <p className="text-red-500 text-xs">{Error.name}</p>}

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

          <div>
         {ErrorMessage && <p className="text-sm text-red-600 mb-4 text-center">{ErrorMessage}</p>}
          </div>
        

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
    </>
  );
};

export default Register;
