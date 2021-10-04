const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "moose",
    description: "Sends a Moose Image",
    async execute(interaction) {
        async function moose() {
            await bunk_api
                .moose("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await moose();
    },
};
