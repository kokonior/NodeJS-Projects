const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "donkey",
    description: "Sends a Donkey Image",
    async execute(interaction) {
        async function donkey() {
            await bunk_api
                .donkey("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await donkey();
    },
};
