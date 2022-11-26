const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.cend("Requieres del permiso de `Gestionar mensajes` para ejecutar este comando.")
    let wUser = message.mentions.members.first()
    if(!wUser) return message.channel.cend(`Menciona el usuario del cual quieres ver sus advertencias.`)
    var dataWarns = await bot.usersData.findOne({guild: message.guild.id, user: user.id})
    if(!dataWarns){
		let x = await bot.usersData.create({
			_id: Types.ObjectId(),
			user: wUser.id,
			guild: message.guild.id,
			warns: 0,
			AllyPoints: 0,
    		AllyTotal: 0,
    		serverPoints: 0,
    		serverAllys: 0
		})
		dataWarns = x
	} 
    message.channel.cend(`${wUser} cuenta con **${dataWarns.warns}** advertencias.`)

}

exports.conf = {
    aliases: ['warns']
};
    exports.help = {
    name: "warnings",
    description: "Muestra las advertencias de un usuario.", 
    usage: "e!warnings @user",
    cooldown: 5
}
