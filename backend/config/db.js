const mongoose = require('mongoose');  
const Admin = require('../models/admin');

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB...');

        // Seed default Admin users if they do not exist
        try {
            const adminEmails = ['srivastwaadarsh@gmail.com', 'admin@gmail.com'];
            for (const email of adminEmails) {
                const adminExists = await Admin.findOne({ email });
                if (!adminExists) {
                    const defaultAdmin = new Admin({
                        name: email === 'admin@gmail.com' ? 'System Admin' : 'Adarsh Admin',
                        email: email,
                        role: "admin",
                        otp: "123456",
                        is_verified: true
                    });
                    await defaultAdmin.save();
                    console.log(`Default Admin seeded for email: ${email}`);
                }
            }
        } catch (seedErr) {
            console.error("Error seeding default Admins:", seedErr);
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
    }
}; //cd

module.exports = connectdb;
