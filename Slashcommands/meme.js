const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Makes you laugh'),
	async execute(interaction) {
  const subReddits = ["dankmemes", "meme", "memes"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setImage(img)
      .setTitle(`Your meme. From r/${random}`)
      .setURL(`https://reddit.com/r/${random}`)
      .setFooter(`mp4 files won't work, nvm`)
		await interaction.followUp({ embeds: [embed] });
	},
};


