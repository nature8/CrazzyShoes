// // Example login route (in users.js or similar)

// const express = require('express');
// const bcrypt = require('bcryptjs');  // for password hashing
// const jwt = require('jsonwebtoken');
// const User = require('/models/user');  // Adjust according to your User model location

// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if email and password are provided
//   if (!email || !password) {
//     return res.status(400).send({ message: 'Email and password are required' });
//   }

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
    
//     // Check if user exists
//     if (!user) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.passwordHash);  // Assuming passwordHash is stored in DB
//     if (!isMatch) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

//     // Send token as response
//     res.status(200).send({ token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');  // For password hashing
const jwt = require('jsonwebtoken');
const User = require('/models/user');  // Adjust according to your User model location

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.passwordHash);  // Assuming passwordHash is stored in DB
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send token as response
    res.status(200).send({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
