import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewDetails.css';

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

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${id}`);
      setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error(error);
      alert('There was an error deleting the employee.');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (employees.length === 0) {
    return <p className="no-records">No records available</p>;
  }

  return (
    <div className="view-container">
      <div className="header">
        <h2>Employee Details</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <div className="info-section">
            <div className="personal-info">
              <h3>Personal Information</h3>
              <p><strong>Full Name:</strong> {employee.fullname}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Date of Birth:</strong> {employee.dob}</p>
              <p><strong>Age:</strong> {employee.age}</p>
              <p><strong>Mobile Number:</strong> {employee.mobilenumber}</p>
              <p><strong>Emergency Contact Number:</strong> {employee.emergencycontactnumber}</p>
              {employee.currentAddress && (
                <div>
                  <h4>Current Address</h4>
                  <p><strong>Address Line 1:</strong> {employee.currentAddress.address1}</p>
                  <p><strong>Address Line 2:</strong> {employee.currentAddress.address2}</p>
                  <p><strong>Pincode:</strong> {employee.currentAddress.pincode}</p>
                  <p><strong>City:</strong> {employee.currentAddress.city}</p>
                </div>
              )}
              {employee.permanentAddress && (
                <div>
                  <h4>Permanent Address</h4>
                  <p><strong>Address Line 1:</strong> {employee.permanentAddress.address1}</p>
                  <p><strong>Address Line 2:</strong> {employee.permanentAddress.address2}</p>
                  <p><strong>Pincode:</strong> {employee.permanentAddress.pincode}</p>
                  <p><strong>City:</strong> {employee.permanentAddress.city}</p>
                </div>
              )}
            </div>
          </div>
          <div className="info-section">
            <div className="employment-info">
              <h3>Professional Details</h3>
              <p><strong>Emp Code:</strong> {employee.empcode}</p>
              <p><strong>Company Name:</strong> {employee.companyname}</p>
              <p><strong>Joining Date:</strong> {employee.joiningdate}</p>
              <p><strong>HR Name:</strong> {employee.hrname}</p>
              <p><strong>Office Phone:</strong> {employee.officephone}</p>
              <p><strong>Office Email:</strong> {employee.officeemail}</p>
              <p><strong>City:</strong> {employee.city}</p>
              <p><strong>Reporting Manager:</strong> {employee.reportingmanager}</p>
              {employee.currentAddress && (
                <div>
                  <h4>Current Address</h4>
                  <p><strong>Address Line 1:</strong> {employee.currentAddress.address1}</p>
                  <p><strong>Address Line 2:</strong> {employee.currentAddress.address2}</p>
                  <p><strong>Pincode:</strong> {employee.currentAddress.pincode}</p>
                  <p><strong>City:</strong> {employee.currentAddress.city}</p>
                </div>
              )}
              {employee.permanentAddress && (
                <div>
                  <h4>Permanent Address</h4>
                  <p><strong>Address Line 1:</strong> {employee.permanentAddress.address1}</p>
                  <p><strong>Address Line 2:</strong> {employee.permanentAddress.address2}</p>
                  <p><strong>Pincode:</strong> {employee.permanentAddress.pincode}</p>
                  <p><strong>City:</strong> {employee.permanentAddress.city}</p>
                </div>
              )}
            </div>
            <div className="financial-info">
              <h3>Financial Details</h3>
              <p><strong>Aadhar Number:</strong> {employee.aadharnumber}</p>
              <p><strong>PAN Card Number:</strong> {employee.pancardnumber}</p>
              <p><strong>Bank Account Number:</strong> {employee.bankaccountnumber}</p>
              <p><strong>IFSC:</strong> {employee.ifsc}</p>
            </div>
          </div>
          <div className="action-buttons">
            <button className="edit-button" onClick={() => handleEdit(employee.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(employee.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewDetails;
