import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext}  from "./context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { adminLoggedIn } = useContext(AuthContext);

  if (adminLoggedIn) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
