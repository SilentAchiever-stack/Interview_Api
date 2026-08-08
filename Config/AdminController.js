require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../Model/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin', salt);

    const admin = await Admin.create({
      Username: 'admin123',
      email: 'admin@gmail.com',
      password: hashedPassword,
      isVerified: true,
      role: 'admin'
    });

    console.log('Admin created:', admin);
  } catch (error) {
    console.error("Error inserting admin:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();

