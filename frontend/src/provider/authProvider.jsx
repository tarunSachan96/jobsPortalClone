import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token") || null);
  const [userid, setUserid_] = useState(localStorage.getItem("userid") || null);
  const [isAdmin, setIsAdmin_] = useState(
    JSON.parse(localStorage.getItem("isadmin")) || null
  );

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUserid = (data) => {
    setUserid_(data);
  };
  const setIsAdmin = (data) => {
    setIsAdmin_(JSON.parse(data));
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.common["userid"] = userid;
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
      localStorage.setItem("isadmin", isAdmin);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["userid"];
      delete axios.defaults.headers.common["isadmin"];
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("isadmin");
    }
  }, [token, userid, isAdmin]);

  // Memoized value of the authentication context

  const login = ({ token, isadmin, userid }) => {
    // console.log("token:",token,"isadmin:",isadmin,"userid:",userid)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
    localStorage.setItem("isadmin", JSON.stringify(isadmin));
  };
  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["userid"];
    delete axios.defaults.headers.common["isadmin"];
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("isadmin");
    setToken(null), setIsAdmin(null), setUserid(null);
  };
  const contextValue = useMemo(
    () => ({
      token,
      userid,
      isAdmin,
      setToken,
      setUserid,
      setIsAdmin,
    }),
    [token, userid, isAdmin]
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
