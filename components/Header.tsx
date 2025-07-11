"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <span>Portfolio</span>
        </div>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
          <button onClick={() => scrollToSection("experience")}>Experience</button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </nav>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
      </div>
    </header>
  )
}
