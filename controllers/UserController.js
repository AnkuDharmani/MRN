const User = require('../models/User')
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send({ allUsers });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }
};


const addNewUser = async (req, res) => {
    try {
        const { name, email, gender, dob }
            = req.body;

        // Optional: Basic validation
        if (!name || !email || !gender || !dob) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ name, email, gender, dob });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.render('login', { message: 'All fields are required' });
        }

        const user = await User.findOne({ name, email });

        if (!user) {
            return res.render('login', { message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, SECRET, { expiresIn: '1h' });

        res.cookie('auth_token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).render('login', { message: 'Server error' });
    }
};



module.exports = { getAllUser, addNewUser, handleLogin };
