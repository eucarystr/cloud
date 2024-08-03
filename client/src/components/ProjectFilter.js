import React from 'react';

const ProjectFilter = ({ filterStatus, setFilterStatus }) => {
  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <div>
      <label>Filter by Status:</label>
      <select value={filterStatus} onChange={handleChange}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default ProjectFilter;
