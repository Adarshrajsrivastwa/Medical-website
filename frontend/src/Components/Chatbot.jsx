import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to UI immediately
    setMessages((prevMessages) => [...prevMessages, { sender: "You", text: userInput }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        console.error("Server error:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Response from backend:", data); // Debugging: Check API response

      // Ensure response is added to UI
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: data.response || "No response received" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: "Error connecting to server" },
      ]);
    }

    setUserInput(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="h-80 overflow-y-auto border p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
            <span className="font-bold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
