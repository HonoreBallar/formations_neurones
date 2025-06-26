import Accordion from "./components/Accordion"

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Mon Accordéon</h1>
      <Accordion title="Section 1">
        <p>Contenu de la première section.</p>
      </Accordion>
      <Accordion title="Section 2">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Accordion>
      <Accordion title="Section 3">
        <p>Une autre section avec du texte.</p>
      </Accordion>
    </div>
  )
}

export default App
