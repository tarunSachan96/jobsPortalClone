import React, { useState } from 'react'

const Jobseeker = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
    college: "",
    degree: []
  })
  const [error,setError] = useState("");

  const ValidateForm = () => {
    if(!formData.email || !formData.age || !formData.address || formData.degree.length === 0 || !formData.phone || !formData.college) {
      setError('All fields are compulsary!');
      return false;
    }
    return true;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ValidateForm())
    console.log("submitted");
    console.log(formData);
  }

  return (
    <div>
    <h1>Jobseeker Details</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form className="row g-3">
  <div className="col-md-6">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" 
    className="form-control" 
    id="name" 
    name='name'
    value={formData.name}
    onChange={handleInputChange}
    />
  </div>

  <div className="col-md-6">
    <label htmlFor="age" className="form-label">Age</label>
    <input type="number" 
    className="form-control" 
    id="age" 
    name='age'
    value={formData.age}
    onChange={handleInputChange}
    />
  </div>

  <div className="col-12">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" 
    className="form-control" 
    id="address" name='address' 
    placeholder="Enter your address"
    value={formData.address} 
    onChange={handleInputChange}
    />
  </div>

  <div className="col-md-3">
    <label htmlFor="degree" className="form-label">Degree</label>
    <select id="degree" className="form-select" name='degree' value={formData.degree} onChange={handleInputChange}>
      <option defaultChecked>Choose Degree</option>
      <option>B.Tech</option>
      <option>M.Tech</option>
      <option>B.Tech</option>
      <option>B.Com</option>
      <option>M.Com</option>
      <option>BA</option>
      <option>MA</option>
      <option>B.Sc</option>
    </select>
  </div>

  <div className="col-md-4">
    <label htmlFor="phone" className="form-label">Phone</label>
    <input type="number" 
    className="form-control" 
    id="phone"
    name='phone'
    value={formData.phone} 
    onChange={handleInputChange}
    />
  </div>

  <div className="col-md-5">
    <label htmlFor="college" className="form-label">College</label>
    <input type="text" 
    className="form-control" 
    id="college" 
    name='college'
    value={formData.college}
    onChange={handleInputChange}
    />
  </div>

  <div className="col-12">
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </div>
</form>
    </div>
  )
}

export default Jobseeker