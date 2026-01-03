import { FaReact, FaJsSquare, FaCss3Alt, FaGithub, FaHtml5, FaNodeJs, FaPhp } from "react-icons/fa";
import { SiRedux, SiMysql, SiTypescript  } from "react-icons/si";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2>Обо мне</h2>
        <p>
          Привет! Я веб‑разработчик, увлечённый созданием красивых и удобных интерфейсов.
          Люблю работать с <span className="highlight">React</span>, экспериментировать с дизайном
          и постоянно учусь новым технологиям.
        </p>
        <p>
          Моя цель — создавать проекты, которые сочетают эстетику и функциональность,
          а также вдохновляют пользователей.
        </p>

        <div className="skills">
          <h3>Навыки:</h3>
          <div className="icons">
            <div className="icons">
              <FaReact className="icon react" title="React" />
              <FaJsSquare className="icon js" title="JavaScript" />
              <SiTypescript className="icon ts" title="TypeScript" />
              <FaCss3Alt className="icon css" title="CSS" />
              <FaGithub className="icon github" title="GitHub" />
              <FaHtml5 className="icon html" title="HTML5" />
              <FaNodeJs className="icon node" title="Node.js" />
              <FaPhp className="icon php" title="PHP" />
              <SiMysql className="icon mysql" title="MySQL" />
              <SiRedux className="icon redux" title="Redux" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
