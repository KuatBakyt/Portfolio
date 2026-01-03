import { jobs } from "../../config";

function Experience() {
  return (
    <section id="experience">
      <h2>💼 Опыт работы</h2>
      <div className="experience-list">
        {jobs.map((job, index) => (
          <div className="experience-card" key={index}>
            {job.icon}
            <div className="experience-info">
              <h3>{job.company}</h3>
              <p className="period">{job.period}</p>
              <p className="role">{job.role}</p>
              <ul>
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;