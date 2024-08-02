import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Email is invalid";
    if (!formData.phonenumber) formErrors.phonenumber = "Number is required";
    else if (formData.phonenumber.length > 10) formErrors.phonenumber = "Number must be only 10 digits"
    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 6) formErrors.password = "Password must be at least 6 characters";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="form-container">
      <h2>Please fill the Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
          placeholder='Name'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
          placeholder='Email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
          placeholder='Mobile'
            type="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
          {errors.phonenumber && <p>{errors.phonenumber}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
          placeholder='Password'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <a href="/view-data" className="view-data-button">View Saved Data</a>
    </div>
  );
};

export default FormComponent;
