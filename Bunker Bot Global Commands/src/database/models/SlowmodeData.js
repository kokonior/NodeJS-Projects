const mongoose = require('mongoose');

const slowmodeDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    Reason: String,
    Guild: String,
})

const slowmodeData = mongoose.model("slowmodeData", slowmodeDataSchema)

module.exports = {
    slowmodeData
}