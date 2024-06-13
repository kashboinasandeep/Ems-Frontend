import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ViewDetails = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('There was an error fetching the employee details.');
      });
  }, []);

  

 

  const handleLogout = () => {
    navigate('/login');
  };

  if (employees.length === 0) {
    return <p>No records available</p>;
  }

  return (
    <div className="view-container">
      <div className="header">
        <h2>Employee Details</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <section className="personal-info">
            <h4>Personal Information</h4>
            <p><strong>Full Name:</strong> {employee.fullname}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Date of Birth:</strong> {employee.dob}</p>
          </section>
          <section className="contact-info">
            <h4>Contact Information</h4>
            <p><strong>Mobile Number:</strong> {employee.mobilenumber}</p>
            <p><strong>Emergency Contact Number:</strong> {employee.emergencycontactnumber}</p>
          </section>
          <section className="employment-info">
            <h4>Professional Details</h4>
            <p><strong>Emp Code:</strong> {employee.empcode}</p>
            <p><strong>Company Name:</strong> {employee.companyname}</p>
            <p><strong>Joining Date:</strong> {employee.joiningdate}</p>
            <p><strong>HR Name:</strong> {employee.hrname}</p>
            <p><strong>office phone:</strong> {employee.officephone}</p>
            <p><strong>office Email:</strong> {employee.offid}</p>
            <p><strong>city:</strong> {employee.city}</p>
            <p><strong>Reporting Manager:</strong> {employee.reportingmanager}</p>

            
          </section>
          <section className="financial-info">
            <h4>Financial Information</h4>
            <p><strong>Aadhar Number:</strong> {employee.aadharnumber}</p>
            <p><strong>PAN Card Number:</strong> {employee.pancardnumber}</p>
            <p><strong>Bank Account Number:</strong> {employee.bankaccountnumber}</p>
            <p><strong>IFSC:</strong> {employee.ifsc}</p>
          </section>
        
        </div>
      ))}
    </div>
  );
};

export default ViewDetails;
