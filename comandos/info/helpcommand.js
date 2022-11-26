const { MessageEmbed } = require("discord.js")
module.exports.run = async(bot, message, args) => {

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let prefix = data.prefix ? data.prefix : "e!"
	let file = bot.commands.get(args[0].toLowerCase()) || bot.commands.find(x => x.conf.aliases.includes(args[0].toLowerCase()))
	if(!file) return message.channel.cend("No se encontro ningún comando con ese nombre o alias.")
	let embed = new MessageEmbed()
	.setTitle(`__Información del comando ${file.help.name}__`)
	.setColor("#fafafa")
	.setThumbnail(bot.user.displayAvatarURL({size: 4096, format: "png"}))
	.addField("✿⊰Nombre:", `> ${file.help.name}`)
	.addField("✿⊰Descripción:", `> ${file.help.description}`)
	.addField("✿⊰Uso:", `> ${file.help.usage.replace("e!", prefix)}`)
	.addField("✿⊰Cooldown:", `> ${file.help.cooldown}s`)
	.addField("✿⊰Alias:", `> ${file.conf.aliases.length < 1 ? "No posee Alias" : file.conf.aliases.join(", ")}`)
	.setFooter(`Información solicitada por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

	message.channel.send({ embeds: [embed] })
}
exports.conf = {
	aliases: ["hc"]
}
exports.help = {
	name: "helpcommand",
	description: "Recibe información sobre un comando.",
	usage: "e!helpcommand [Nombre del comando o alias]",
	cooldown: 5
}