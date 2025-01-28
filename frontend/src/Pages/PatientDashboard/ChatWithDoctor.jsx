import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ChatInterface from "@/Components/ChatInterface";

const ChatWithDoctor = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // Sample doctors data - replace with API call
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Wilson",
            specialty: "Cardiologist",
            avatar: "/api/placeholder/100/100",
            status: "online",
            role: "doctor"
        },
        {
            id: 2,
            name: "Dr. James Chen",
            specialty: "Pediatrician",
            avatar: "/api/placeholder/100/100",
            status: "offline",
            role: "doctor"
        },
        {
            id: 3,
            name: "Dr. Emily Brown",
            specialty: "Dermatologist",
            avatar: "/api/placeholder/100/100",
            status: "online",
            role: "doctor"
        },
        {
            id: 4,
            name: "Dr. Michael Lee",
            specialty: "Neurologist",
            avatar: "/api/placeholder/100/100",
            status: "online",
            role: "doctor"
        }
    ];

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter doctors based on search query
    useEffect(() => {
        const filtered = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filtered);
    }, [searchQuery]);

    // Handle back button for mobile
    const handleBack = () => {
        setSelectedDoctor(null);
    };

    return (
        <div className="flex h-[87vh] overflow-hidden">
            {/* Doctors List - hidden on mobile when chat is open */}
            <div className={`${isMobile && selectedDoctor ? 'hidden' : 'flex flex-col'
                } w-full md:w-1/3 border-r border-purple-200 overflow-hidden`}>
                <div className="p-4 border-b border-purple-200 bg-purple-50">
                    <h2 className="text-xl font-semibold text-[#563393] mb-4">Available Doctors</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search doctors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full bg-white border-purple-200 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-2 p-4">
                        {filteredDoctors.map((doctor) => (
                            <Card
                                key={doctor.id}
                                className={`cursor-pointer hover:shadow-md transition-shadow ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-[#563393]' : ''
                                    }`}
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <CardContent className="p-4 hover:bg-purple-50">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={doctor.avatar}
                                            alt={doctor.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-[#563393]">{doctor.name}</h3>
                                            <p className="text-sm text-purple-500">{doctor.specialty}</p>
                                        </div>
                                        <div
                                            className={`w-3 h-3 rounded-full ${doctor.status === 'online' ? 'bg-green-500' : 'bg-purple-200'
                                                }`}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area - full screen on mobile when active */}
            <div className={`${isMobile && !selectedDoctor ? 'hidden' : 'flex flex-col'
                } flex-1 bg-white`}>
                {selectedDoctor ? (
                    <>
                        {isMobile && (
                            <button
                                onClick={handleBack}
                                className="p-4 text-purple-600 flex items-center space-x-2 border-b border-purple-200"
                            >
                                <span>← Back to doctors</span>
                            </button>
                        )}
                        <ChatInterface
                            recipient={selectedDoctor}
                            initialMessages={[
                                {
                                    id: 1,
                                    text: `Hello! I'm ${selectedDoctor.name}. How can I help you today?`,
                                    sender: 'doctor',
                                    timestamp: new Date().toISOString()
                                }
                            ]}
                            onSendMessage={(message) => {
                                console.log('Sending message:', message);
                                // Implement your message sending logic here
                            }}
                        />
                    </>
                ) : (
                    <div className="h-full flex items-center justify-center text-purple-400">
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                            <p>Select a doctor to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWithDoctor;