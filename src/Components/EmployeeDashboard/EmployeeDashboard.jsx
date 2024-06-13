import React from 'react';
import "./Empdash.css"
import PayslipButton from './PayslipButton';
import ViewEmpDetails from './ViewEmpDetails';

const EmployeeDashboard = () => {
  return (
    <>
    <ViewEmpDetails/>
    <PayslipButton/>
    </>
  );
};

export default EmployeeDashboard;