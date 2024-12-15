// Load environment variables
require('dotenv').config();  // Ensure this is at the top of the file

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { Product } = require('../models/product'); // Adjust the path to your Product model

// Load and parse JSON data
let productData;
try {
  const dataPath = path.join(__dirname, '../database/products.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  productData = JSON.parse(fileContent);
  console.log('Product Data:', productData); // Log the product data to verify it's correct
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

const seedProducts = async () => {
  try {
    // Insert the product data
    const insertResult = await Product.insertMany(productData);
    console.log(`Inserted ${insertResult.length} products`);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Wait for the MongoDB connection to be established before seeding
mongoose.connection.once('open', seedProducts);
