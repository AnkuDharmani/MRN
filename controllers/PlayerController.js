const Player = require('../models/Player')
const mongoose = require('mongoose');
const getPlayer = async (req, res) => {
    const allPlayer = await Player.find({})
    if (allPlayer) {

        return res.json(allPlayer);
    } else {

        return res.json('No data found');
    }
};
const addNewPlayer = async (req, res) => {
    try {
        const { name, game_name, jersey_no } = req.body
        if (!name || !game_name || !jersey_no) {
            return res.json('All field are reqiured')
        }


        const newPlayer = new Player({ name, game_name, jersey_no })
        const savePlayer = await newPlayer.save();

        return res.json({ status: true, message: "New Player added successfully", Detail: savePlayer })

    } catch (error) {

    }

}
const deletePlayer = async (req, res) => {
    try {
        const playerID = req.params.id
        if (!mongoose.Types.ObjectId.isValid(playerID)) {
            return res.status(400).json({ status: false, message: 'Invalid Player ID format' });
        }
        const deletePlayer = await Player.findById(playerID)
        if (!deletePlayer) {
            return res.json({ status: false, message: "Player Does not exit in the database" })
        }
        await Player.findByIdAndDelete(playerID);

        return res.json({ status: true, messge: deletePlayer.name + " was succesfull removed" })

    } catch (error) {

        res.status(500).json({ message: 'Internal server error', error: error });
    }
}


module.exports = { getPlayer, addNewPlayer, deletePlayer }