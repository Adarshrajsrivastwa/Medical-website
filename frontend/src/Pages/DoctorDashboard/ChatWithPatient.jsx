import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Menu, X } from 'lucide-react';
import ChatInterface from "@/Components/ChatInterface";

const ChatWithPatient = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex h-[87vh] overflow-hidden p-1">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden absolute top-4 right-4 z-50 p-2 text-purple-600 hover:bg-purple-100 rounded-lg"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Patient Chats List - Sidebar */}
            <div className={`
                absolute lg:relative
                w-full lg:w-1/3 
                h-full
                bg-white
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                border-r border-purple-200 
                overflow-y-auto
                z-40 lg:z-auto
            `}>
                <div className="p-4 border-b border-purple-200 bg-purple-50">
                    <h2 className="text-xl font-semibold text-[#563393] ml-8 lg:ml-0">Patient Chats</h2>
                </div>
                <div className="space-y-2 p-4">
                    {patientChats.map((chat) => (
                        <Card
                            key={chat.id}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedChat?.id === chat.id ? 'ring-2 ring-[#563393]' : ''
                                }`}
                            onClick={() => {
                                setSelectedChat(chat);
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                        >
                            <CardContent className="p-4 hover:bg-purple-50">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={chat.avatar}
                                        alt={chat.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-[#563393] truncate">{chat.name}</h3>
                                            <span className="text-sm text-purple-600 flex-shrink-0">{chat.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-purple-500 truncate">{chat.lastMessage}</p>
                                    </div>
                                    {chat.unread && (
                                        <div className="w-3 h-3 bg-[#563393] rounded-full flex-shrink-0" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white overflow-hidden">
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