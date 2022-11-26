const {MessageEmbed} = require('discord.js');
const {Types} = require("mongoose")

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || message.author
    if(user.bot) return message.channel.cend("Los bots no hacen alianzas.")
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

    let embed = new MessageEmbed()
    .setTitle(`__Puntos de alianza de ${user.username}__`)
    .setColor("#fffefe")
    .setThumbnail(user.displayAvatarURL({size: 1024, dynamic: true}))
    .addField(`୨୧・Tus puntos:`, "➼Llevas un total de `"+data.AllyPoints+"`")
    .addField(`୨୧・Tus alianzas:`, "➼Llevas un total de `"+data.AllyTotal+"`")
    .setFooter(`${user.tag}`, user.avatarURL({dynamic: true}))
    .setTimestamp()

    message.channel.send({ embeds: [embed] })
    
}
exports.conf = {
    aliases: ['ap']
};
    exports.help = {
    name: "points",
    description: "Comando para ver los puntos de alianza de un miembro.", 
    usage: "e!points o e!points @user",
    cooldown: 5
}
