import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => setError(error));
  }, [id]);

  if (error) return <p>Error loading project details.</p>;
  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
    </div>
  );
};

export default ProjectDetail;
