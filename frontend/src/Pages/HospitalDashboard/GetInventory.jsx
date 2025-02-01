import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from "axios";
import Cookies from 'js-cookie';

const GetInventory = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const inventoryData = [
        {
            id: 1,
            hospitalName: "St. Mary's Hospital",
            address: "123 Medical Center Blvd, New York, NY 10001",
            phone: "(212) 555-0123",
            email: "contact@stmarys.org",
            itemName: "Surgical Masks",
            quantity: 5000
        },
        {
            id: 2,
            hospitalName: "Memorial Healthcare",
            address: "456 Healthcare Ave, New York, NY 10002",
            phone: "(212) 555-0456",
            email: "info@memorial.org",
            itemName: "Surgical Masks",
            quantity: 3000
        },
        {
            id: 3,
            hospitalName: "City General Hospital",
            address: "789 Medical Park, New York, NY 10003",
            phone: "(212) 555-0789",
            email: "info@citygeneral.org",
            itemName: "Ventilators",
            quantity: 50
        },
        {
            id: 4,
            hospitalName: "Central Medical Center",
            address: "321 Health Street, New York, NY 10004",
            phone: "(212) 555-0321",
            email: "contact@centralmed.org",
            itemName: "ICU Beds",
            quantity: 200
        }
    ];

    const filteredInventory = inventoryData.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                {/* Search Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-6 text-[#563393]">Get Medical Inventory</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search for medical supplies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 border-[#563393] border-opacity-30 focus:ring-[#563393] focus:border-[#563393]"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#563393]" />
                    </div>
                </div>

                {/* Results Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredInventory.map(item => (
                        <Card key={item.id} className="shadow-lg bg-white border border-[#563393] border-opacity-10">
                            <CardContent className="p-6">
                                {/* Hospital Information */}
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-[#563393] mb-2">
                                        {item.hospitalName}
                                    </h2>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-[#563393] text-opacity-70">{item.address}</p>
                                        <p>
                                            <span className="text-[#563393] text-opacity-60">Phone: </span>
                                            <span className="text-[#563393] text-opacity-80">{item.phone}</span>
                                        </p>
                                        <p>
                                            <span className="text-[#563393] text-opacity-60">Email: </span>
                                            <span className="text-[#563393] text-opacity-80">{item.email}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Inventory Information */}
                                <div className="pt-4 border-t border-[#563393] border-opacity-20">
                                    <div className="text-lg font-medium mb-2 text-[#563393] text-opacity-90">
                                        {item.itemName}
                                    </div>
                                    <div className="text-3xl font-bold text-[#563393]">
                                        {item.quantity.toLocaleString()}<span className='font-normal text-base'>quantity</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredInventory.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-[#563393] text-opacity-60">No inventory found for "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetInventory;