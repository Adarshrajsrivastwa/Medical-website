import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from 'lucide-react';

const Sidebar = ({ userRole, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = {
        patient: [
            { path: "/patient-profile", label: "My Profile", icon: "🧑‍💼" },
            { path: "/doctor-appointment", label: "Doctor Appointment", icon: "📅" },
            { path: "/bed-booking", label: "Bed Booking", icon: "🏥" },
            // { path: "/order-medicine", label: "Order Medicine", icon: "📦" },
            // { path: "/chat-with-doctor", label: "Chat with Doctor", icon: "💬" },
            { path: "/medicine-overview", label: "Medicine Overview", icon: "💊" },
            { path: "/history", label: "History", icon: "🕰️" },
        ],
        doctor: [
            { path: "/doctor-profile", label: "My Profile", icon: "🩺" },
            { path: "/patients-history", label: "Medicine Help", icon: "🧪" },
            { path: "/appointment-management", label: "Appointment Management", icon: "📋" },
            { path: "/medicine-overview", label: "Medicine Overview", icon: "💊" },
            // { path: "/patients-history", label: "Patients History", icon: "📜" },
            { path: "/chat-with-patient", label: "Chat with Patient", icon: "💬" },
        ],
        hospital: [
            { path: "/hospital-profile", label: "My Profile", icon: "👤" },
            { path: "/bed-management", label: "Bed Management", icon: "🛏️" },
            { path: "/inventory-management", label: "Inventory Management", icon: "📦" },
            { path: "/get-inventory", label: "Get Inventory", icon: "📋" },
        ],
        admin: [
            { path: "/hospital-management", label: "Hospital Management", icon: "🏥" },
            { path: "/doctor-management", label: "Doctor Management", icon: "🩺" },
        ]
    };


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-10 p-3 bg-purple-600 text-white rounded-full shadow-lg"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-white text-[#563393] 
                    transform transition-transform duration-300 ease-in-out z-40 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:relative md:translate-x-0 shadow-lg overflow-y-auto`}
            >
                <div className="flex flex-col justify-between h-full">
                    {/* Scrollable Menu */}
                    <div className="flex-shrink p-4">
                        <ul className="space-y-2">
                            {menuItems[userRole]?.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="flex items-center px-4 py-2 rounded-md hover:bg-purple-100 transition-colors duration-200"
                                        onClick={() => isOpen && toggleSidebar()}
                                    >
                                        <span className="mr-3 text-lg">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Logout Button */}
                    <div className="p-4 border-t mt-auto">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center px-4 py-2 rounded-md transition-colors duration-200 text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="mr-3 w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;