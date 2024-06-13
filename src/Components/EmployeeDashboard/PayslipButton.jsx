import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PayslipButton = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const payslipRefs = useRef([]);

  const monthlyDetails = [
    { month: 'January', basicPay: 15000, allowance: 5000, esi: 1000, pf: 2000, grossPay: 25000, netPay: 22000 },
    { month: 'February', basicPay: 16000, allowance: 4500, esi: 1100, pf: 2100, grossPay: 25500, netPay: 22300 },
    { month: 'March', basicPay: 15500, allowance: 4700, esi: 1050, pf: 2050, grossPay: 25250, netPay: 22100 },
    { month: 'April', basicPay: 15800, allowance: 4800, esi: 1080, pf: 2080, grossPay: 25680, netPay: 22400 },
    { month: 'May', basicPay: 16200, allowance: 4900, esi: 1120, pf: 2120, grossPay: 26120, netPay: 22780 },
    { month: 'June', basicPay: 16400, allowance: 5000, esi: 1150, pf: 2150, grossPay: 26500, netPay: 23000 },
    { month: 'July', basicPay: 17600, allowance: 4000, esi: 1150, pf: 2150, grossPay: 21400, netPay: 18100 },
    { month: 'August', basicPay: 16800, allowance: 4500, esi: 1150, pf: 2150, grossPay: 21300, netPay: 18000 },
    { month: 'September', basicPay: 17400, allowance: 4300, esi: 1150, pf: 2150, grossPay: 21700, netPay: 18400 },
    { month: 'October', basicPay: 17100, allowance: 4700, esi: 1150, pf: 2150, grossPay: 21800, netPay: 18500 },
    { month: 'November', basicPay: 18200, allowance: 4900, esi: 1150, pf: 2150, grossPay: 23100, netPay: 19800 },
    { month: 'December', basicPay: 15700, allowance: 4100, esi: 1150, pf: 2150, grossPay: 19800, netPay: 16500 },
  ];

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setIsDateSelected(!!e.target.value && !!endDate && validateDateRange(e.target.value, endDate));
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setIsDateSelected(!!e.target.value && !!startDate && validateDateRange(startDate, e.target.value));
  };

  const validateDateRange = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const timeDiff = endD.getTime() - startD.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff <= 183; // 183 days ~ 6 months
  };

  const handleDownload = async () => {
    if (isDateSelected) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFont("helvetica", "bold");

      for (let i = 0; i < payslipRefs.current.length; i++) {
        if (payslipRefs.current[i]) {
          const canvas = await html2canvas(payslipRefs.current[i], { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }
      }

      pdf.save('payslip.pdf');
    } else {
      alert('Please select a valid start and end date within a 6-month range before downloading the payslip');
    }
  };

  const generatePayslipContent = (details, index) => (
    <div key={index} ref={el => payslipRefs.current[index] = el} style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', pageBreakAfter: 'always' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '1.5rem' }}>Excelr solutions</h1>
          <p style={{ margin: '0.25rem 0' }}>Btm ,silkboard</p>
          <p style={{ margin: '0.25rem 0' }}>9865342112</p>
        </div>
        <div>
          <h2 style={{ margin: '0', fontSize: '1.5rem' }}>Payslip</h2>
          <p style={{ margin: '0.25rem 0', textAlign: 'right' }}>{details.month}</p>
        </div>
      </header>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <div>
          <p><strong>Employee ID:</strong> 12</p>
          <p><strong>Name:</strong> Lawrence</p>
          <p><strong>Department:</strong> IT</p>
          <p><strong>Designation:</strong> Software Engineer</p>
        </div>
        <div>
          <p><strong>Bank A/C:</strong> XXXX-XXXX-XXXX-1234</p>
          <p><strong>PAN:</strong> ABCDE1234F</p>
          <p><strong>PF No:</strong> PF123456</p>
          <p><strong>ESI No:</strong> ESI123456</p>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif', marginBottom: '1rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem', backgroundColor: '#f2f2f2', color: '#333' }}>Earnings</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem', backgroundColor: '#f2f2f2', color: '#333' }}>Amount (₹)</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem', backgroundColor: '#f2f2f2', color: '#333' }}>Deductions</th>
            <th style={{ border: '1px solid #ddd', padding: '0.75rem', backgroundColor: '#f2f2f2', color: '#333' }}>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Basic Pay</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.basicPay}</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>ESI</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.esi}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Allowance</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.allowance}</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>PF</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.pf}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Gross Pay</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.grossPay}</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>Total Deductions</td>
            <td style={{ border: '1px solid #ddd', padding: '0.75rem' }}>{details.esi + details.pf}</td>
          </tr>
          <tr>
            <td colSpan="2" style={{ border: '1px solid #ddd', padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>Net Pay</td>
            <td colSpan="2" style={{ border: '1px solid #ddd', padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>{details.netPay}</td>
          </tr>
        </tbody>
      </table>
      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        <p>This is a computer-generated payslip and does not require a signature.</p>
        <p>For any queries, contact the HR department.</p>
      </footer>
    </div>
  );

  const startMonth = new Date(startDate).getMonth();
  const endMonth = new Date(endDate).getMonth();
  const selectedPayslips = monthlyDetails.slice(startMonth, endMonth + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', backgroundColor: '#f0f0f0' }}>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <div style={{ marginRight: '1rem' }}>
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
            Start Date:
            <input type="date" value={startDate} onChange={handleStartDateChange} style={{ marginLeft: '0.5rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </label>
        </div>
        <div>
          <label style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
            End Date:
            <input type="date" value={endDate} onChange={handleEndDateChange} style={{ marginLeft: '0.5rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }} />
          </label>
        </div>
      </div>
      <button onClick={handleDownload} style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Download Payslip</button>
      {isDateSelected && selectedPayslips.map((details, index) => generatePayslipContent(details, index))}
    </div>
  );
};

export default PayslipButton;
