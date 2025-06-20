export default function Experience() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description:
        "Led development of multiple web applications using React, Node.js, and cloud technologies. Mentored junior developers and improved team productivity by 40%.",
    },
    {
      title: "Full Stack Developer",
      company: "Startup Inc",
      period: "2020 - 2022",
      description:
        "Developed and maintained scalable web applications. Collaborated with design team to implement pixel-perfect UI components and optimize user experience.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description:
        "Created responsive websites and web applications for various clients. Specialized in React development and modern CSS techniques.",
    },
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <span className="period">{exp.period}</span>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
