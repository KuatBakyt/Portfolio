import { projects } from "../../config";

function Projects() {
  return (
    <section id="projects">
      <h2>📂 Мои проекты</h2>
      <div className="projects-grid">
        {projects.map((proj) => (
          <div className="project-card" key={proj.name}>
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            <p><strong>Технологии:</strong> {proj.technologies}</p>
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Projects;