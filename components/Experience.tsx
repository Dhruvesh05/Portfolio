export default function Experience() {
  const experiences = [
    {
      title: "Technical Team",
      company: "CSI KKWIEER Students' Branch",
      period: "2025 - Present",
      description:
        "Builded Website for CSI KKWIEER as part of Technical Team for academic year 2025-26. Also contributed event registration systems, and digital resources also providing technical support during events.},
    {
    {
      title: "Core Committee",
      company: "MLSC KKWIEER",
      period: "2024 - Present",
      description:
        "Core Committee member in the social media team at MLSC KKWIEER .",
    },
    {
      title: "Creative Team",
      company: "FOSS Club KKWIEER",
      period: "2024 - Present",
      description:
        "Core Committee Member in the creative team at FOSS Club KKWIEER .",
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
        <div className="skills-title-wrapper">
          <h2 className="animated-heading">
            {"Experience".split("").map((letter, index) => (
              <span key={index} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </h2>
        </div>
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
