
// Load environment variables
require('dotenv').config();  // Ensure this is at the top of the file

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { User } = require('../models/user'); // Adjust the path to your User model

// Load and parse JSON data
let userData;
try {
  const dataPath = path.join(__dirname, '../database/users.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  userData = JSON.parse(fileContent);
  console.log('User Data:', userData); // Log the user data to verify it's correct
} catch (error) {
  console.error('Error reading or parsing JSON file:', error);
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  // Deprecated options removed
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

const seedUsers = async () => {
  try {
    // Insert the user data
    const insertResult = await User.insertMany(userData);
    console.log(`Inserted ${insertResult.length} users`);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Wait for the MongoDB connection to be established before seeding
mongoose.connection.once('open', seedUsers);


// // Load environment variables
// require('dotenv').config();  // Ensure this is at the top of the file

// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const { User } = require('../models/user'); // Adjust the path to your User model

// // Load and parse JSON data
// let userData;
// try {
//   const dataPath = path.join(__dirname, '../database/users.json');
//   const fileContent = fs.readFileSync(dataPath, 'utf-8');
//   userData = JSON.parse(fileContent);
//   console.log('User Data:', userData); // Log the user data to verify it's correct
// } catch (error) {
//   console.error('Error reading or parsing JSON file:', error);
//   process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(process.env.CONNECTION_STRING, {
  
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   });

// const seedUsers = async () => {
//   try {
//     // Check the current count of documents
//     const currentCount = await User.countDocuments();
//     console.log(`Current user count: ${currentCount}`);

//     // Insert the user data
//     const insertResult = await User.insertMany(userData);
//     console.log(`Inserted ${insertResult.length} users`);

//     // Check the new count of documents
//     const newCount = await User.countDocuments();
//     console.log(`New user count: ${newCount}`);

//     console.log('Data imported successfully');
//     process.exit();
//   } catch (error) {
//     console.error('Error importing data:', error);
//     process.exit(1);
//   }
// };

// // Wait for the MongoDB connection to be established before seeding
// mongoose.connection.once('open', seedUsers);
