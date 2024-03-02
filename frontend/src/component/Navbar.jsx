import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useAuth } from "../provider/authProvider";
const Navbar = () => {
  const { token } = useAuth();
  return (
    <div className={classes.navigation}>
      <h1 className={classes.company}>Jobs Portal</h1>
      <div className={classes.links}>
        {/* <NavLink to="" activeClassName={classes.active}>
          Home
        </NavLink> */}

        {!token && <NavLink to="/signup">SignUp</NavLink>}
        {!token && <NavLink to="/login">Login</NavLink>}
        {token && <NavLink to="/logout">Logout</NavLink>}
      </div>
    </div>
  );
};

export default Navbar;
