import EmpNavbar from "./EmpNavbar";
import { Outlet } from "react-router-dom";
const EmpLayout = () => {
  return (
    <>
      <EmpNavbar />
      <Outlet />
    </>
  );
};

export default EmpLayout;
