const express = require('express');
const router = express.Router();
const { getAllUser, addNewUser } = require('../controllers/UserController');

// Define the route
router.get('/', getAllUser).post("/", addNewUser);

// Export the router
module.exports = router;