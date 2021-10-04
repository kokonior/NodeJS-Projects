const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/lockdata");

module.exports = {
    name: "lock",
    description: "Puts a Lock on The Specified Channel",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The Channel That You Want To Set The lock On",
            required: true,
        },
        {
            type: 3,
            name: "reason",
            description: "Reason For Enabling Channel Lock",
            required: true,
        },
    ],
    permissions: {
        bot: ["EMBED_LINKS", "MANAGE_CHANNELS"],
        user: ["MANAGE_CHANNELS"],
    },
    async execute(interaction) {
        const channel1 = interaction.options.getChannel("channel");
        const lockReason = !interaction.options.getString("reason")
            ? "no reason provided"
            : interaction.options.getString("reason");

        await channel1.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: false
        });

        let lockData = await Data.lockData.findOne({
            ModeratorID: interaction.user.tag,
        });
        let data;
        if (lockData) {
        } else {
            data = new Data.lockData({
                ModeratorUsername: interaction.user.tag,
                ModeratorID: interaction.user.id,
                Guild: interaction.guild.name,
                Reason: lockReason,
            });
            await data.save();
        }

        const Embed = new MessageEmbed()
            .setColor("#F5F39C")
            .setTitle('Channel Lock Set')
            .addField("Responsible moderator", `${interaction.user.tag}`)
            .addField("Reason", lockReason);

        await interaction.reply({
            content: `\`\`\`Channel Locked\`\`\``,
            embeds: [Embed],
        });
    },
};