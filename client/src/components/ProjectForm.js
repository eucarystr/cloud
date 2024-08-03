import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '', description: '', status: 'Pending' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/projects/${id}`)
        .then(response => setProject(response.data))
        .catch(error => setError(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axios.put(`/projects/${id}`, project)
        .then(() => navigate(`/projects/${id}`))
        .catch(error => setError(error));
    } else {
      axios.post('/projects', project)
        .then(() => navigate('/'))
        .catch(error => setError(error));
    }
  };

  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>{id ? 'Edit Project' : 'New Project'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={project.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {error && <p>Error submitting form: {error.message}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProjectForm;
