import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Bot, User, Settings, Trash2 } from 'lucide-react';

// Définition des types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens_used?: number;
  isError?: boolean;
}

interface SettingsType {
  temperature: number;
  maxTokens: number;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsType>({
    temperature: 0.7,
    maxTokens: 1000,
  });
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_history: messages,
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur API');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        tokens_used: data.tokens_used,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Désolé, une erreur est survenue. Vérifiez que le backend est démarré et que votre clé API est configurée.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer l'envoi avec Enter
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Effacer la conversation
  const clearConversation = () => {
    setMessages([]);
  };

  // Message de bienvenue
  const welcomeMessage: Message = {
    role: 'assistant',
    content:
      "Salut ! Je suis votre assistant IA basé sur LangChain. Comment puis-je vous aider aujourd'hui ?",
    timestamp: new Date(),
  };

  const displayMessages = messages.length > 0 ? messages : [welcomeMessage];

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-4 flex flex-col">
        <div className="flex items-center mb-6">
          <Bot className="w-8 h-8 text-green-400 mr-2" />
          <h1 className="text-white font-bold text-lg">ChatGPT MVP</h1>
        </div>

        <button
          onClick={clearConversation}
          className="flex items-center w-full p-3 mb-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Nouvelle conversation
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center w-full p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4 mr-2" />
          Paramètres
        </button>

        {/* Panneau des paramètres */}
        {showSettings && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white font-medium mb-3">Paramètres</h3>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                Température: {settings.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    temperature: parseFloat(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Max Tokens: {settings.maxTokens}
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={settings.maxTokens}
                onChange={(e) =>
                  setSettings(prev => ({
                    ...prev,
                    maxTokens: parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Informations sur LangChain */}
        <div className="mt-auto p-3 bg-blue-900/30 rounded-lg">
          <p className="text-blue-300 text-xs font-medium mb-1">
            Powered by LangChain
          </p>
          <p className="text-blue-200 text-xs">FastAPI + React + Tailwind</p>
        </div>
      </div>

      {/* Zone de chat principale */}
      <div className="flex-1 flex flex-col">
        {/* Zone des messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayMessages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-3xl p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-12'
                    : message.isError
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.tokens_used && (
                  <div className="text-xs opacity-70 mt-2">
                    Tokens utilisés: {message.tokens_used}
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-700 text-gray-100 p-4 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="p-4 border-t border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tapez votre message ici... (Entrée pour envoyer)"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
