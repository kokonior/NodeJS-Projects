const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "sus",
    description: "Sends a Among Us Image",
    async execute(interaction) {
        async function amongus() {
            await bunk_api
                .amongus("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await amongus();
    },
};
