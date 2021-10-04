const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Sends The Info For the Server",
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle("<:7706thonkdiscord:883573568548503662>  ```Server Info``` ")
      .setThumbnail(
        `${interaction.guild.iconURL({ dynamic: true, size: 2048 })}`
      )
      .setColor("#30EFBB")
      .addField("Server Name:", `${interaction.guild.name}`, false)
      .addField("Server Owner ID:", `${interaction.guild.ownerId}`, true)
      .addField("Server ID:", `${interaction.guild.id}`, true)
      .addField(
        "Server Language:",
        `${interaction.guild.preferredLocale}`,
        false
      )
      .addField("Rules Channel:", `${interaction.guild.rulesChannel}`, false)
      .addField("Member Count:", `${interaction.guild.memberCount}`, false)
      .addField("Partnered Server:", `${interaction.guild.partnered}`, false)
      .addField("Verified Server:", `${interaction.guild.verified}`, true)
      .addField(
        "Verification level:",
        `${interaction.guild.verificationLevel}`,
        true
      )
      .addField(
        "Boosts:",
        `${interaction.guild.premiumSubscriptionCount}`,
        false
      )
      .addField("Boost Tier:", `${interaction.guild.premiumTier}`, false)
      .addField("NSFW Level:", `${interaction.guild.nsfwLevel}`, false)
      .addField(
        "Explicit Content Filter:",
        `${interaction.guild.explicitContentFilter}`,
        false
      );
    await interaction.reply({ embeds: [embed] });
  },
};
