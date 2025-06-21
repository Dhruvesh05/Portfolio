export default function Projects() {
  const projects = [
    {
      title: "C3ube : E-Commerce Platform",
      description:
        "A full-stack E-commerce solution built  with Django framework for stakeholders who delas with selling of gas cylinders for industrial, medical and other purposes. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["Django", "JavaScript", "SQL", "HTML-CSS"],
      github: "#",
      demo: "#",
    },
    {
      title: "Chat-Room",
      description:
        "A real-time chat system where users can exchange messages within rooms by creating or joining rooms using unique room IDs, with all chat being stored and accessible even if users join the room at a later time. Provides a minimal user interface clutter.",
      tech: ["Springboot", "React.js", "Socket.io", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      title: "Graph Plotter",
      description:
        "A C++ Graphics project that allows users to visually plot various mathematical graphs using graphics.h library. This application is built using Object-Oriented principles, demonstrating inheritance and polymorphism through multiple graph types.",
      tech: ["C++"],
      github: "#",
      demo: "#",
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="skills-title-wrapper">
          <h2 className="animated-heading">
            {"Projects".split("").map((letter, index) => (
              <span key={index} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} className="project-link">
                    <span>GitHub</span>
                  </a>
                  <a href={project.demo} className="project-link">
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
