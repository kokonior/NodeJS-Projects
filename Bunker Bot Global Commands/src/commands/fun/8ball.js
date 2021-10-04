const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "8-ball",
    description: "This is a 8 Ball Command",
    async execute(interaction) {
        async function ball() {
            await bunk_api
                .eight_ball("832227469460635659", "vX1AtaHhvoWesb6NypIOKW8qVYNmQrwhBdv-kMRhlTlVxv6aukC6pdw9XZQU73PbakC9Y8J")
                .then((res) => interaction.reply(res));
        }
        await ball();
    },
};
