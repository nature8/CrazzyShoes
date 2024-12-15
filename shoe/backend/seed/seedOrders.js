require('dotenv').config();  // Ensure this is at the top of the file

console.log('Environment Variables:', process.env); // This should show the CONNECTION_STRING

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { Order } = require('../models/order'); // Adjust the path to your Order model

// Load and parse JSON data
let orderData;
try {
  const dataPath = path.join(__dirname, '../database/orders.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  orderData = JSON.parse(fileContent);
  console.log('Order Data:', orderData); // Log the order data to verify it's correct
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

const seedOrders = async () => {
  try {
    // Insert the order data
    const insertResult = await Order.insertMany(orderData);
    console.log(`Inserted ${insertResult.length} orders`);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Wait for the MongoDB connection to be established before seeding
mongoose.connection.once('open', seedOrders);
