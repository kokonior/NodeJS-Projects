const bunk_api = require("@bunkservices/bunk-api-lib");

module.exports = {
    name: "giraffe",
    description: "Sends a Giraffe Image",
    async execute(interaction) {
        async function giraffe() {
            await bunk_api
                .giraffe("786867818468737075", "HNxZrMoDtwcFXkQuYYGPPW8GQXOsYnfhm9x")
                .then((res) => interaction.reply(res.image));
        }
        await giraffe();
    },
};
