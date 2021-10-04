const { MessageEmbed } = require("discord.js");
const Data = require("../../database/models/banneduserdata");

module.exports = {
  name: "ban",
  description: "bans the specified user on this server",
  options: [
    {
      type: 6,
      name: "user",
      description: "the user you wish to ban",
      required: true,
    },
    {
      type: 3,
      name: "reason",
      description: "reason for banning the user",
      required: false,
    },
  ],
  permissions: {
    bot: ["EMBED_LINKS", "BAN_MEMBERS"],
    user: ["BAN_MEMBERS"],
  },
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    console.log(user);
    const banReason = !interaction.options.getString("reason")
      ? "no reason provided"
      : interaction.options.getString("reason");

    await user
      .send(
        `\`\`\`You Got Banned From ${interaction.guild.name} By ${interaction.user.tag}\n Server: ${interaction.guild.name}\n Banned By: ${interaction.user.tag}\n Reason: ${banReason} \`\`\``
      )
      .catch((err) => console.log(err));

    await interaction.guild.members.ban(user.id);

    let bannedData = await Data.bannedData.findOne({
      ModeratorID: interaction.user.tag,
    });
    let data;
    if (bannedData) {
    } else {
      data = new Data.bannedData({
        ModeratorUsername: interaction.user.tag,
        ModeratorID: interaction.user.id,
        BanNumber: 1+1,
        Guild: interaction.guild.name,
        Reason: banReason,
      });
      await data.save();
    }

    const Embed = new MessageEmbed()
      .setColor("#F5F39C")
        .setTitle('User Got banned!  <:7618_banhammer:893822959096062002> ')
      .addField("Responsible moderator", `${interaction.user.tag}`)
      .addField("Reason", banReason);

    await interaction.reply({
      content: `\`\`\`Successfully banned **${user.username}**.\`\`\``,
      embeds: [Embed],
    });
  },
};
