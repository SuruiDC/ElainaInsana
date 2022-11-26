const { MessageEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {
	let embed = new MessageEmbed()
	.setTitle("__Varibles del sistema de entradas__")
	.setColor("#fafafa")
	.setThumbnail(bot.user.displayAvatarURL({ size: 4096 }))
	.addField("⊹˚ʚAuthor - Description - Footer.", "> ୨୧・`{member.name}` - Muestra el nombre del miembro unido.\n> ୨୧・`{member.id}` - Muestra la id del miembro unido.\n> ୨୧・`{guild.members}` - Muestra la cantidad actual de los miembros del servidor.")
	.addField("⊹˚ʚDescription.", "> ୨୧・`{member.mention}` - Muestra la mención al usuario unido.\n> ୨୧・`{joined.calendar}` - Muestra la fecha en la que se unio el usuario en formato de calendario.\n> ୨୧・`{joined.dateLong}` - Muestra la fecha de manera extendida en la que se unio el usuario.\n> ୨୧・`{joined.dateShort}` - Muestra la fecha en la que se unio el usuario en formato corto.")
	.addField("⊹˚ʚImage - Thumbnail - AuthorImage - FooterImage.", "> ୨୧・`{guild.image}` - Muestra el logo del servidor.\n> ୨୧・`{member.image}` - Muestra el avatar del usuario unido.")
	message.channel.send({ embeds: [embed] })

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "entriesvariables",
    description: "Lista de variables del sistema de entradas.", 
    usage: "e!entriesvariables",
    cooldown: 5
}