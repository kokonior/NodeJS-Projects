const mongoose = require('mongoose');

const unbannedDataSchema = new mongoose.Schema({
    ModeratorUsername: String,
    ModeratorID: String,
    unbanNumber: String,
    Guild: String,
})

const unbannedData = mongoose.model("unbannedData", unbannedDataSchema)

module.exports = {
    unbannedData
}