import React,{useState} from 'react'

const employer = () => {
    const [formData, setFormData] = useState({
    company: "",
    phone: "",
    email: "",
    address: ""
  })

  const [error,setError] = useState("");

  const ValidateForm = () => {
    if(!formData.company || !formData.phone || !formData.email || !formData.address) {
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
        <h1>Employer</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    <form>
  <div className="mb-3">
    <label htmlFor="company" className="form-label">company</label>
    <input type="text" className="form-control" id="company" name='company' required
      value={formData.company}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="phone" className="form-label">Phone</label>
    <input type="number" className="form-control" id="phone" name='phone' required
      value={formData.phone}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' required
      value={formData.email}
      onChange={handleInputChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name='address' required
      value={formData.address}
      onChange={handleInputChange}
    />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default employer;