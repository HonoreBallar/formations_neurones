import { useState } from 'react';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    console.log('Submitting question:', question);
    if (!question.trim()) {
      setError('Veuillez entrer une question.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try
    {
      const response = await axios.post(`http://127.0.0.1:8000/execute`, { question },
          {
        headers: {
          'Content-Type': 'application/json',
          "withCredentials": "true",
          'Access-Control-Allow-Origin': "127.0.0.1:8000",
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        
        }}
      );
      if (!response.ok) {
        throw new Error('Erreur API: ' + response.status);
      }
      const data = await response.json();
      setResult(data.result || 'No result returned.');
    } catch (err) {
      setError('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">AI Educator</h1>
        <div className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Posez une question sur l'IA..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-3 text-white rounded-lg ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-200`}
        >
          {loading ? 'Chargement...' : 'Poser la question'}
        </button>
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h2 className="text-lg font-semibold text-gray-800">Réponse :</h2>
            <p className="text-gray-700">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}