const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "alpaca",
    description: "Sends a Alpaca Image",
    async execute(interaction) {
        async function alpaca() {
            await bunk_api
                .alpaca("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await alpaca();
    },
};
