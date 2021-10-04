const mongoose = require('mongoose');

const kickDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    kickNumber: String,
    Guild: String,
    Reason: String,
})

const kickData = mongoose.model("kickData", kickDataSchema)

module.exports = {
    kickData
}