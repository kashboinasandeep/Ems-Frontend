import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import ProjectDetails from './ProjectDetails';
import ProfessionalDetails from './ProfessionalDetails';
import FinancialDetails from './FinancialDetails';
import axios from 'axios';
import { Container, Row, Col, Nav, Button, ProgressBar } from 'react-bootstrap';

const MainForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    gender: '',
    dob: '',
    mobilenumber: '',
    emergencycontactnumber: '',
    companyname: '',
    officelocation: '',
    designation: '',
    department: '',
    experience: '',
    joiningdate: '',
    hrname: '',
    aadharnumber: '',
    pancardnumber: '',
    bankaccountnumber: '',
    reportingmanager:'',
    hrname:'',
    Empcode:'',
    officeAddress: {
      address1: '',
      address2: '',
      pincode: ''
    }
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/employees', formData);
      console.log(response.data);
      alert('Employee created successfully!');
      navigate('/view');
    } catch (error) {
      // Error handling
    }
  };

  const nextStep = (isValid) => {
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const steps = [
    { component: PersonalDetails, title: 'Personal Details' },
    { component: ProjectDetails, title: 'Project Details' },
    { component: ProfessionalDetails, title: 'Professional Details' },
    { component: FinancialDetails, title: 'Financial Details' },
  ];

  const CurrentComponent = steps[step - 1].component;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <ProgressBar now={(step / steps.length) * 100} className="mb-4" />
          <div className="mb-4">
            <Nav variant="pills" className="justify-content-center">
              {steps.map((stepItem, index) => (
                <Nav.Item key={index}>
                  <Nav.Link className={step === index + 1 ? 'active' : ''} disabled={step !== index + 1}>
                    {stepItem.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          <CurrentComponent formData={formData} setFormData={setFormData} onNext={() => nextStep(true)} />

          <div className="d-flex justify-content-between mt-4">
            {step > 1 && <Button variant="secondary" onClick={prevStep}>Back</Button>}
            {step < steps.length && <Button variant="primary" onClick={() => nextStep(true)}>Skip</Button>}
            {step === steps.length && <Button variant="success" onClick={handleSubmit}>Submit</Button>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainForm;
