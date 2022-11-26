const { splitMessage, escapeMarkdown }  = require("discord.js").Util
const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js")
const splitArray = require("../../includes/splitArray")

module.exports.run = async(bot, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("No hay nada en la cola.")

  const description = queue.songs.map((song, index) => `**${index + 1}.** ${escapeMarkdown(`[${song.title}](${song.url})`)}`);
  let splittedDescription = splitArray(10, description)
  let embed = new MessageEmbed()
  .setAuthor(`Cola de reproducción - Total de Videos ${description.length}`, message.guild.iconURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : bot.user.displayAvatarURL({ dynamic: true }))
  .setDescription(splittedDescription[0].join(`\n\n`))
  .setColor(bot.color)
  .setFooter(`Pagina 1/${splittedDescription.length}`, message.author.displayAvatarURL({ dynamic: true }))
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

  let msg = await message.channel.send({ embeds: [embed], components: [row] })
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
      embed.setFooter(`Pagina ${index + 1}/${splittedDescription.length}`, message.author.displayAvatarURL({ dynamic: true }))
      await msg.edit({ components: [row], embeds: [embed] })

    }else if(i.customId === "derecha") {
      index = index + 1 >= splittedDescription.length ? 0 : index + 1
      embed.setDescription(splittedDescription[index].join("\n\n"))
      embed.setFooter(`Pagina ${index + 1}/${splittedDescription.length}`, message.author.displayAvatarURL({ dynamic: true }))
      await msg.edit({ components: [row], embeds: [embed] })
    }
  })

}
exports.conf = {
    aliases: ['q']
};
    exports.help = {
    name: "queue",
    description: "Muestra la cola de reproducción actual.", 
    usage: "e!queue",
    cooldown: 5
}