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
  const { setToken, setUserid } = useAuth();
  const navigate = useNavigate();

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
      const resp = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData
      );
      console.log(resp.headers);
      const token = resp.headers.authorization.split(" ")[1];
      setToken(token);
      setUserid(resp.headers.userid);
      navigate(`http://localhost:3000/api/v1/user/${resp.headers.userid}`, { replace: true });
    }
  };

  return (
    <div>
      <h1>User Login</h1>
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
