export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-layout">
            <div className="about-profile">
              <img
                src="/profileimg.jpg?height=300&width=300"
                alt="Your Name - About Profile"
                className="about-profile-img"
              />
            </div>
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with a keen eye for design and user experience. With several years
                of experience in web development, I specialize in creating modern, responsive applications using
                cutting-edge technologies.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a career focused on building solutions
                that make a difference. I believe in writing clean, maintainable code and creating intuitive user
                interfaces.
              </p>
            </div>
          </div>
          <div className="skills">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              <span className="skill">JavaScript</span>
              <span className="skill">TypeScript</span>
              <span className="skill">React</span>
              <span className="skill">Next.js</span>
              <span className="skill">Node.js</span>
              <span className="skill">Python</span>
              <span className="skill">PostgreSQL</span>
              <span className="skill">MongoDB</span>
              <span className="skill">AWS</span>
              <span className="skill">Docker</span>
              <span className="skill">Git</span>
              <span className="skill">Figma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
