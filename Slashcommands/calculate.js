const math = require('mathjs');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
   .setName('calculate')
   .setDescription('Do your math homework easily!')
  	.addStringOption(option =>
	  	option.setName('question')
		  	.setDescription('calculation to be calculated')
		  	.setRequired(true)),
    async execute (interaction, client) {



       const question = interaction.options.getString('question')

        let resp;

        try {
            resp = math.evaluate(question)
        } catch (e) {
            return interaction.followUp({content: 'Please provide a **valid** question', ephemeral: true})
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${question}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
        .setColor('BLUE')
        .setFooter(`Calculator`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/799144072412397568/844113983400312872/R0e234383d260a3bc53ffab01ae78f851.png`)

        interaction.followUp({ embeds: [embed] });

    }
}