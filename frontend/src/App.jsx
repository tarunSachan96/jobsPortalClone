import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./provider/authProvider";
import Login from "../src/pages/Login";
import UserDetails from "./pages/UserDetails";
import EmployeerDetails from "./pages/EmployeerDetails";
import Layout from "./component/Layout";
import Register from "./pages/Register";
import RequireAuth from "./component/RequireAuth";
import Logout from "./pages/Logout";
import Navbar from "./component/Navbar";
import JobseekerDetails from "./pages/JobseekerDetails";
import { useState } from "react";
import EmployeerJobsPosted from "./component/EmployeerJobsPosted";
const ROLES = {
  User: false,
  Admin: true,
};

function App() {
  const { isAdmin } = useAuth();
  // console.log(isAdmin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<h1>Home page</h1>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="unauthorized" element={<h1>No access</h1>} />
          {/* Everybody can access with token */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/dashboard" element={<h1> Homepage</h1>} />
            <Route path="/employeer/details" element={<EmployeerDetails />} />
            <Route path="/employeer/jobs" element={<EmployeerJobsPosted />} />
            <Route path="/jobseeker/details" element={<JobseekerDetails />} />
          </Route>
          {/* Employeer Roles */}
          {/* {isAdmin && (
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route path="dashboard" element={<EmployeerDetails />} />
            </Route>
          )}
          {/* Job seeker routes */}
          {/* {!isAdmin && (
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="dashboard" element={<JobseekerDetails />} />
            </Route>
          )} */}
          <Route path="*" element={<h1>No page to show</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
