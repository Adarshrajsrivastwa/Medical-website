import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isMinimized, setIsMinimized] = useState(true);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

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
            console.log("Response from backend:", data);

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

        setUserInput("");
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isMinimized ? (
                <button
                    onClick={() => setIsMinimized(false)}
                    className="w-12 h-12 rounded-full bg-[#563393] text-white flex items-center justify-center shadow-lg hover:bg-[#6b40b3] transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                </button>
            ) : (
                <div className="flex flex-col w-80 bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#563393] p-3 flex justify-between items-center">
                        <h2 className="text-white text-sm font-semibold">Chat Assistant</h2>
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="text-white hover:text-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 h-64 overflow-y-auto p-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} mb-2`}
                            >
                                <div
                                    className={`max-w-[80%] p-2 rounded-lg ${msg.sender === "You"
                                            ? "bg-[#563393] text-white rounded-br-none"
                                            : "bg-white text-gray-800 shadow-md rounded-bl-none"
                                        }`}
                                >
                                    <div className="text-xs mb-1 font-medium">
                                        {msg.sender === "You" ? "You" : "Assistant"}
                                    </div>
                                    <div className={`text-xs ${msg.sender === "You" ? "text-gray-100" : "text-gray-600"}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 p-2 bg-white">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563393] focus:border-transparent"
                                placeholder="Type your message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="p-2 bg-[#563393] text-white rounded-lg hover:bg-[#6b40b3] transition-colors duration-200"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;