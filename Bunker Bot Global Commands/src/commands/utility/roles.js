const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roles",
  description: "Sends a List of all the roles in a Server",
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setTitle("**__Role List:__** | ")
      .setDescription(
        `|| **${interaction.guild.roles.cache
          .map((user) => user.name)
          .join("\n")}** ||`
      )
      .setColor("#0F297C");
    await interaction.reply({ embeds: [embed] });
  },
};
