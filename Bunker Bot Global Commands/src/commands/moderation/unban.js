const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/unbanneduserdata");

module.exports = {
    name: "unban",
    description: "unbans the specified user on this server",
    options: [
        {
            type: 6,
            name: "user",
            description: "the user you wish to unban",
            required: true,
        },
    ],
    permissions: {
        bot: ["EMBED_LINKS", "BAN_MEMBERS"],
        user: ["BAN_MEMBERS"],
    },
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        console.log(user);

        await interaction.guild.members.unban(user.id);

        let unbannedData = await Data.unbannedData.findOne({
            ModeratorID: interaction.user.tag,
        });
        let data;
        if (unbannedData) {
        } else {
            data = new Data.unbannedData({
                ModeratorUsername: interaction.user.tag,
                ModeratorID: interaction.user.id,
                unbanNumber: 1+1,
                Guild: interaction.guild.name,
            });
            await data.save();
        }

        const Embed = new MessageEmbed()
            .setColor("#F5F39C")
            .setTitle('User Unbanned! <:7618_banhammer:893822959096062002>')
            .addField("Responsible moderator", `${interaction.user.tag}`)

        await interaction.reply({
            content: `\`\`\`Successfully unbanned **${user.username}**.\`\`\``,
            embeds: [Embed],
        });
    },
};