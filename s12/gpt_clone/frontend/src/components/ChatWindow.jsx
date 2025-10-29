import { MessageBubble } from "./MessageBubble";
import { useChat } from "../hooks/useChat";

export function ChatWindow() {
  const { messages, bottomRef } = useChat();

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-2">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
