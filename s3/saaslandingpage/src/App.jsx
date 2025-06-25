import Features from "./components/Features"
import FinalCTA from "./components/FinalCTA"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Pricing from "./components/Pricing"
import ScrollToTopButton from "./components/ScrollToTopButton"
import Testimonials from "./components/Testimonials"

function App() {

  return (
    <>
      <Header/>
        <main>
          <Hero/>
          <Features />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App
