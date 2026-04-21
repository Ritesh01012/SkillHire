const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/skillhire');
    console.log('MongoDB connected successfully');

    // Delete any existing admin user (old or new schema)
    await User.deleteOne({ email: 'riteshkumarq10@gmail.com' });
    console.log('Deleted existing admin user');

    // Create admin user with new schema
    const admin = new User({
      name: 'Admin',
      email: 'riteshkumarq10@gmail.com',
      password: 'skillhire1234',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: riteshkumarq10@gmail.com');
    console.log('Password: skillhire1234');
    console.log('Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
