const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "elephant",
    description: "Sends a Elephant Image",
    async execute(interaction) {
        async function elephant() {
            await bunk_api
                .elephant("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await elephant();
    },
};
