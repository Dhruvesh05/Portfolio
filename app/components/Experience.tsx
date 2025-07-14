export default function Experience() {
  const experiences = [
    {
      title: "Core Committee",
      company: "MLSC KKWIEER",
      period: "2024 - Present",
      description:
        "Core Committee member in the social media team at MLSC KKWIEER. Contributed to managing and organizing various technical and non-technical events like Meme - Making Competition, Expert Talk, which led to student skill and knowledge development.",
    },
    {
      title: "Creative Team",
      company: "FOSS Club KKWIEER",
      period: "2024 - Present",
      description:
        "Core Committee Member in the creative team at FOSS Club KKWIEER. Managed organisation of technical workshops on topics like Docker, Django and Open-Source to enhance technical skills among students.",
    },
    {
      title: "EPM and Logistics Team",
      company: "Innov-era, KKWIEER",
      period: "Feb 2025 - Mar 2025",
      description:
        "Worked as member for EPM and Logistics team at Innov-era, KKWIEER. Assisted to successful event planning, managing logistics to drive smooth experience to participants, judges and attendees.",
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
