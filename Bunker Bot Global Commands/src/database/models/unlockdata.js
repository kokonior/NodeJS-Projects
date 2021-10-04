const mongoose = require('mongoose');

const unlockDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    Guild: String,
})

const unlockData = mongoose.model("unlockData", unlockDataSchema)

module.exports = {
    unlockData
}