import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Bed, MessageCircle, ChevronRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">Welcome to CareSpaceX</h1>
                        <p className="text-xl mb-8">Your comprehensive healthcare solution - from appointments to medicines, all in one place.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="mb-4">
                                <Calendar className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
                            <p className="text-gray-600 mb-4">Schedule consultations with specialized doctors at your convenient time</p>
                            <button className="text-blue-600 font-semibold flex items-center">
                                Book Now <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="mb-4">
                                <Bed className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Hospital Beds</h3>
                            <p className="text-gray-600 mb-4">Find and reserve hospital beds in your preferred healthcare facility</p>
                            <button className="text-blue-600 font-semibold flex items-center">
                                Reserve <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="mb-4">
                                <MessageCircle className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Doctor Chat</h3>
                            <p className="text-gray-600 mb-4">Connect instantly with healthcare professionals for quick consultations</p>
                            <button className="text-blue-600 font-semibold flex items-center">
                                Start Chat <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="mb-4">
                                {/* <Pills className="h-12 w-12 text-blue-600" /> */}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Medicine Orders</h3>
                            <p className="text-gray-600 mb-4">Order prescribed medications with doorstep delivery service</p>
                            <button className="text-blue-600 font-semibold flex items-center">
                                Order Now <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">1000+</h3>
                            <p className="text-gray-600">Doctors Available</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
                            <p className="text-gray-600">Partner Hospitals</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">10000+</h3>
                            <p className="text-gray-600">Happy Patients</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;