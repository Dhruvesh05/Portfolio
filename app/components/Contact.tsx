"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="skills-title-wrapper">
          <h2 className="animated-heading">
            {"Connect".split("").map((letter, index) => (
              <span key={index} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just
              want to say hello, feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-link">
                <span>your.email@example.com</span>
              </a>
              <a href="https://linkedin.com/in/yourprofile" className="contact-link">
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/yourusername" className="contact-link">
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
