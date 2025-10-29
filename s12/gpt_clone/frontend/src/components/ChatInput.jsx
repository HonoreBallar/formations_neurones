import { useState } from "react";
import { useChat } from "../hooks/useChat";

export function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, loading } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex items-center p-4 border-t">
      <input
        className="flex-1 px-4 py-2 border rounded-lg mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pose ta question..."
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={handleSend}
        disabled={loading}
      >
        Envoyer
      </button>
    </div>
  );
}

export default ChatInput;