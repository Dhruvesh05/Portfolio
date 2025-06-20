import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Background3D from "./components/Background3D"

export default function Home() {
  return (
    <main className="portfolio">
      {/* Change the variant prop to switch between different 3D backgrounds */}
      <Background3D variant="geometric" />
      <div className="content-wrapper">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
