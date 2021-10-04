const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "aww",
    description: "Sends a Aww Image",
    async execute(interaction) {
        async function aww() {
            await bunk_api
                .aww("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await aww();
    },
};
