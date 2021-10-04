const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userID: String,
  date: { type: String, default: Date.now },
});

const userData = mongoose.model("userData", userDataSchema);

module.exports = {
  userData,
};
