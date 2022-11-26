module.exports.run = async (bot, message, args) => {

	if(!message.member.permissions.has(`MANAGE_GUILD`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para poder establecer el canal de despedidas.")
	var data = await bot.guildsData.findOne({ guild: message.guild.id })
	let channel = message.mentions.channels.first()
	if(!channel) return message.channel.cend("Menciona el canal a establecer las despedidas.")
	if(channel === undefined || !["GUILD_NEWS", "GUILD_TEXT"].some(x => channel.type === x)) return message.channel.cend("El canal a establecer debe se de texto.")
	let findChannel = message.guild.channels.cache.get(channel.id)
	if(!findChannel) return message.channel.cend("No se encontro ese canal en este servidor.")
	let permissions = channel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")

	await data.updateOne({ "goodbyeConfig.channel": channel.id })
	message.channel.cend(`Se establecio ${channel} como canal de despedidas.`)	
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setgoodbye",
    description: "Establece el canal de goodbye.", 
    usage: "e!setgoodbye #channel",
    cooldown: 5
}