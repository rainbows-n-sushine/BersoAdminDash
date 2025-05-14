import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import loginImage from "../images/logo-removebg.png"; // Import your image here

const LoginPage = () => {
  const [credential, setCredential] = useState ("");
  const [password, setPassword] = useState("");
  const { AdminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin =async(e) => {
    e.preventDefault();
    // Perform authentication here
    if(credential&&password){
       const loginSuccess = await AdminLogin(credential, password); 

    if (loginSuccess) {
      navigate("/Dashboard");
    } else {
      alert("Login failed. Check credentials.");
    }
  } else {
    alert("Provide the proper credentials.");
  }
    
  };

  return (
    <div className="flex min-h-screen  bg-gray-200  items-center justify-center">
      {/* Left section with image and welcome text */}
        <div className="w-1/2 h-[340px] max-w-[538px] border-rounded-[20px] bg-white p-8 flex flex-col rounded-lg shadow-lg items-center items-center justify-center">
          <h1 className="lg:text-[45px] md:text-[30px] text-[25px] font-bold text-center text-orange-400 mt-[20px] mb-[5px] ">
            Welcome🌻
          </h1>
          <img src={loginImage} alt="Login" className="w-[80%] lg:w-[50%] mb-4" />
          
        </div>
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden flex w-3/4 max-w-[538px]">
       

        {/* Right section with login form */}
        <div className="w-[80dvw] h-[340px] max-w-[538px]  p-8 bg-orange-50">
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
