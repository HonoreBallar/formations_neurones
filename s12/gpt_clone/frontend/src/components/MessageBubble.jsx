export function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-md px-4 py-2 rounded-lg text-white ${isUser ? "bg-blue-600" : "bg-gray-700"}`}>
        {message.content}
      </div>
    </div>
  );
}

export default MessageBubble;