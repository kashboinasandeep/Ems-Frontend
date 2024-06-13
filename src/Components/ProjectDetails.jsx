import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectDetails.css';
import AssignModal from '../Components/Modal/AssignModal';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    reportingManager: '',
    technicalLead: '',
    status: 'UNKNOWN',
    
  });
  const [editFormProject, setEditFormProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects');
        setProjects(response.data);
      } catch (error) {
        setError('Error fetching project data');
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        setError('Error fetching employee data');
      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const handleFieldChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleNewFieldChange = (field, value) => {
    setNewProject({ ...newProject, [field]: value });
  };

  const handleEditFieldChange = (field, value) => {
    setEditFormProject({ ...editFormProject, [field]: value });
  };

  const handleEditFormChange = (e) => {
    setEditFormProject({
      ...editFormProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (index) => {
    const projectToSave = projects[index];
    try {
      await axios.put(`http://localhost:8000/api/projects/${projectToSave.id}`, projectToSave);
      setSelectedProject(projectToSave);
      alert('Project updated successfully');
    } catch (error) {
      alert('Failed to update project');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'status-badge status-completed';
      case 'ONGOING':
        return 'status-badge status-ongoing';
      case 'UNKNOWN':
        return 'status-badge status-unknown';
      default:
        return '';
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:8000/api/projects/${projectId}`);
        setProjects(projects.filter(project => project.id !== projectId));
        setSelectedProject(null);
        alert('Project deleted successfully');
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleEmployeeDelete = async (employeeId, projectId) => {
    if (window.confirm('Are you sure you want to remove this employee from the project?')) {
      try {
        await axios.delete('http://localhost:8000/api/projectassignments', {
          params: { employeeId, projectId }
        });
        const response = await axios.get(`http://localhost:8000/api/projectassignments/${projectId}`);
        const updatedAssignedEmployees = response.data;
        setSelectedProject({ ...selectedProject, assignedEmployees: updatedAssignedEmployees });
        alert('Employee removed successfully');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Employee assignment not found, it might have already been removed.');
        } else {
          console.error('Failed to remove employee:', error);
          alert('Failed to remove employee');
        }
      }
    }
  };

  const handleSelectProject = async (project) => {
    setLoading(true);
    setError(null);
    setSelectedProject(project);
    try {
      const response = await axios.get(`http://localhost:8000/api/projectassignments/${project.id}`);
      setSelectedProject({ ...project, assignedEmployees: response.data });
    } catch (error) {
      setError('Error fetching assigned employees');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/projects/${editFormProject.id}`, editFormProject);
      if (response.status === 200) {
        const updatedProject = response.data;
        const updatedProjects = projects.map(project =>
          project.id === updatedProject.id ? updatedProject : project
        );
        setProjects(updatedProjects);
        alert('Project updated successfully');
        setIsEditing(null);
        setEditFormProject(null);
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project');
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/projects', newProject);
      if (response.status === 201) {
        const addedProject = response.data;
        setProjects([...projects, addedProject]);
        setIsAdding(false);
        alert('Project added successfully');
      } else {
        alert('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project');
    }
  };

  const handleView = async (project) => {
    setLoading(true);
    setError(null);
    try {
      const assignedEmployeesResponse = await axios.get(`http://localhost:8000/api/projectassignments/${project.id}`);
      const assignedEmployees = assignedEmployeesResponse.data;
      setSelectedProject({ ...project, assignedEmployees });
    } catch (error) {
      console.error('Error fetching assigned employees:', error);
      alert('Error fetching assigned employees');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const closeAddModal = () => {
    setIsAdding(false);
  };

  const closeEditModal = () => {
    setIsEditing(null);
    setEditFormProject(null);
  };

  const handleAssignClick = () => {
    setShowModal(true);
  };

  const closeAssignModal = () => {
    setShowModal(false);
  };

  const handleAssignedEmployeeFieldChange = (employeeId, field, value) => {
    const updatedAssignedEmployees = selectedProject.assignedEmployees.map(employee => {
      if (employee.id === employeeId) {
        return { ...employee, [field]: value };
      }
      return employee;
    });
    setSelectedProject({ ...selectedProject, assignedEmployees: updatedAssignedEmployees });
  };

  const handleSaveAssignedEmployee = async (employee) => {
    try {
      await axios.put(`http://localhost:8000/api/projectassignments/${employee.id}`, employee);
      alert('Assigned employee updated successfully');
    } catch (error) {
      alert('Failed to update assigned employee');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="project-details">
      <h2>Project Details</h2>
      <button className="add-project-button" onClick={() => setIsAdding(true)}>Add Project</button>
      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reporting Manager</th>
            <th>Technical Lead</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.clientName}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.reportingManager}</td>
              <td>{project.technicalLead}</td>
              <td>
                <span className={getStatusClass(project.status)}>{project.status}</span>
              </td>
              <td>
                <i className="fas fa-eye action-icon" onClick={() => handleView(project)}></i>
                <i className="fas fa-edit action-icon" onClick={() => { setIsEditing(project.id); setEditFormProject(project); }}></i>
                <i className="fas fa-trash-alt action-icon" onClick={() => handleDelete(project.id)}></i>
                <i className="fa-solid fa-user-plus cursor-pointer" onClick={handleAssignClick}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>{selectedProject.projectName}</h3>
            <p><strong>Client Name:</strong> {selectedProject.clientName}</p>
            <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
            <p><strong>End Date:</strong> {selectedProject.endDate}</p>
            <p><strong>Reporting Manager:</strong> {selectedProject.reportingManager}</p>
            <p><strong>Technical Lead:</strong> {selectedProject.technicalLead}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            
            <h4>Assigned Employees:</h4>
            <ul>
              {selectedProject.assignedEmployees && selectedProject.assignedEmployees.length > 0 ? (
                selectedProject.assignedEmployees.map(employee => (
                  <li key={employee.id}>
                    {employee.fullname}
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={employee.startDate}
                      onChange={(e) => handleAssignedEmployeeFieldChange(employee.id, 'startDate', e.target.value)}
                    />
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={employee.endDate}
                      onChange={(e) => handleAssignedEmployeeFieldChange(employee.id, 'endDate', e.target.value)}
                    />
                    <span
                      className="delete-icon ml-11"
                      onClick={() => handleEmployeeDelete(employee.id, selectedProject.id)}
                    >
                      <i className="fas fa-trash-alt action-icon text-2xl cursor-pointer ml-8 text-red-500"></i>
                    </span>
                    <button onClick={() => handleSaveAssignedEmployee(employee)}>Save</button>
                  </li>
                ))
              ) : (
                <li>No assigned employees</li>
              )}
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAdding && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Add Project</h3>
            <form>
              <label>Project Name:</label>
              <input type="text" value={newProject.projectName} onChange={(e) => handleNewFieldChange('projectName', e.target.value)} />
              <label>Client Name:</label>
              <input type="text" value={newProject.clientName} onChange={(e) => handleNewFieldChange('clientName', e.target.value)} />
              <label>Start Date:</label>
              <input type="date" value={newProject.startDate} onChange={(e) => handleNewFieldChange('startDate', e.target.value)} />
              <label>End Date:</label>
              <input type="date" value={newProject.endDate} onChange={(e) => handleNewFieldChange('endDate', e.target.value)} />
              <label>Reporting Manager:</label>
              <input type="text" value={newProject.reportingManager} onChange={(e) => handleNewFieldChange('reportingManager', e.target.value)} />
              <label>Technical Lead:</label>
              <input type="text" value={newProject.technicalLead} onChange={(e) => handleNewFieldChange('technicalLead', e.target.value)} />
              <label>Status:</label>
              <select value={newProject.status} onChange={(e) => handleNewFieldChange('status', e.target.value)}>
                <option value="UNKNOWN">Unknown</option>
                <option value="COMPLETED">Completed</option>
                <option value="ONGOING">Ongoing</option>
              </select>
              
            </form>
            <button onClick={handleAddProject}>Add Project</button>
            <button onClick={closeAddModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditing !== null && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Edit Project</h3>
            <form>
              <label>Project Name:</label>
              <input type="text" value={editFormProject.projectName} onChange={(e) => handleEditFieldChange('projectName', e.target.value)} />
              <label>Client Name:</label>
              <input type="text" value={editFormProject.clientName} onChange={(e) => handleEditFieldChange('clientName', e.target.value)} />
              <label>Start Date:</label>
              <input type="date" value={editFormProject.startDate} onChange={(e) => handleEditFieldChange('startDate', e.target.value)} />
              <label>End Date:</label>
              <input type="date" value={editFormProject.endDate} onChange={(e) => handleEditFieldChange('endDate', e.target.value)} />
              <label>Reporting Manager:</label>
              <input type="text" value={editFormProject.reportingManager} onChange={(e) => handleEditFieldChange('reportingManager', e.target.value)} />
              <label>Technical Lead:</label>
              <input type="text" value={editFormProject.technicalLead} onChange={(e) => handleEditFieldChange('technicalLead', e.target.value)} />
              <label>Status:</label>
              <select value={editFormProject.status} onChange={(e) => handleEditFieldChange('status', e.target.value)}>
                <option value="UNKNOWN">Unknown</option>
                <option value="COMPLETED">Completed</option>
                <option value="ONGOING">Ongoing</option>
              </select>
              <label>Deadline Date:</label>
              <input type="date" value={editFormProject.deadlineDate} onChange={(e) => handleEditFieldChange('deadlineDate', e.target.value)} />
            </form>
            <button onClick={handleUpdate}>Update Project</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showModal && (
        <AssignModal onClose={closeAssignModal} />
      )}
    </div>
  );
};

export default ProjectDetails;
