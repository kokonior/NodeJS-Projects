const mongoose = require('mongoose');

const bannedDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    BanNumber: String,
    Guild: String,
    Reason: String,
})

const bannedData = mongoose.model("bannedData", bannedDataSchema);

module.exports = {
    bannedData
}