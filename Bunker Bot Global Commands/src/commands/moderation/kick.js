const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/kickuserdata");

module.exports = {
    name: "kick",
    description: "Kicks the specified user on this server",
    options: [
        {
            type: 6,
            name: "user",
            description: "the user you wish to kick",
            required: true,
        },
        {
            type: 3,
            name: "reason",
            description: "reason for kicking the user",
            required: false,
        },
    ],
    permissions: {
        bot: ["EMBED_LINKS", "KICK_MEMBERS"],
        user: ["KICK_MEMBERS"],
    },
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        console.log(user);
        const kickReason = !interaction.options.getString("reason")
            ? "no reason provided"
            : interaction.options.getString("reason");

        await user
            .send(
                `\`\`\`You Got Kicked From ${interaction.guild.name} By ${interaction.user.tag}\n Server: ${interaction.guild.name}\n Kicked By: ${interaction.user.tag}\n Reason: ${kickReason} \`\`\``
            )
            .catch((err) => console.log(err));

        await interaction.guild.members.kick(user.id);

        let kickData = await Data.kickData.findOne({
            ModeratorID: interaction.user.tag,
        });
        let data;
        if (kickData) {
        } else {
            data = new Data.kickData({
                ModeratorUsername: interaction.user.tag,
                ModeratorID: interaction.user.id,
                BanNumber: 1+1,
                Guild: interaction.guild.name,
                Reason: kickReason,
            });
            await data.save();
        }

        const Embed = new MessageEmbed()
            .setColor("#F5F39C")
            .setTitle('User Kicked! <:7618_banhammer:893822959096062002>')
            .addField("Responsible moderator", `${interaction.user.tag}`)
            .addField("Reason", kickReason);

        await interaction.reply({
            content: `\`\`\`Successfully Kicked  **${user.username}**.\`\`\``,
            embeds: [Embed],
        });
    },
};