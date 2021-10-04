const mongoose = require('mongoose');

const lockDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    Reason: String,
    Guild: String,
})

const lockData = mongoose.model("lockData", lockDataSchema)

module.exports = {
    lockData
}