import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const [isProtected] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<h1>Home page</h1>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="logout" element={<Logout />} />

          {/* Everybody can access
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<h1>Employeer Homepage</h1>} />
          <Route path="/employeer/details" element={<EmployeerDetails />} />
          <Route path="/jobseeker/details" element={<JobseekerDetails />} />
        </Route> */}
          {/* Employeer Roles */}
          <Route element={<RequireAuth allowedRoles={!isProtected} />}>
            <Route path="dashboard" element={<h1>Employeer Homepage</h1>} />
          </Route>

          {/* Job seeker routes */}
          <Route element={<RequireAuth allowedRoles={isProtected} />}>
            <Route path="dashboard" element={<h1>Job Seeker Homepage</h1>} />
          </Route>

          <Route path="unauthorized" element={<h1>No access</h1>} />
          <Route path="*" element={<h1>No page to show</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
