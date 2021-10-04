const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/SlowmodeData");

module.exports = {
    name: "slowmode",
    description: "Puts a Slowmode on The Specified Channel",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The Channel That You Want To Set Slowmode On",
            required: true,
        },
        {
            type: 3,
            name: "reason",
            description: "Reason For Enabling Slowmode",
            required: true,
        },
        {
            type: 4,
            name: "time",
            description: "Set The Time",
            required: true,
        },
    ],
    permissions: {
        bot: ["EMBED_LINKS", "MANAGE_CHANNELS"],
        user: ["MANAGE_CHANNELS"],
    },
    async execute(interaction) {
        const channel1 = interaction.options.getChannel("channel");
        const slowmodeReason = !interaction.options.getString("reason")
            ? "no reason provided"
            : interaction.options.getString("reason");
        const time = interaction.options.getInteger("time")

        await channel1.setRateLimitPerUser(time)

        let slowmodeData = await Data.slowmodeData.findOne({
            ModeratorID: interaction.user.tag,
        });
        let data;
        if (slowmodeData) {
        } else {
            data = new Data.slowmodeData({
                ModeratorUsername: interaction.user.tag,
                ModeratorID: interaction.user.id,
                Guild: interaction.guild.name,
                Reason: slowmodeReason,
            });
            await data.save();
        }

        const Embed = new MessageEmbed()
            .setColor("#F5F39C")
            .setTitle('Slowmode Set')
            .addField("Responsible moderator", `${interaction.user.tag}`)
            .addField("Reason", slowmodeReason);

        await interaction.reply({
            content: `\`\`\`Slowmode Successfully set\`\`\``,
            embeds: [Embed],
        });
    },
};
