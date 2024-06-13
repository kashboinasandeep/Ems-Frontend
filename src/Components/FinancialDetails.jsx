import React, { useState } from 'react';

const FinancialDetails = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({
    aadharnumber: '',
    pancardnumber: '',
    bankaccountnumber: '',
    ifsc: ''
  });

  const validateAadhar = (value) => {
    return /^\d{12}$/.test(value) ? '' : 'Aadhar number must be 12 digits';
  };

  const validatePAN = (value) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? '' : 'Invalid PAN card number';
  };

  const validateBankAccount = (value) => {
    return /^\d{9,18}$/.test(value) ? '' : 'Bank account number must be between 9 and 18 digits';
  };

  const validateIFSC = (value) => {
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? '' : 'Invalid IFSC code';
  };

  const handleChange = (field, value) => {
    let error = '';

    switch (field) {
      case 'aadharnumber':
        error = validateAadhar(value);
        break;
      case 'pancardnumber':
        error = validatePAN(value);
        break;
      case 'bankaccountnumber':
        error = validateBankAccount(value);
        break;
      case 'ifsc':
        error = validateIFSC(value);
        break;
      default:
        break;
    }

    setErrors({ ...errors, [field]: error });
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <h2>Financial Details</h2>
      <div className="form-group">
        <label>Aadhar Number</label>
        <input
          type="text"
          className={`form-control ${errors.aadharnumber ? 'is-invalid' : ''}`}
          value={formData.aadharnumber}
          onChange={(e) => handleChange('aadharnumber', e.target.value)}
        />
        {errors.aadharnumber && <div className="invalid-feedback">{errors.aadharnumber}</div>}
      </div>
      <div className="form-group">
        <label>PAN Card Number</label>
        <input
          type="text"
          className={`form-control ${errors.pancardnumber ? 'is-invalid' : ''}`}
          value={formData.pancardnumber}
          onChange={(e) => handleChange('pancardnumber', e.target.value)}
        />
        {errors.pancardnumber && <div className="invalid-feedback">{errors.pancardnumber}</div>}
      </div>
      <div className="form-group">
        <label>Bank Account Number</label>
        <input
          type="text"
          className={`form-control ${errors.bankaccountnumber ? 'is-invalid' : ''}`}
          value={formData.bankaccountnumber}
          onChange={(e) => handleChange('bankaccountnumber', e.target.value)}
        />
        {errors.bankaccountnumber && <div className="invalid-feedback">{errors.bankaccountnumber}</div>}
      </div>
      <div className="form-group">
        <label>IFSC Code</label>
        <input
          type="text"
          className={`form-control ${errors.ifsc ? 'is-invalid' : ''}`}
          value={formData.ifsc}
          onChange={(e) => handleChange('ifsc', e.target.value)}
        />
        {errors.ifsc && <div className="invalid-feedback">{errors.ifsc}</div>}
      </div>
    </div>
  );
};

export default FinancialDetails;
