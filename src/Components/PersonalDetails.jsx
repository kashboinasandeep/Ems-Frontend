import React, { useState, useEffect } from 'react';

const PersonalDetails = ({ formData, setFormData, onNext }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showCurrentAddress, setShowCurrentAddress] = useState(false);
  const [showPermanentAddress, setShowPermanentAddress] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullname) errors.fullname = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.dob) errors.dob = 'Date of Birth is required';
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (!/^\d{2}$/.test(formData.age) || formData.age < 10 || formData.age > 99) {
      errors.age = 'Age must be a 2-digit number between 10 and 99';
    }
    if (!formData.mobilenumber) {
      errors.mobilenumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobilenumber)) {
      errors.mobilenumber = 'Mobile Number must be 10 digits';
    }
    if (!formData.emergencycontactnumber) errors.emergencycontactnumber = 'Emergency Contact Number is required';
    if (showCurrentAddress) {
      if (!formData.currentadd?.city) errors.currentadd_city = 'Current City is required';
      if (!formData.currentadd?.address1) errors.currentadd_address1 = 'Current Address 1 is required';
      if (!formData.currentadd?.pincode) {
        errors.currentadd_pincode = 'Current Pincode is required';
      } else if (!/^\d{6}$/.test(formData.currentadd.pincode)) {
        errors.currentadd_pincode = 'Current Pincode must be 6 digits';
      }
    }
    if (showPermanentAddress) {
      if (!formData.peradd?.city) errors.peradd_city = 'Permanent City is required';
      if (!formData.peradd?.address1) errors.peradd_address1 = 'Permanent Address 1 is required';
      if (!formData.peradd?.pincode) {
        errors.peradd_pincode = 'Permanent Pincode is required';
      } else if (!/^\d{6}$/.test(formData.peradd.pincode)) {
        errors.peradd_pincode = 'Permanent Pincode must be 6 digits';
      }
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split('.');
    if (subfield) {
      setFormData({
        ...formData,
        [field]: { ...formData[field], [subfield]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    validateForm();
    if (isFormValid) {
      onNext(true);
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
          width: auto;
          margin-right: 10px;
        }
        .form-group .error {
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
      `}</style>
      <h2>Personal Details</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          className={`form-control ${formErrors.fullname ? 'is-invalid' : ''}`}
          value={formData.fullname}
          onChange={handleChange}
        />
        {formErrors.fullname && <span className="error">{formErrors.fullname}</span>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          className={`form-control ${formErrors.gender ? 'is-invalid' : ''}`}
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formErrors.gender && <span className="error">{formErrors.gender}</span>}
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="text"
          name="age"
          className={`form-control ${formErrors.age ? 'is-invalid' : ''}`}
          value={formData.age}
          onChange={handleChange}
        />
        {formErrors.age && <span className="error">{formErrors.age}</span>}
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
          value={formData.dob}
          onChange={handleChange}
        />
        {formErrors.dob && <span className="error">{formErrors.dob}</span>}
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobilenumber"
          className={`form-control ${formErrors.mobilenumber ? 'is-invalid' : ''}`}
          value={formData.mobilenumber}
          onChange={handleChange}
        />
        {formErrors.mobilenumber && <span className="error">{formErrors.mobilenumber}</span>}
      </div>
      <div className="form-group">
        <label>Emergency Contact Number</label>
        <input
          type="text"
          name="emergencycontactnumber"
          className={`form-control ${formErrors.emergencycontactnumber ? 'is-invalid' : ''}`}
          value={formData.emergencycontactnumber}
          onChange={handleChange}
        />
        {formErrors.emergencycontactnumber && <span className="error">{formErrors.emergencycontactnumber}</span>}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={showCurrentAddress}
            onChange={() => setShowCurrentAddress(!showCurrentAddress)}
          />
          {' '}Current Address
        </label>
        {showCurrentAddress && (
          <>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="currentadd.city"
                className={`form-control ${formErrors.currentadd_city ? 'is-invalid' : ''}`}
                value={formData.currentadd?.city || ''}
                onChange={handleChange}
              />
              {formErrors.currentadd_city && <span className="error">{formErrors.currentadd_city}</span>}
            </div>
            <div className="form-group">
              <label>Address 1</label>
              <input
                type="text"
                name="currentadd.address1"
                className={`form-control ${formErrors.currentadd_address1 ? 'is-invalid' : ''}`}
                value={formData.currentadd?.address1 || ''}
                onChange={handleChange}
              />
              {formErrors.currentadd_address1 && <span className="error">{formErrors.currentadd_address1}</span>}
            </div>
            <div className="form-group">
              <label>Address 2</label>
              <input
                type="text"
                name="currentadd.address2"
                className="form-control"
                value={formData.currentadd?.address2 || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="currentadd.pincode"
                className={`form-control ${formErrors.currentadd_pincode ? 'is-invalid' : ''}`}
                value={formData.currentadd?.pincode || ''}
                onChange={handleChange}
              />
              {formErrors.currentadd_pincode && <span className="error">{formErrors.currentadd_pincode}</span>}
            </div>
          </>
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={showPermanentAddress}
            onChange={() => setShowPermanentAddress(!showPermanentAddress)}
          />
          {' '}Permanent Address
        </label>
        {showPermanentAddress && (
          <>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="peradd.city"
                className={`form-control ${formErrors.peradd_city ? 'is-invalid' : ''}`}
                value={formData.peradd?.city || ''}
                onChange={handleChange}
              />
              {formErrors.peradd_city && <span className="error">{formErrors.peradd_city}</span>}
            </div>
            <div className="form-group">
              <label>Address 1</label>
              <input
                type="text"
                name="peradd.address1"
                className={`form-control ${formErrors.peradd_address1 ? 'is-invalid' : ''}`}
                value={formData.peradd?.address1 || ''}
                onChange={handleChange}
              />
              {formErrors.peradd_address1 && <span className="error">{formErrors.peradd_address1}</span>}
            </div>
            <div className="form-group">
              <label>Address 2</label>
              <input
                type="text"
                name="peradd.address2"
                className="form-control"
                value={formData.peradd?.address2 || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="peradd.pincode"
                className={`form-control ${formErrors.peradd_pincode ? 'is-invalid' : ''}`}
                value={formData.peradd?.pincode || ''}
                onChange={handleChange}
              />
              {formErrors.peradd_pincode && <span className="error">{formErrors.peradd_pincode}</span>}
            </div>
          </>
        )}
      </div>

      <button onClick={handleNext} className="btn btn-primary">Next</button>
    </div>
  );
};

export default PersonalDetails;
