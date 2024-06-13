import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext}  from "./context/AuthContext";

const PrivateRoute = ({ element }) => {
  
  const { adminLoggedIn } = useContext(AuthContext);
  console.log('im in private route and this is the value of isLogged in: ',adminLoggedIn)
  return adminLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
