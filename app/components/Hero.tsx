"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero">
      <div className="container">
        <div className={`hero-content ${mounted ? "animate" : ""}`}>
          <div className="profile-picture">
            <img
              src="/profileimg.jpg?height=500&width=500"
              alt="Dhruvesh Patil - Profile Picture"
              className="profile-img"
            />
          </div>
          <h1>
            <span className="greeting">Hello, I'm</span>
            <span className="name">Dhruvesh Patil</span>
          </h1>
          <p className="title">Full Stack Developer & Designer</p>
          <p className="description">
            B-Tech Computer Engineering undergraduate, having interests in web-development, problem-solving and AI / AI Automations. 
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection("projects")}>
              View My Work
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("contact")}>
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
