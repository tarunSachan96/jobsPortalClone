import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  // const { logout } = useAuth();
  // const { setToken, setUserid, setIsAdmin, logout } = useAuth();
  const { setToken, setUserid, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUserid(null);
    setIsAdmin(null);
    // logout();
    navigate("/home", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 0.5 * 1000);

  return <>Logout Page</>;
};

export default Logout;
