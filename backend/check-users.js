const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

(async () => {
  await connectDB();
  const users = await User.find({});
  console.log('All users:');
  users.forEach(u => {
    console.log({
      name: u.name,
      email: u.email,
      role: u.role,
      skills: u.skills,
      rate: u.rate,
      availability: u.availability
    });
  });
  process.exit(0);
})();
