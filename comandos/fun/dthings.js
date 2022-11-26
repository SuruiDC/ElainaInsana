const { MessageEmbed } = require("discord.js")
const { getInfoBot, searchBot } = require("dthings-api")
module.exports.run = async (bot, message, args) => {

  if(args.length < 1) return message.channel.cend("Debes especificar la id del bot.")
  let user;
  try {
    user = await bot.users.fetch(args[0]) 
  } catch (e) {
    user = message.mentions.users.first()
  }
  if(!user) return message.channel.cend("No se encontro un bot con esa id.")
  if(!user.bot) return message.channel.cend("El usuario mencionado no es un bot.")
  let info = await getInfoBot(user.id)
  .catch(e => message.channel.cend("El bot no se encuentra en la pagina de discordthings."))
  if(!info.votes) return;
  let embed = new MessageEmbed()
  .setTitle(`__Información de ${info.name} en DiscordThings__`)
  .setColor("RANDOM")
  .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true, format: "png"}))
  .addField("・Descripción:", `> ${info.description}`)
  .addField("・Información extra:", "> `Prefix:` "+info.prefix+"\n> `Votos:` "+info.votes+"\n> `Servidores:` "+info.servers+"\n> `Invites.` "+info.invites+"\n> `Creador:` "+info.owner)
  .addField("・Enlaces:", "> `Votar:` "+`[Link](https://discordthings.com/bot/${info.id}/vote)`+"\n> `Reportar:` "+`[Link](https://discordthings.com/bot/${info.id}/report)`+"\n> `Pagina Principal:` "+`[Link](https://discordthings.com/bot/${info.id})`)
  .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

  message.channel.send({ embeds: [embed] })
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "dthings",
    description: "Obtén info de un bot de discordthings.com", 
    usage: "e!dthings [Id o @bot]",
    cooldown: 5
}