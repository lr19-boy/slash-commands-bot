const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows you the avatar of the mentioned user!')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('I need the user')
			.setRequired(false)),
	async execute(interaction) {
     const user = interaction.options.getUser('user') || interaction.user
     
     

     const embed = new MessageEmbed()
      .setTitle(`${user.username}'s avatar`)
      .setColor("BLUE")
      .setImage(user.displayAvatarURL({
        dynamic: true,
        size: 1024
      }))
      .setFooter(`Asked by ${interaction.user.username}`)
   await interaction.followUp({ embeds: [embed] })
	},
};

