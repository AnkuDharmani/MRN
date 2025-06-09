const User = require('../models/User')

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


module.exports = { getAllUser, addNewUser };
