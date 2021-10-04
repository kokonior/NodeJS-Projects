const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "seal",
    description: "Sends a Seal Image",
    async execute(interaction) {
        async function seal() {
            await bunk_api
                .seal("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await seal();
    },
};
