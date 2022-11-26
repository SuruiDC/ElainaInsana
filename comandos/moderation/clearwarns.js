const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first();
    if(!user) return message.channel.cend("Menciona a quien quieres borrar sus warns")
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.cend("Requieres del permiso de `Gestionar Mensajes` para ejecutar este comando.")
    var data = await bot.usersData.findOne({guild: message.guild.id, user: user.id})
    if(!data){
		let x = await bot.usersData.create({
			_id: Types.ObjectId(),
			user: user.id,
			guild: message.guild.id,
			warns: 0,
			AllyPoints: 0,
    		AllyTotal: 0,
    		serverPoints: 0,
    		serverAllys: 0
		})
		data = x
	}
    await data.updateOne({warns: 0})
    message.channel.cend(`Se han eliminado las advertencias a ${user}.`)

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "clearwarns",
    description: "Remueve todos los warneos de un miembro.", 
    usage: "e!clearwarns @user",
    cooldown: 5
}