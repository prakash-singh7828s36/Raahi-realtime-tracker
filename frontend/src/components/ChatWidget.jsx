import { useState } from "react";
import customer from "../assets/customer.png";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 cursor-pointer z-50">
      {/* Floating Button */}
      <button
        className="h-16 w-16 rounded-full bg-cover bg-center shadow-lg border-2 border-red-600 cursor-pointer"
        style={{ backgroundImage: `url(${customer})` }}
        onClick={() => setOpen(!open)}
      />

      {/* Chat Box */}
      {open && (
        <div className="bg-black border-2 border-red-600 rounded-lg shadow-xl w-72 h-80 flex flex-col absolute bottom-20 right-0">
          {/* Header */}
          <div className="bg-red-700 text-white font-bold p-2 rounded-t-lg">
            Support Chat
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 my-1 rounded max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-red-600 text-white ml-auto"
                    : "bg-white text-black mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex border-t border-red-600">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black text-white placeholder-gray-400 px-2 py-2 outline-none"
              placeholder="Type message..."
            />
            <button
              className="bg-red-700 hover:bg-red-800 text-white px-3 rounded-r"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
