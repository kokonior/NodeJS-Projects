const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Sends Your Own User Information",
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle(
        `<:7067idthumbprintlimegreen:883577309167247380>  User Information`
      )
      .setColor("#EFA730")
      .setThumbnail(
        `${interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
      )
      .addField("Discord Username & tag:", `${interaction.user.tag}`, true)
      .addField("Discord ID:", `${interaction.user.id}`, false)
      .addField("Discord Avatar:", `${interaction.user.avatarURL([])}`, false)
      .addField("Joined At:", `${interaction.guild.joinedAt}`, false)
      .addField("Account Created:", `${interaction.user.createdAt}`, false)
      .addField(
        "Roles:",
        `${interaction.member.roles.cache.map((user) => user.name).join()}`,
        false
      )
      .addField(
        "Permissions:",
        `${interaction.member.permissions.toArray().join(" , ")}`,
        false
      );
    await interaction.reply({ embeds: [embed] });
  },
};
