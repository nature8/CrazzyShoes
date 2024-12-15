
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility function to handle errors
const handleError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message: error.message || 'Server error' });
};

// Get all users
router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');
        res.status(200).json(userList);
    } catch (error) {
        handleError(res, error);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            name,
            email,
            passwordHash,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        handleError(res, error);
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

        // Find existing user
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password if provided
        const passwordHash = password ? bcrypt.hashSync(password, 10) : userExist.passwordHash;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                passwordHash,
                phone,
                isAdmin,
                street,
                apartment,
                zip,
                city,
                country,
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const secret = process.env.secret;

        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            secret,
            { expiresIn: '1d' }
        );

        res.status(200).json({ user: user.email, token });
    } catch (error) {
        handleError(res, error);
    }
});

// Register new user (This could be combined with the create user route)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            name,
            email,
            passwordHash,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        handleError(res, error);
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

// Get user count
router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ userCount });
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;

