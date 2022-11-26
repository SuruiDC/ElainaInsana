module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has(`MANAGE_GUILD`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
	let mode = args[0]
	if(!mode) return message.channel.cend("Deseas activar o desactivar las menciones en la bienvenida. Escribe `on` o `off`.")
	if(!["on","off"].includes(mode.toLowerCase())) return message.channel.cend("Estado invalido.")
	const data = await bot.guildsData.findOne({ guild: message.guild.id })
	mode.toLowerCase() === "on" ? await data.updateOne({ "welcomeConfig.mention": true }) : await data.updateOne({ "welcomeConfig.mention": false })
	message.channel.cend("Se actualizo la configuración de mención de las bienvenidas.") 
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "welcomemention",
    description: "Establece las menciones de la bienvenida.", 
    usage: "e!welcomemention [`on` o `off`]",
    cooldown: 5
}