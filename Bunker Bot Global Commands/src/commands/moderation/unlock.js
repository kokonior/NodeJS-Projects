const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/unlockdata");

module.exports = {
    name: "unlock",
    description: "Unlocks a Specified Channel",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The Channel That You Want To unlock ",
            required: true,
        },
    ],
    permissions: {
        bot: ["EMBED_LINKS", "MANAGE_CHANNELS"],
        user: ["MANAGE_CHANNELS"],
    },
    async execute(interaction) {
        const channel1 = interaction.options.getChannel("channel");

        await channel1.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: true
        });

        let unlockData = await Data.unlockData.findOne({
            ModeratorID: interaction.user.tag,
        });
        let data;
        if (unlockData) {
        } else {
            data = new Data.unlockData({
                ModeratorUsername: interaction.user.tag,
                ModeratorID: interaction.user.id,
                Guild: interaction.guild.name,
            });
            await data.save();
        }

        const Embed = new MessageEmbed()
            .setColor("#F5F39C")
            .setTitle('Channel Unlocked')
            .addField("Responsible moderator", `${interaction.user.tag}`)

        await interaction.reply({
            content: `\`\`\`Channel Unlocked\`\`\``,
            embeds: [Embed],
        });
    },
};