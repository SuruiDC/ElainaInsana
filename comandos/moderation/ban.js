const { MessageEmbed } = require("discord.js")
const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.cend("Requieres del permiso de `Banear Miembros` para poder usar este comando.");
    let bUser = message.mentions.members.first()
    if(!bUser) return message.channel.send("Especifica al usuario.")
    if(args.length < 1) return message.channel.cend("Menciona al usuario a banear.");
    if(bUser.id === message.author.id) return message.channel.cend("No puedes banearte a ti mismo.")
    let bReason = args.slice(1).join(" ")
    if(!bReason) return message.channel.send("Escribe una razón para banear a este usuario.");
    if(bUser.permissions.has("ADMINISTRATOR")) return message.channel.cend("No puedes banear a un usuario con el permiso de `Administrador`.");
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    if(message.member.roles.highest.comparePositionTo(bUser.roles.highest) <= 0) return message.channel.cend("No puedes banear a alguien con un rol superior al tuyo")
    if(message.guild.me.roles.highest.comparePositionTo(bUser.roles.highest) <= 0) return message.channel.cend("No puedo banear a alguien con un rol superior al mio.")
    let banEmbed = new MessageEmbed()
    .setDescription("__Registro de baneo__")
    .setColor(`RANDOM`)
    .addField("✿•°Usuario baneado", `➼<@` + bUser + `>`)
    .addField("✿•°ID", `➼` + bUser.id)
    .addField("✿•°Baneado por", `➼<@` + message.author + `>`)
    .addField("✿•°Razón", `➼` + bReason)
    .addField("✿•°Fecha", `➼` + message.createdAt.toLocaleString())
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());

    let banChannel = bUser.guild.channels.cache.find(channel => channel.id === data.config.logs);
    if(!banChannel)  return message.channel.cend("No se ha establecido el canal de logs usa el comando **logs-setchannel**.");
    if(!banChannel.permissionsFor(message.guild.me).has("VIEW_CHANNEL" && "SEND_MESSAGES" && "EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")    
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.cend("No tengo permisos para banear en este servidor")
    message.guild.members.ban(bUser, {
        reason: `Baneado por ${message.author.tag} por "${bReason}"`
    })
    message.channel.send("Usuario baneado existosamente.")
    banChannel.send({ embeds: [banEmbed] })
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "ban",
    description: "Banea un usuario y registralo.", 
    usage: "e!ban @user [Razón]",
    cooldown: 5
}