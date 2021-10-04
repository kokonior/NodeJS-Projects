const Data = require("../../database/models/data");

module.exports = {
  name: "test-db",
  description: "[ Staff Only Database tester ]",
  async execute(interaction) {
    let userData = await Data.userData.findOne({ userID: interaction.user.id });
    if (userData) {
      interaction.reply("```Already in database```");
    } else {
      data = new Data.userData({
        userID: interaction.user.id,
        date: new Date(),
      });
      await data.save();
      interaction.reply("```Added you to the database```");
    }
  },
};
