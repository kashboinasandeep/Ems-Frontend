import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignModal = ({ onClose }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignDate, setAssignDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');  // Add state for deadline date
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchEmployeesAndProjects = async () => {
      try {
        const [employeeResponse, projectResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/employees'),
          axios.get('http://localhost:8000/api/projects')
        ]);
        setEmployees(employeeResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEmployeesAndProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/projectassignments', {
        employee: { id: employeeId },
        project: { id: projectId },
        assignDate,
        deadlineDate   // Include deadline date in the request
      });
      if (response.status === 201) {
        alert('Employee assigned successfully');
        onClose();
      } else {
        alert('Failed to assign employee');
      }
    } catch (error) {
      console.error('Error assigning employee:', error);
      alert('Error assigning employee');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2>Assign Employee to Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Employee:
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.fullname}
                </option>
              ))}
            </select>
          </label>
          <label>
            Project:
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Assign Date:
            <input
              type="date"
              value={assignDate}
              onChange={(e) => setAssignDate(e.target.value)}
              required
            />
          </label>
          <label>
            Deadline Date:  {/* Add deadline date field */}
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">Assign</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AssignModal;
