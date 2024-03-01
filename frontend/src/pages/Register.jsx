import React, { useState } from 'react';
import axios from "axios";

const Register = () => {
  const [form,setForm] = useState({
    email: "",
    password: "",
    cpassword: "",
    isAdmin: false
  })
  const [error, setError] = useState("");
  const [setReset] = useState(null);

  const handleChange = (e) => {
    const {name,value, type, checked} = e.target;
    const val = (type === 'checkbox' ? checked : value);
    // console.log(checked);
    setForm(prevData => ({
      ...prevData, [name]: val
    }))
  }

  const ValidateForm = () => {
    if(!form.email || !form.password || !form.cpassword) {
      setError('All fields are compulsary!');
      return false;
    } else if(form.password !== form.cpassword) {
      setError('password and confirm password shd be same');
    }
    return true;
  }

  const sendFormData = (e) => {
    e.preventDefault();
    if(ValidateForm()) 
    axios.post("API", form)
    .then((res) => {console.log("response", res)})
    .catch((err) => {console.log("Error", err)})
  }

  return (
    <div>
    <h1>Registration</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form>
  <div className="mb-3">
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" 
    className="form-control" 
    id="exampleInputEmail1" 
    name='email'
    aria-describedby="emailHelp" 
    value={form.email}
    onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="passord" className="form-label">Password</label>
    <input type="password" 
    className="form-control" 
    id="password" 
    name='password'
    aria-describedby="emailHelp" 
    value={form.password}
    onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" 
    className="form-control" 
    id="cpassword" 
    name='cpassword'
    value={form.cpassword}
    onChange={handleChange}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" 
    className="form-check-input" 
    id="isAdmin" 
    name='isAdmin'
    value={form.isAdmin}
    onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="isAdmin">isAdmin</label>
  </div>
  <button  className="btn btn-danger" onClick={() => setReset("")}>Reset</button>
  <button type="submit" className="btn btn-primary" onClick={sendFormData}>Submit</button>
</form>
    </div>
  )
}

export default Register;