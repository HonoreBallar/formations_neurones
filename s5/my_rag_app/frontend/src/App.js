// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Pour les styles de base

function App() {
  const [ragQuery, setRagQuery] = useState('');
  const [ragResponse, setRagResponse] = useState('');
  const [ragLoading, setRagLoading] = useState(false);
  const [ragError, setRagError] = useState('');

  const [agentQuery, setAgentQuery] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState('');

  const API_BASE_URL = 'http://localhost:8000'; // L'URL de ton API FastAPI

  const handleRagSubmit = async (e) => {
    e.preventDefault();
    setRagLoading(true);
    setRagResponse('');
    setRagError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/rag/query`, { query: ragQuery });
      setRagResponse(response.data.response);
    } catch (error) {
      console.error("Error querying RAG API:", error);
      if (error.response) {
        setRagError(`Error: ${error.response.status} - ${error.response.data.detail || error.message}`);
      } else {
        setRagError(`Network Error: ${error.message}`);
      }
    } finally {
      setRagLoading(false);
    }
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    setAgentLoading(true);
    setAgentResponse('');
    setAgentError('');
    try {
      // L'API de l'agent attend un champ 'input', pas 'query'
      const response = await axios.post(`${API_BASE_URL}/agent/query`, { input: agentQuery });
      setAgentResponse(response.data.response);
    } catch (error) {
      console.error("Error querying Agent API:", error);
      if (error.response) {
        setAgentError(`Error: ${error.response.status} - ${error.response.data.detail || error.message}`);
      } else {
        setAgentError(`Network Error: ${error.message}`);
      }
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RAG & Agent Demo</h1>
      </header>
      <div className="container">
        <section className="section">
          <h2>RAG Model</h2>
          <form onSubmit={handleRagSubmit}>
            <textarea
              placeholder="Ask a question to the RAG model..."
              value={ragQuery}
              onChange={(e) => setRagQuery(e.target.value)}
              rows="4"
            ></textarea>
            <button type="submit" disabled={ragLoading}>
              {ragLoading ? 'Loading...' : 'Send to RAG'}
            </button>
          </form>
          {ragError && <p className="error-message">Error: {ragError}</p>}
          {ragResponse && (
            <div className="response-box">
              <h3>RAG Response:</h3>
              <p>{ragResponse}</p>
            </div>
          )}
        </section>

        <section className="section">
          <h2>Agent Model</h2>
          <form onSubmit={handleAgentSubmit}>
            <textarea
              placeholder="Ask a question to the Agent (e.g., 'What time is it now?')..."
              value={agentQuery}
              onChange={(e) => setAgentQuery(e.target.value)}
              rows="4"
            ></textarea>
            <button type="submit" disabled={agentLoading}>
              {agentLoading ? 'Loading...' : 'Send to Agent'}
            </button>
          </form>
          {agentError && <p className="error-message">Error: {agentError}</p>}
          {agentResponse && (
            <div className="response-box">
              <h3>Agent Response:</h3>
              <p>{agentResponse}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;