import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import ChatInterface from "@/Components/ChatInterface";

const ChatWithPatient = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    // Sample patients data - replace with API call
    const patientChats = [
        {
            id: 1,
            name: "John Doe",
            lastMessage: "I have a question about my prescription",
            timestamp: "10:30 AM",
            unread: true,
            avatar: "/api/placeholder/100/100",
            role: "patient"
        },
        {
            id: 2,
            name: "Jane Smith",
            lastMessage: "Thank you for the advice",
            timestamp: "Yesterday",
            unread: false,
            avatar: "/api/placeholder/100/100",
            role: "patient"
        }
    ];

    return (
        <div className="flex h-[87vh] overflow-hidden p-1">
            {/* Patient Chats List */}
            <div className="w-1/3 border-r border-purple-200 overflow-y-scroll">
                <div className="p-4 border-b border-purple-200 bg-purple-50">
                    <h2 className="text-xl font-semibold text-[#563393]">Patient Chats</h2>
                </div>
                <div className="space-y-2 p-4">
                    {patientChats.map((chat) => (
                        <Card
                            key={chat.id}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedChat?.id === chat.id ? 'ring-2 ring-[#563393]' : ''
                                }`}
                            onClick={() => setSelectedChat(chat)}
                        >
                            <CardContent className="p-4 hover:bg-purple-50">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={chat.avatar}
                                        alt={chat.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-[#563393]">{chat.name}</h3>
                                            <span className="text-sm text-purple-600">{chat.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-purple-500 truncate">{chat.lastMessage}</p>
                                    </div>
                                    {chat.unread && (
                                        <div className="w-3 h-3 bg-[#563393] rounded-full" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white">
                {selectedChat ? (
                    <ChatInterface
                        recipient={selectedChat}
                        initialMessages={[
                            {
                                id: 1,
                                text: selectedChat.lastMessage,
                                sender: 'user',
                                timestamp: new Date().toISOString()
                            }
                        ]}
                        onSendMessage={(message) => {
                            console.log('Sending message:', message);
                            // Implement your message sending logic here
                        }}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-purple-400">
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                            <p>Select a patient chat to start responding</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWithPatient;