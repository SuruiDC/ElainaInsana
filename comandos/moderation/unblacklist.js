module.exports.run = async(bot, message, args) => {

	if(message.author.id !== "618634689204322314") return message.channel.cend("Solo mi creador puede usar este comando.")
	let uwu = args[0]
	if(!uwu) return	message.channel.cend("Especifica la id.")
	let data = await bot.blacklist.findOne({user: "720509373020897331"})
	let a = data.blacklist
	let index = a.indexOf(uwu)
	if(index <= -1) return message.channel.cend("No se encontro esa id.")
	let xd = a.filter(item => item !== uwu)
	await data.updateOne({blacklist: xd})
	message.channel.cend("Se removio la id.")
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "unblacklist",
    description: "Unfunan a alguien.", 
    usage: "e!unblacklist [ID]",
    cooldown: 5
}