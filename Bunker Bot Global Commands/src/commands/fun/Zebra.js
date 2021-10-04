const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "zebra",
    description: "Sends a Zebra Image",
    async execute(interaction) {
        async function zebra() {
            await bunk_api
                .zebra("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await zebra();
    },
};
