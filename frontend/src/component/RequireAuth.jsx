import { useAuth } from "../provider/authProvider";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { token, isAdmin } = useAuth();
  const location = useLocation();
  // console.log("allowed Roles", allowedRoles);
  // const isadmin = JSON.parse(isAdmin);
  // const tempisadmin = isadmin === "true";
  console.log(
    "isAdmin is type",
    typeof isAdmin,
    "its value is:",
    isAdmin
  );
  console.log(
    "allowedRoles is type",
    typeof allowedRoles,
    "its value is:",
    allowedRoles
  );

  // return token ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  return token ? (
    allowedRoles === isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
