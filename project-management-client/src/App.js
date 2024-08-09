import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure your CSS file is linked

function App() {
  const [projects, setProjects] = useState([]);
  const [currentAction, setCurrentAction] = useState('list'); // 'list', 'add', 'edit', 'detail'
  const [selectedProject, setSelectedProject] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch all projects
  useEffect(() => {
    axios.get('http://[::1]:3001/api/v1/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Add Project Handler
  const handleAddProject = (newProject) => {
    axios.post('http://[::1]:3001/api/v1/projects', { project: newProject })
      .then(response => {
        setProjects([...projects, response.data]);
        setCurrentAction('list');
        setSuccessMessage('Project added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => console.error('Error adding project:', error));
  };

  // Edit Project Handler
  const handleEditProject = (updatedProject) => {
    axios.put(`http://[::1]:3001/api/v1/projects/${selectedProject.id}`, { project: updatedProject })
      .then(() => {
        setProjects(projects.map(proj => 
          proj.id === selectedProject.id ? { ...updatedProject, id: selectedProject.id } : proj
        ));
        setCurrentAction('list');
        setSuccessMessage('Project updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => console.error('Error updating project:', error));
  };

  // Delete Project Handler
  const handleDeleteProject = (projectId) => {
    axios.delete(`http://[::1]:3001/api/v1/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter(proj => proj.id !== projectId));
        setCurrentAction('list');
        setSuccessMessage('Project deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => console.error('Error deleting project:', error));
  };

  return (
    <div className="App">
      <h1 className="app-title">Project Management</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {currentAction === 'list' && (
        <div className="project-list">
          <h2>PROJECT LIST</h2>
          <button className="add-button" onClick={() => setCurrentAction('add')}>Add New Project</button>
          <ul>
            {projects.map(project => (
              <li key={project.id} className="project-item">
                <div>
                  <span className="project-name">{project.name}</span> - <span className="project-status">{project.status}</span>
                </div>
                <div className="project-actions">
                  <button className="action-button" onClick={() => { setSelectedProject(project); setCurrentAction('detail'); }}>View Details</button>
                  <button className="action-button edit-button" onClick={() => { setSelectedProject(project); setCurrentAction('edit'); }}>Edit</button>
                  <button className="action-button delete-button" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentAction === 'add' && (
        <div className="project-form">
          <h2>ADD NEW PROJECT</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newProject = {
              name: e.target.name.value,
              status: e.target.status.value,
              description: e.target.description.value
            };
            handleAddProject(newProject);
          }}>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Status:
              <select name="status" required>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </label>
            <label>
              Description:
              <textarea name="description"></textarea>
            </label>
            <div className="form-actions">
              <button type="submit">Add Project</button>
              <button type="button" className="back-button" onClick={() => setCurrentAction('list')}>Back to List</button>
            </div>
          </form>
        </div>
      )}

      {currentAction === 'edit' && selectedProject && (
        <div className="project-form">
          <h2>EDIT PROJECT</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEditProject({
              name: e.target.name.value,
              status: e.target.status.value,
              description: e.target.description.value
            });
          }}>
            <label>
              Name:
              <input type="text" name="name" defaultValue={selectedProject.name} required />
            </label>
            <label>
              Status:
              <select name="status" defaultValue={selectedProject.status} required>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </label>
            <label>
              Description:
              <textarea name="description" defaultValue={selectedProject.description}></textarea>
            </label>
            <div className="form-actions">
              <button type="submit" className="edit-button">Update Project</button>
              <button type="button" className="back-button" onClick={() => setCurrentAction('list')}>Back to List</button>
            </div>
          </form>
        </div>
      )}

      {currentAction === 'detail' && selectedProject && (
        <div className="project-details">
          <h2>PROJECT DETAILS</h2>
          <p><strong>Name:</strong> {selectedProject.name}</p>
          <p><strong>Status:</strong> {selectedProject.status}</p>
          <p><strong>Description:</strong> {selectedProject.description}</p>
          <div className="form-actions">
            <button className="edit-button" onClick={() => setCurrentAction('edit')}>Edit Project</button>
            <button className="back-button" onClick={() => setCurrentAction('list')}>Back to List</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
