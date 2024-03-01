import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import { useAuth } from "../provider/authProvider";

const Layout = () => {
  // const { token, userid } = useAuth();
  // const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
