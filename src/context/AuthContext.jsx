import React, { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    const cookie = Cookies.getJSON("jwt_auth");
    if (cookie) setAuthToken(cookie);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken: authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
