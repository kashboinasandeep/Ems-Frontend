import React, { useState, useEffect } from 'react';

const ProfessionalDetails = ({ formData, setFormData, onNext }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.empcode) {
      errors.empcode = 'Employee code is required';
    } else if (formData.empcode.length !== 6) {
      errors.empcode = 'Employee code must be 6 digits long';
    }
    if (!formData.companyname) errors.companyname = 'Company Name is required';
    if (!formData.reportingmanager) errors.reportingmanager = 'Reporting manager is required';
    if (!formData.hrname) errors.hrname = 'HR Name is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.officephone) {
      errors.officephone = 'Office phone number is required';
    } else if (formData.officephone.length < 8 || formData.officephone.length > 12) {
      errors.officephone = 'Office phone number must be between 8 and 12 digits';
    }
    if (!formData.offid) errors.offid = 'Office Mail ID is required';
    if (!formData.joiningdate) errors.joiningdate = 'Joining Date is required';

    // Additional validation for office address fields
    if (formData.OfficeAddress && (!formData.officeAddress || !formData.officeAddress.address1 || !formData.officeAddress.address2 || !formData.officeAddress.pincode || formData.officeAddress.pincode.length !== 6)) {
      errors.officeAddress = 'Office Address is required';
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name.startsWith('officeAddress.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        officeAddress: {
          ...formData.officeAddress,
          [addressField]: newValue || ''
        }
      });
    } else {
      setFormData({ ...formData, [name]: newValue || '' });
    }
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    } else {
      validateForm();
    }
  };

  return (
    <div>
      <style>{`
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        .form-group input[type="checkbox"] {
          width: 1%;
        }
        .error {
          color: red;
          font-size: 0.875em;
          margin-top: 5px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          outline: none;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          box-shadow: 0 4px #999;
        }
        .btn:hover {background-color: #0069d9}
        .btn:active {
          background-color: #0069d9;
          box-shadow: 0 2px #666;
          transform: translateY(2px);
        }
        .checkbox-group {
          margin-bottom: 15px;
        }
        .checkbox-group .form-check-input {
          margin-right: 10px;
          position:relative;
        }
      `}</style>
      <h2>Professional Details</h2>
      <div className="form-group">
        <label>Emp code</label>
        <input
          type="text"
          name="empcode"
          className="form-control"
          value={formData.empcode || ''}
          onChange={handleChange}
        />
        {formErrors.empcode && <span className="error">{formErrors.empcode}</span>}
      </div>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="companyname"
          className="form-control"
          value={formData.companyname || ''}
          onChange={handleChange}
        />
        {formErrors.companyname && <span className="error">{formErrors.companyname}</span>}
      </div>
      <div className="form-group">
        <label>Reporting Manager</label>
        <input
          type="text"
          name="reportingmanager"
          className="form-control"
          value={formData.reportingmanager || ''}
          onChange={handleChange}
        />
        {formErrors.reportingmanager && <span className="error">{formErrors.reportingmanager}</span>}
      </div>
      <div className="form-group">
        <label>HR Name</label>
        <input
          type="text"
          name="hrname"
          className="form-control"
          value={formData.hrname || ''}
          onChange={handleChange}
        />
        {formErrors.hrname && <span className="error">{formErrors.hrname}</span>}
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={formData.city || ''}
          onChange={handleChange}
        />
        {formErrors.city && <span className="error">{formErrors.city}</span>}
      </div>
      <div className="form-group">
        <label>Office Phone</label>
        <input
          type="text"
          name="officephone"
          className="form-control"
          value={formData.officephone || ''}
          onChange={handleChange}
        />
        {formErrors.officephone && <span className="error">{formErrors.officephone}</span>}
      </div>
      <div className="form-group">
        <label>Office Mail ID</label>
        <input
          type="text"
          name="offid"
          className="form-control"
          value={formData.offid || ''}
          onChange={handleChange}
        />
        {formErrors.offid && <span className="error">{formErrors.offid}</span>}
      </div>
      <div className="form-group">
        <label>Joining Date</label>
        <input
          type="date"
          name="joiningdate"
          className="form-control"
          value={formData.joiningdate || ''}
          onChange={handleChange}
        />
        {formErrors.joiningdate && <span className="error">{formErrors.joiningdate}</span>}
      </div>
      <div className="form-group checkbox-group">
      <label style={{ marginRight: '0.5rem' }}>Office Address</label>
        <input
          type="checkbox"
          name="OfficeAddress"
          className="form-check-input"
          checked={!!formData.OfficeAddress}
          onChange={handleChange}
        />
       
      </div>
      {formData.OfficeAddress && (
        <div>
          <div className="form-group">
            <label>Office Address Line 1</label>
            <input
              type="text"
              name="officeAddress.address1"
              className="form-control"
              value={(formData.officeAddress && formData.officeAddress.address1) || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Office Address Line 2</label>
            <input
              type="text"
              name="officeAddress.address2"
              className="form-control"
              value={(formData.officeAddress && formData.officeAddress.address2) || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="officeAddress.pincode"
              className="form-control"
              value={(formData.officeAddress && formData.officeAddress.pincode) || ''}
              onChange={handleChange}
            />
            {formErrors.officeAddress && <span className="error">{formErrors.officeAddress}</span>}
          </div>
        </div>
      )}

      <button onClick={handleNext} className="btn btn-primary">Next</button>
    </div>
  );
};

export default ProfessionalDetails;
