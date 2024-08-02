import React from 'react';

const ViewData = () => {
  const formData = JSON.parse(localStorage.getItem('formData'));

  return (
    <div className="form-container">
      <h2>Saved Data</h2>
      {formData ? (
        <div>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Mobile Number:</strong>{formData.phonenumber}</p>
          <p><strong>Password:</strong> {formData.password}</p>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default ViewData;
