const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "camel",
    description: "Sends a Camel Image",
    async execute(interaction) {
        async function camel() {
            await bunk_api
                .camel("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await camel();
    },
};
