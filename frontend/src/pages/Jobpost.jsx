import  { useState } from 'react';

const Jobpost = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    pay: "",
    skills: [
      // "Node", "React", "Angular", "Java", "C++", "Python"
    ]
  })

  const [error,setError] = useState("");

  const ValidateForm = () => {
    if(!formData.title || !formData.location || !formData.pay  || formData.skills.length === 0) {
      setError('All fields are compulsary!');
      return false;
    } else if(formData.pay.length < 2) {
      setError("Pay should be at most 2 characters long.")
      return false;
    }
    return true;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox inputs
      if (checked) {
        // If checked, add the skill to the array
        setFormData({
          ...formData,
          skills: [...formData.skills, value]
        });
      } else {
        // If unchecked, remove the skill from the array
        setFormData({
          ...formData,
          skills: formData.skills.filter(skill => skill !== value)
        });
      }
    } else {
      // Handle other input types
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ValidateForm())
    console.log("submitted");
    console.log(formData);
  }

  return (
    <div>
      <h1>Jobpost</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    <form>
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' required
      value={formData.title}
      onChange={handleInputChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" id="location" name='location' required
      value={formData.location}
      onChange={handleInputChange}
    />

  </div>
  <div className="mb-3">
    <label htmlFor="pay" className="form-label">Pay</label>
    <input type="number" className="form-control" id="pay" name='pay' required
      value={formData.pay}
      onChange={handleInputChange}
    />

  </div>

  <label className="form-label">Skills</label>
  <br />
  <div className="mb-3">
  <div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" id="node" 
   name='node'
  value="node"
  onChange={handleInputChange}
  />
  <label className="form-check-label" htmlFor="node">Node</label>
</div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" 
  id="react" 
  name='react'
  value="react"
  onChange={handleInputChange}/>
  <label className="form-check-label" htmlFor="react">React</label>
</div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" 
  id="angular" 
  name='angular' 
  value="angular"
    onChange={handleInputChange}
  />
  <label className="form-check-label" htmlFor="angular">Angular</label>
</div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" 
  id="java" 
  name='java'
  value="java"
  onChange={handleInputChange}
  />
  <label className="form-check-label" htmlFor="java">Java</label>
</div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" 
  name='cpp'
  id="cpp" 
  value="cpp"
  onChange={handleInputChange}
  />
  <label className="form-check-label" htmlFor="cpp">C++</label>
</div>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" 
  name='python'
  id="python" 
  value="python"
  onChange={handleInputChange}/>
  <label className="form-check-label" htmlFor="python">Python</label>
</div>
</div>

  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Jobpost

