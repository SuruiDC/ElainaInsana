const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.cend("Requieres del permiso de `Gestionar mensajes` para ejecutar este comando.")
    let wUser = message.mentions.members.first()
    if(!wUser) return message.channel.cend(`Especifica el usuario al cual advertir.`)
    if(wUser.id === message.author.id) return message.channel.cend("No puedes advertirte a ti mismo.")
    if(wUser.permissions.has("ADMINISTRATOR")) return message.channel.cend("No puedes advertir a un usuario con el permiso de `Administrador`.")
    let wReason = args.slice(1).join(" ")
    if(!wReason) return message.channel.cend(`Especifica la razón de la advertencia`)
    var data = await bot.guildsData.findOne({guild: message.guild.id})
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
    let embed = new MessageEmbed()
    .setTitle(`**__Registro de la Advertencia__**`)
    .setColor(`#fffefe`)
    .addField("✿•°Usuario advertido", `➼<@` + wUser + `>`)
    .addField("✿•°ID", `➼` + wUser.id)
    .addField("✿•°Advertido por", `➼<@` + message.author + `>`)
    .addField("✿•°Razón", `➼` + wReason)
    .addField("✿•°Fecha", `➼` + message.createdAt.toLocaleString())
    .setFooter(`Elaina`, bot.user.displayAvatarURL());

    let registro = message.guild.channels.cache.find(c => c.id === data.logs)
    if(!registro) return message.channel.cend(`No se ha establecido el canal de logs usa el comando **logs-setchannel**.`)
    if(!registro.permissionsFor(message.guild.me).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return message.channel. end("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    let newWarn = dataWarns.warns + 1
    await dataWarns.updateOne({warns: newWarn})
    message.channel.cend(`${message.author} ha advertido a ${wUser} por "${wReason}".`)
    registro.send({ embeds: [embed] }).catch(err => {
        message.channel.cend("No pude enviar el registro por que no puedo ver ese canal.")
    })

}

exports.conf = {
    aliases: ['warn']
};
    exports.help = {
    name: "warn",
    description: "Advierte a un usuario y registralo.", 
    usage: "e!warn @user [Razón]",
    cooldown: 5
}