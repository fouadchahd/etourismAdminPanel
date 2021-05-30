import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, path }) => {
  const { authToken } = useContext(AuthContext);
  console.log("autoken", authToken);
  if (!authToken) return <Redirect to="/login"></Redirect>;
  return <Route path={path}>{children}</Route>;
};

export default ProtectedRoute;
