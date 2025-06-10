const express = require('express');
const router = express.Router();
const { getAllUser, addNewUser,handleLogin } = require('../controllers/UserController');

// Define the route
router.get('/', getAllUser).post("/", addNewUser);

router.post('/login',handleLogin)

// Export the router
module.exports = router;