const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    game_name: {
        type: String,
        required: true
    },
    jersey_no: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);