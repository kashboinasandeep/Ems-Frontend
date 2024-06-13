import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeForm, setEmployeeForm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/employees/${id}`)
      .then(response => {
        setEmployeeForm(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('There was an error fetching the employee details.');
      });
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/employees/${id}`, employeeForm)
      .then(() => {
        navigate('/view');
      })
      .catch(error => {
        console.error(error);
        alert('There was an error updating the employee details.');
      });
  };

  if (!employeeForm) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-form">
      <h3>Edit Employee</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Empcode:</label>
          <input type="text" name="empcode" value={employeeForm.empcode} disabled onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullname" value={employeeForm.fullname} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employeeForm.email} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={employeeForm.gender} disabled onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={employeeForm.dob} disabled onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="text" name="mobilenumber" value={employeeForm.mobilenumber} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Emergency Contact Number:</label>
          <input type="text" name="emergencycontactnumber" value={employeeForm.emergencycontactnumber} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Company Name:</label>
          <input type="text" name="companyname" value={employeeForm.companyname} disabled />
        </div>
        <div className="form-group">
          <label>Office Mail:</label>
          <input type="text" name="offid" value={employeeForm.offid} disabled />
        </div>
        
        
        
        <div className="form-group">
          <label>Joining Date:</label>
          <input type="date" name="joiningdate" value={employeeForm.joiningdate} disabled onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>HR Name:</label>
          <input type="text" name="hrname" value={employeeForm.hrname} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>Aadhar Number:</label>
          <input type="text" name="aadharnumber" value={employeeForm.aadharnumber} disabled />
        </div>
        <div className="form-group">
          <label>PAN Card Number:</label>
          <input type="text" name="pancardnumber" value={employeeForm.pancardnumber} disabled />
        </div>
        <div className="form-group">
          <label>Bank Account Number:</label>
          <input type="text" name="bankaccountnumber" value={employeeForm.bankaccountnumber} onChange={handleFormChange} />
        </div>
        <div className="form-group">
          <label>IFSC:</label>
          <input type="text" name="ifsc" value={employeeForm.ifsc} onChange={handleFormChange} />
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/view')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
