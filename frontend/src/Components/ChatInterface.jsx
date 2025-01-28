import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = ({ recipient, initialMessages = [], onSendMessage }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, message]);
        onSendMessage?.(message);
        setNewMessage('');
    };

    // Helper to determine if the message is from the current user
    const isCurrentUser = (sender) => sender === 'user';

    return (
        <div className="flex flex-col h-[88vh]">
            {/* Chat Header */}
            <div className="border-b border-purple-200 p-4 flex items-center bg-purple-50">
                <div className="flex items-center space-x-4">
                    <img
                        src={recipient?.avatar || "/api/placeholder/100/100"}
                        alt={recipient?.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-medium text-[#563393]">{recipient?.name}</h3>
                        <p className="text-sm text-purple-500">
                            {recipient?.role === 'doctor' ? recipient?.specialty : 'Patient'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-purple-50/30">
                {messages.map((message) => {
                    const isUser = isCurrentUser(message.sender);
                    return (
                        <div
                            key={message.id}
                            className={`flex items-end space-x-2 ${isUser ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            {/* Avatar for recipient messages */}
                            {!isUser && (
                                <img
                                    src={recipient?.avatar || "/api/placeholder/32/32"}
                                    alt=""
                                    className="w-6 h-6 rounded-full"
                                />
                            )}

                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${isUser
                                    ? 'bg-[#563393] text-white rounded-br-none'
                                    : 'bg-white border border-purple-200 rounded-bl-none'
                                    }`}
                            >
                                {message.text}
                                <div
                                    className={`text-xs mt-1 ${isUser
                                        ? 'text-purple-200'
                                        : 'text-purple-400'
                                        }`}
                                >
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            {/* Avatar for user messages */}
                            {isUser && (
                                <img
                                    src="/api/placeholder/32/32"
                                    alt=""
                                    className="w-6 h-6 rounded-full"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="border-t border-purple-200 p-4 bg-white">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563393] placeholder-purple-300"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-[#563393] text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;