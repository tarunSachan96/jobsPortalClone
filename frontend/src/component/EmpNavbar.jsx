import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
const EmpNavbar = () => {
  return (
    <div className={classes.navigation}>
      {/* <h1 className={classes.company}>Jobs Portal</h1> */}
      <div className={classes.links}>
        <NavLink to="dashboard" activeClassName={classes.active}>
          Dashboard
        </NavLink>
        <NavLink to="details" activeClassName={classes.active}>
          Details
        </NavLink>
        <NavLink to="alljobs" activeClassName={classes.active}>
          AllJobs
        </NavLink>
      </div>
    </div>
  );
};

export default EmpNavbar;
