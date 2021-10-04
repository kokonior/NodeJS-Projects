const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Displays Your avatar, also Sends the avatar URL",
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle(`${interaction.user.tag} Avatar`)
      .setColor("#0F747C")
      .setDescription(` **Avatar Link:** | ${interaction.user.avatarURL()}`)
      .setImage(`${interaction.user.avatarURL({ dynamic: true, size: 2048 })}`);
    await interaction.reply({ embeds: [embed] });
  },
};
