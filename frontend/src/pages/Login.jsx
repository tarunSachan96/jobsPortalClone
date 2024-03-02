import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  // const { setToken, setUserid, setIsAdmin, login } = useAuth();
  const { setToken, setUserid, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ValidateForm = () => {
    if (!formData.email || !formData.password) {
      setErr("All fields are compulsary!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      try {
        const resp = await axios.post(
          "http://localhost:3000/api/v1/user/login",
          formData
        );
        // console.log(resp.headers);
        console.log("status code:", resp.status);
        if (resp.status === 401) {
          console.log("invalid user id password");
          return;
        }

        const token = resp.headers.authorization.split(" ")[1];
        const userid = resp.headers.userid;
        const isadmin = resp.headers.isadmin;
        setToken(token);
        setUserid(userid);
        setIsAdmin(isadmin);
        navigate("/dashboard", { replace: true });
      } catch {
        console.log("invalid details");
        navigate("/home", { replace: true });
      }
      // setToken(token);
      // login({ token, userid, isadmin });
      // setUserid(resp.headers.userid);
      // setIsAdmin(resp.headers.isadmin);
      // if (isAdmin == "false") {
      //   navigate("/dashboard");
      // }
      // if (isAdmin == "true") {
      //   navigate("/dashboard");
      // }
      // navigate(from, { replace: true });
      // navigate(`http://localhost:3000/api/v1/user/${resp.headers.userid}`, { replace: true });
    }
  };

  return (
    <div>
      <h1> Login</h1>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
