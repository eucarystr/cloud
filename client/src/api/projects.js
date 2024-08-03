// src/api/projects.js

const API_URL = 'http://localhost:3000/api/projects';

export const fetchProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
