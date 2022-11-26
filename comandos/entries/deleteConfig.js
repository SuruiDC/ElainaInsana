module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has(`MANAGE_GUILD`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
	let type = args[0]
	let types = ["goodbye","welcome"]
	if(!type) return message.channel.cend("Debes especificar de cual sistema quieres eliminar una configuración, `goodbye` o `welcome`.")
	if(!type.includes(args[0].toLowerCase())) return message.channel.cend("Sistema invalido.\nSistemas disponibles: "+ types.map(x => "`"+x+"`").join(" - "))

	let config = args[1]
	let configs = ["author","authorImage","thumbnail","image","title","description","color","footer","footerImage","timestamp","channel"]
	if(!config) return message.channel.cend("Debes especificar la configuración a eliminar.")
	if(!configs.includes(args[1].toLowerCase())) return message.channel.cend("Configuración invalida.\nConfiguraciones disponibles: "+configs.map(x => "`"+x+"`").join(" - "))

	const data = await bot.guildsData.findOne({ guild: message.guild.id })
	switch(config.toLowerCase()){
		case "author":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.author": null}) : await data.updateOne({ "welcomeConfig.author": null}) 

		break;

		case "authorImage":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.authorImage": null}) : await data.updateOne({ "welcomeConfig.authorImage": null}) 

		break;

		case "title":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.title": null}) : await data.updateOne({ "welcomeConfig.title": null}) 

		break;

		case "thumbnail":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.thumbnail": null}) : await data.updateOne({ "welcomeConfig.thumbnail": null}) 

		break;

		case "color":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.color": null}) : await data.updateOne({ "welcomeConfig.color": null}) 

		break;

		case "description":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.description": null}) : await data.updateOne({ "welcomeConfig.description": null}) 

		break;

		case "timestamp":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.timestamp": null}) : await data.updateOne({ "welcomeConfig.timestamp": null}) 

		break;

		case "footer":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.footer": null}) : await data.updateOne({ "welcomeConfig.footer": null}) 

		break;

		case "footerImage":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.footerImage": null}) : await data.updateOne({ "welcomeConfig.footerImage": null}) 

		break;

		case "image":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.image": null}) : await data.updateOne({ "welcomeConfig.image": null}) 

		break;

		case "channel":

		type.toLowerCase() === "goodbye" ? await data.updateOne({ "goodbyeConfig.channel": null}) : await data.updateOne({ "welcomeConfig.channel": null}) 

		break;
	}

	message.channel.cend("Se actualizo la configuraciones.")

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "deleteconfig",
    description: "Eliminar una configuración del sistema de bienvenidas y despedidas.", 
    usage: "e!deleteconfig [`sistema`] [`configuración`]",
    cooldown: 2
}