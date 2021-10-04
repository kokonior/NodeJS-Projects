const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "llama",
    description: "Sends a Llama Image",
    async execute(interaction) {
        async function llama() {
            await bunk_api
                .llama("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await llama();
    },
};
