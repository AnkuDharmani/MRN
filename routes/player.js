const express = require('express');
const router = express.Router();
const { getPlayer, addNewPlayer,deletePlayer } = require('../controllers/PlayerController');

router.get('/', getPlayer).post("/", addNewPlayer).delete('/:id', deletePlayer);

// Export the router
module.exports = router;