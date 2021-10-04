const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "potato",
    description: "Sends a Potato Image",
    async execute(interaction) {
        async function potato() {
            await bunk_api
                .potato("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await potato();
    },
};
