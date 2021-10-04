const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
  name: "meme",
  description: "sends a meme",
  async execute(interaction) {
    async function meme() {
      await bunk_api
          .meme("832227469460635659", "vX1AtaHhvoWesb6NypIOKW8qVYNmQrwhBdv-kMRhlTlVxv6aukC6pdw9XZQU73PbakC9Y8J")
          .then((res) => interaction.reply(res.image));
    }
    await meme();
  },
};
