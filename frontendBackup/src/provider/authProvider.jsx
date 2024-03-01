import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token") || null);
  const [userid, setUserid] = useState("");

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // axios.defaults.headers.common["userid"] = "tarunsachan"
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["userid"];
      localStorage.removeItem("token");
    }
  }, [token, userid]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      setUserid,
      userid,
    }),
    [token, userid]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
