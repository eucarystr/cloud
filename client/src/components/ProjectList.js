import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/projects'; 

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setProjects(response.data))
      .catch(error => {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
