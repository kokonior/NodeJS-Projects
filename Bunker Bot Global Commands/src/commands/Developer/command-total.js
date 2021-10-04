const { MessageEmbed } = require("discord.js");
const { client } = require('../../index')

module.exports = {
    name: "ct",
    description: "Sends the total amount of commands",
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setDescription(`\`\`\`${client.commands.size} Commands\`\`\``)
            .setColor("#CAF33F");
        await interaction.reply({ embeds: [embed] });
    },
};
module.exports = {
    name: 'mute',
    description: 'Mutes a member.',
    options: [{
        name: 'member',
        type: 'USER',
        description: 'The member to be muted.',
        required: true,
    }],
    async execute(interaction) {
        let muteRole = interaction.guild.roles.cache.get('Muted')

        if (!muteRole) {
            interaction.guild.roles.create({
                name: 'Muted',
                reason: "A 'Muted' role does not exist.",
                PERMISSION_DENIED: "SEND_MESSAGES",
            })
            muteRole = interaction.guild.roles.cache.get('Muted')
        }

        mutedMember = interaction.options.getMember("member")

        if (!member.manageable) return interaction.reply("This member is higher than me in the role/member hierachy, and therefore I can't mute this member.")

        mutedMember.roles.set([muteRole])
    },
};