document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => {
        const app = document.getElementById('app');
        app.innerHTML = '<h1>Projects</h1>' + data.map(project => `
          <div>
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p>Status: ${project.status}</p>
          </div>
        `).join('');
      })
      .catch(error => console.error('Error fetching projects:', error));
  });
  