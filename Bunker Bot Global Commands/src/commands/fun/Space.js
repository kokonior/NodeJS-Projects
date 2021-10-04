const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "space",
    description: "sends a space image",
    async execute(interaction) {
        async function space() {
            await bunk_api
                .space("832227469460635659", "vX1AtaHhvoWesb6NypIOKW8qVYNmQrwhBdv-kMRhlTlVxv6aukC6pdw9XZQU73PbakC9Y8J")
                .then((res) => interaction.reply(res));
        }
        await space();
    },
};