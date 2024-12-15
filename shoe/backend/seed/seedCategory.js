// Load environment variables
require('dotenv').config();  // Ensure this is at the top of the file

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { Category } = require('../models/category'); // Adjust the path to your Category model

// Load and parse JSON data
let categoryData;
try {
  const dataPath = path.join(__dirname, '../database/categories.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  categoryData = JSON.parse(fileContent);
  console.log('Category Data:', categoryData); // Log the category data to verify it's correct
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

const seedCategories = async () => {
  try {
    // Insert the category data
    const insertResult = await Category.insertMany(categoryData);
    console.log(`Inserted ${insertResult.length} categories`);

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Wait for the MongoDB connection to be established before seeding
mongoose.connection.once('open', seedCategories);
