const { Types } = require("mongoose")
module.exports.run = async(bot, message, args) => {

	if(message.author.id !== "618634689204322314") return message.channel.cend("Solo mi creador puede usar este comando.")
	let uwu = args[0]
	if(!uwu) return	message.channel.send("Especifica la id.")
	let data = await bot.blacklist.findOne({user: "720509373020897331"})
	let a = data.blacklist
	if(a.includes(uwu)) return message.channel.cend("Ya esta esa id en la blacklist.")
	a.push(uwu)
	await data.updateOne({blacklist: a})
	message.channel.cend("Se agrego la id a la blacklist.")
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "blacklist",
    description: "Lo funan a alguien.", 
    usage: "e!blacklist [ID]",
    cooldown: 5
}