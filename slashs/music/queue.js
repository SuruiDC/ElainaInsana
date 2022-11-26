const { SlashCommandBuilder } = require('@discordjs/builders')
const { splitMessage, escapeMarkdown }  = require("discord.js").Util
const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js")
const splitArray = require("../../includes/splitArray")

let command = new SlashCommandBuilder()
.setName("queue")
.setDescription("Ve la lista de videos en la cola.")

module.exports = {
	data: command,
	run: async (interaction, bot) => {

	const queue = bot.queue.get(interaction.member.guild.id);
    if (!queue) return interaction.reply("No hay nada en la cola.")

  const description = queue.songs.map((song, index) => `**${index + 1}.** ${escapeMarkdown(`[${song.title}](${song.url})`)}`);
  let splittedDescription = splitArray(10, description)
  let embed = new MessageEmbed()
  .setAuthor(`Cola de reproducción - Total de Videos ${description.length}`, interaction.member.guild.iconURL({ dynamic: true }) ? interaction.member.guild.iconURL({ dynamic: true }) : bot.user.displayAvatarURL({ dynamic: true }))
  .setDescription(splittedDescription[0].join(`\n\n`))
  .setColor(`BLACK`)
  .setFooter(`Pagina 1/${splittedDescription.length}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
  let row = new MessageActionRow()
  .addComponents([
    new MessageButton()
    .setCustomId("izquierda")
    .setStyle("PRIMARY")
    .setLabel("<=="),

    new MessageButton()
    .setCustomId("derecha")
    .setStyle("PRIMARY")
    .setLabel("==>")
  ])

  let index = 0
  interaction.reply({ embeds: [embed], components: [row] })
  let msg = await interaction.fetchReply()
  let collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 })

  setTimeout(() => {
    msg.edit({ embeds: [embed], components: [ new MessageActionRow().addComponents( [ new MessageButton().setCustomId("izquierda").setStyle("PRIMARY").setLabel("<==").setDisabled(), new MessageButton().setCustomId("derecha").setStyle("PRIMARY").setLabel("==>").setDisabled() ] ) ] })
  }, 60000)

  collector.on("collect", async i => {
    
    let defer = await i.deferReply({ fetchReply: true })
    defer.delete()

    if(i.customId === "izquierda"){
      index = index - 1 < 0 ? splittedDescription.length - 1 : index - 1 
      embed.setDescription(splittedDescription[index].join("\n\n"))
      embed.setFooter(`Pagina ${index + 1}/${splittedDescription.length}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
      await msg.edit({ components: [row], embeds: [embed] })

    }else if(i.customId === "derecha") {
      index = index + 1 >= splittedDescription.length ? 0 : index + 1
      embed.setDescription(splittedDescription[index].join("\n\n"))
      embed.setFooter(`Pagina ${index + 1}/${splittedDescription.length}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
      await msg.edit({ components: [row], embeds: [embed] })
    }
  })
}
}