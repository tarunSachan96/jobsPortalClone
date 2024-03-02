import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./provider/authProvider";
import { useState } from "react";
import Login from "../src/pages/Login";
import UserDetails from "./pages/UserDetails";
import EmployeerDetails from "./pages/EmployeerDetails";
import Layout from "./component/Layout";
import Register from "./pages/Register";
import RequireAuth from "./component/RequireAuth";
import Logout from "./pages/Logout";
import JobseekerDetails from "./component/JobseekerDetails";
import EmployeerTargetJob from "./component/EmployeerTargetJob";
import EmployeerJobsPosted from "./component/EmployeerJobsPosted";
import JobSeekerAllJobs from "./component/JobSeekerAllJobs";
import EmpLayout from "./component/EmpLayout";
import EmployeerDashboard from "./pages/EmployeerDashboard";
import Error from "./pages/Error";
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
          <Route
            path="home"
            element={<h1>Will fetch all available jobs in future</h1>}
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="welcome" element={<h1>Welcome Page</h1>} />
          <Route path="unauthorized" element={<h1>No access</h1>} />
          <Route path="error" element={<Error />} />
          {/* Everybody can access with token */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/dashboard" element={<h1> Homepage</h1>} />

            <Route path="/jobseeker/details" element={<JobseekerDetails />} />
            <Route path="/jobseeker/alljobs" element={<JobSeekerAllJobs />} />
            <Route path="/employeer/" element={<EmpLayout />}>
              <Route path="details" element={<EmployeerDetails />} />
              <Route
                path="details/modify"
                element={<h1>employee details modify page</h1>}
              />
              <Route path="alljobs" element={<EmployeerJobsPosted />} />
              <Route path="jobs/:jobsid" element={<EmployeerTargetJob />} />
              <Route path="dashboard" element={<EmployeerDashboard />} />
            </Route>
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
