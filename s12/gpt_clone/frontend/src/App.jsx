import { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ChatWindow />
      <ChatInput />
    </div>
  );
}

export default App
