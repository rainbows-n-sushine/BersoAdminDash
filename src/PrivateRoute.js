import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext}  from "./context/AuthContext";

const PrivateRoute = ({ element }) => {
 const adminToken=localStorage.getItem('adminToken')
  console.log('im in private route and this is the value of isLogged in: ',adminToken)
  
  if(adminToken){

    return element; 

  }else{
    return <Navigate to="/" />;
  }
  
};

export default PrivateRoute;
