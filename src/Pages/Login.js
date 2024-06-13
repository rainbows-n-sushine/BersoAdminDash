import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import loginImage from "../images/logo-removebg.png"; // Import your image here

const LoginPage = () => {
  const [credential, setCredential] = useState ("");
  const [password, setPassword] = useState("");
  const { AdminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform authentication here
    if(credential&&password){
      AdminLogin(credential,password);
    navigate("/Dashboard");
    }else{
      alert('provide the proper credentials')
    }
    
  };

  return (
    <div className="flex min-h-screen bg-gray-200 items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-3/4 max-w-4xl">
        {/* Left section with image and welcome text */}
        <div className="w-1/2 bg-white p-8 flex flex-col items-center justify-center">
          <img src={loginImage} alt="Login" className="w-3/4 mb-4" />
          {/* <h1 className="text-3xl font-bold text-center text-orange-600">
            Welcome to Admin Dashboard
          </h1> */}
        </div>

        {/* Right section with login form */}
        <div className="w-1/2 p-8 bg-orange-50">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username or email
              </label>
              <input
                type="text"
                preValue={credential}
                onChange={(e) => setCredential(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                preValue={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
